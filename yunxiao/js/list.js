/**
 * Created by liold on 2014/11/24.
 */
var baseUrl = "/m";
var updateId;

$(function () {
    if (totalCount == 0) {
        $("#showList").css("display", "none");
        $("#btn_add_task").css("display", "none");
    } else {
        $(".p2").css("display", "none");

        // 检查完成状态
        checkFinishStatus();
        //$("table tr").dblclick(function () {
        //    showUpdateForm();
        //})
    }
})

// 添加任务
function addTask() {
    var name = $("#txtName").val();
    var period = $("#txtPeriod").val();
    var copyId = $("#copyId").val();
    if (name == "") {
        alert("请输入名称");
        return;
    }
    $("#btn_save").attr('disabled', true);
    if (copyId != "0") {
        $("#btn_save").html("复制中...");
    }
    $("#btn_cancel").attr('disabled', true);

    jQuery.ajax({
        type: "POST",
        url: baseUrl + "/task/add",
        data: {"name": name, "period": period, "copyId": copyId},
        //data: "name=" + name + "&period=" + period + "&copyId=" + copyId,
        success: function (ret) {
            $("#btn_save").removeAttr('disabled');
            if(ret == "0") {
                $("#btn_save").html("保存");
                alert("失败，请重试!");
            }else {
                location.href = "/m/task/list?p=1";
            }
        }
    });
}
function updateOperation(taskId) {
    //点击事件 的更新操作
    updateId = taskId;
    var tds = $("tr[taskId=" + taskId + "] td");
    $("#updateTxtName").val(trim($(tds[0]).find("a").text()));
    $("#updateTxtPeriod").val(trim($(tds[1]).text()));

    showUpdateForm();
}

function showUpdateForm() {
    $("#myUpdateModal").modal({
        keyboard: true,
        show: true
    });
}

function trim(str) {
    return str.replace();
}
function updateTask() {
    // 更行任务名称和学期
    var name = trim($("#updateTxtName").val());
    var period = trim($("#updateTxtPeriod").val());
    if (name == "") {
        alert("请输入名称");
        return;
    }
    jQuery.ajax({
        type: "POST",
        url: baseUrl + "/task/update",
        data: {"taskId": updateId, "name": name, "period": period},
        dataType: "json",
        success: function (ret) {
            location.reload();
        }
    })
}
/**
 * 删除string两边的空格
 * @param str
 * @returns {XML|string|void|*}
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 点击排课
 * @param taskId
 */
function setBaseInfo(taskId) {
    //window.open(baseUrl + "/baseInfo/index?taskId=" + taskId);
    window.location.href = baseUrl + "/baseInfo/index?taskId=" + taskId;
}

function setRules(taskId) {
    location.href = baseUrl + "/baseInfo/index?taskId=" + taskId;
}

/**
 * 查看课程表
 * @param taskId
 */
function viewPlan(taskId) {
    location.href = baseUrl + "/courseplan/class?taskId=" + taskId;
}
function viewCoursePlanStatus(taskId) {
    location.href = baseUrl + "/courseplan/start?taskId=" + taskId;
}
function adjustTimeTable(taskId) {
    location.href = baseUrl + "/adjustTeaCoursePlan/teaTimeTable?taskId=" + taskId;
}

/**
 * 复用
 * @param taskId
 */
function copyTask(taskId) {
    var tds = $("tr[taskId=" + taskId + "] td")
    $("#txtName").val(trim($(tds[0]).find("a").text()) + "-副本");
    $("#txtPeriod").val(trim($(tds[1]).text()));
    $("#copyId").val(taskId);
    $("#myModalLabel").html("<b>复用排课任务</b>");
}

function beginAdd(taskId) {
    $("#txtName").val("");
    $("#txtPeriod").val("");
    $("#copyId").val("0");
    $("#myModalLabel").html("<b>添加排课任务</b>");
}

/**
 * 删除
 * @param taskId
 */
function removeTask(taskId) {
    if (confirm("删除后的数据不可恢复，确定删除吗？")) {
        jQuery.ajax({
            type: "POST",
            url: baseUrl + "/task/delete?id=" + taskId,
            success: function (ret) {
                if (ret == 0) {
                    alert("删除失败");
                }
                location.reload();
            }
        });
    }
}


