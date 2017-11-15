/**
 * Created by Administrator on 2014/11/17.
 */
function goUrl(url) {
    location.href = url;
}
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 *
 * @param $col
 * @param items
 * @param defaultText
 */
function loadItems($col, items, defaultText, defaultValue) {
    var value = "0";
    if (!isNull(defaultValue)) {
        value = defaultValue;
    }
    $col.html("");
    if (!isNull(defaultText)) {
        $col.append("<option value='" + value + "'>" + defaultText + "</option>");
    }

    if (items == null) {
        return;
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        $col.append("<option value='" + item.id + "'>" + item.name + "</option>");
    }
}

function stringIsNullOrEmpty(value) {
    if (typeof(value) == "undefined" || value == null || value == "") {
        return true;
    }

    return false;
}

function isNull(value) {
    if (typeof(value) == "undefined" || value == null) {
        return true;
    }

    return false;
}

/**
 * 设置当前排课步骤
 * @param step
 */
function setTaskStep(step) {
    $("#" + step).addClass("active");
    $("#" + step).addClass("task-" + step + "-active");
}
function setTaskRuleStep(step) {
    $("#" + step).addClass("active");
    $("#" + step).find("a").addClass("colorful");
}
//=========jquery ui

// 显示提示信息
function showMessage(msg, title) {
    $("#alert_container").remove();

    var html = "<div id=\"alert_container\"><div id=\"alert_msg\" style=\"font-size:14px;padding:5px;line-height: 22px;\"></div></div>";
    $("body").append(html);
    $("#alert_msg").html(msg);

    if (stringIsNullOrEmpty(title)) {
        title = "提示";
    }

    $("#alert_container").dialog({
        closeText: "关闭",
        title: title,
        width: 270,
        height: 120
    });
}

//===========

/*region 页面提示相关*/
function alertSuccess(title) {
    var html = new Array();
    html.push("<div class='alert alert-success'>");
    html.push(title);
    html.push("</div>");
    var alert = $("#alertDiv");
    alert.empty();
    alert.append(html.join(""));
    alert.show();
    alert.fadeOut(3000,function () {
        $(this).addClass("alert-hide")
    });
}
function alertWarning(title) {
    var html = new Array();
    html.push("<div class='alert alert-warning'>");
    html.push(title);
    html.push("</div>");
    var alert = $("#alertDiv");
    alert.empty();
    alert.append(html.join(""));
    alert.show();
    alert.fadeOut(3000,function () {
        $(this).addClass("alert-hide")
    });
}
function alertInfo(title) {
    var html = new Array();
    html.push("<div class='alert alert-info'>");
    html.push(title);
    html.push("</div>");
    var alert = $("#alertDiv");
    alert.empty();
    alert.append(html.join(""));
    alert.show();
    alert.fadeOut(2000,function () {
        $(this).addClass("alert-hide")
    });
}
/*endregion 页面提示相关*/

function NumberTOWeek(num) {
    switch (num.toString()) {
        case "0":
            return "星期日";
        case "1":
            return "星期一";
        case "2":
            return "星期二";
        case "3":
            return "星期三";
        case "4":
            return "星期四";
        case "5":
            return "星期五";
        case "6":
            return "星期六";
        case "7":
            return "星期日";
        default   :
            return "";
    }
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * yyyy-MM-dd 转成日期类型
 * @param dateStr
 * @returns {Date}
 */
function getDateFromString(dateStr) {
    var arr = dateStr.split("-");
    var y = parseInt(arr[0]);
    var m = parseInt(arr[1]);
    var d = parseInt(arr[2]);
    var date = new Date(y, m - 1, d);
    return date;
}