/**result
 * 获取失败信息
 * @param taskId
 */
function getResultMsg(taskId) {
    var msgCol = $("#resultMsg");
    msgCol.html("加载中...");
    $("#result").dialog({
        closeText: "关闭",
        title: "失败原因",
        width: 360,
        height: 130
    });

    jQuery.ajax({
        url: baseUrl + "/task/result?id=" + taskId,
        success: function (ret) {
            ret = processResultMsg(ret);
            msgCol.html(ret);
        },
        error: function () {
            msgCol.html("");
        }
    });
}

function processResultMsg(ret) {
    // 无解
    if (ret == "no result") {
        ret = "在指定的时间内未找到最优解，请适当减少或调整约束，然后再试，祝您好运！";
    } else if (ret.indexOf("初始解") > 0) {
        ret = ret.replace("初始解", "合适排课结果")
    }

    return ret;
}

// 检查任务完成状态
function checkFinishStatus() {
    var running = "1";
    var finished = "2";
    var checkTaskId = [];
    var checkCount = 0;
    var checkDoneCount = 0;
    var hasFinished = false;
    var timeout = 5000;

    $("tr[area='task']").each(function () {
        var taskCol = $(this);
        var status = taskCol.attr("status");
        // 运行中的去检查完成状态
        if (status == running) {
            var taskId = taskCol.attr("taskId");
            checkTaskId.push(taskId);
            checkCount++;
        }
    });

    if (checkCount == 0) {
        return;
    }

    // 执行检查
    for (var i = 0; i < checkTaskId.length; i++) {
        var taskId = checkTaskId[i];
        jQuery.ajax({
            url: baseUrl + "/task/status?id=" + taskId,
            success: function (ret) {
                if (ret == finished) {
                    hasFinished = true;
                }

                checkDoneCount++;
                checkFinishStatusDone(checkCount, checkDoneCount, hasFinished, timeout);
            },
            error: function () {
                checkDoneCount++;
                checkFinishStatusDone(checkCount, checkDoneCount, hasFinished, timeout);
            }
        });
    }
}

function checkFinishStatusDone(checkCount, checkDoneCount, hasFinished, timeout) {
    // 检查完成并且有完成的任务
    if (checkDoneCount == checkCount) {
        if (hasFinished) {
            location.reload();
        }
        else {
            setTimeout(function () {
                checkFinishStatus();
            }, timeout)
        }
    }
}

function goPage(page) {
    location.href = "/task/list?p=" + page;
}

// 添加、复用弹出窗口居中
$('#myModal').on('show.bs.modal', function (e) {
    $(this).find('.modal-dialog').css({
        'margin-top': function () {
            var modalHeight = 250; // $('#myModal').find('.modal-dialog').height();
            return ($(window).height() / 2 - (modalHeight / 2));
        }
    });
});

// 更新弹窗居中
$('#myUpdateModal').on('show.bs.modal', function (e) {
    $(this).find('.modal-dialog').css({
        'margin-top': function () {
            var modalHeight = 250; // $('#myModal').find('.modal-dialog').height();
            return ($(window).height() / 2 - (modalHeight / 2));
        }
    });
});

//Codes below are added by Tianyu for letting user input their Info.
function loadInputTable() {
    if (userInfoEditor) {
        userInfoEditor.showUserInfoInput();
    }
}

function updateSchoolView() {
    var schoolLabel = $("#label_school_name");
    jQuery.ajax({
        type: "GET",
        url: baseUrl + "/userInfo/getSchoolName",
        cache: false,
        success: function (ret) {
            var userInfoButton = $("#btn_add_userInfo");
            userInfoButton.css({'visibility': 'visible'});
            if (ret == "") {
                //从未填写过学校信息
                userInfoButton.text("添加");
                $("#btn_add_task").attr('disabled', true);
                $("#btn_add_task_first").attr('disabled', true);
                schoolLabel.text("学校: 未填写");
                loadInputTable();
            } else {
                userInfoButton.text("修改");
                $("#btn_add_task").attr('disabled', false);
                $("#btn_add_task_first").attr('disabled', false);
                schoolLabel.text("学校: " + ret);
            }
            schoolLabel.css({'visibility': 'visible'});
        }
    });
}

//load view to display school name when page is loaded
$(document).ready(function () {
    updateSchoolView();
});