//独立的选择城市列表模块 
define("city", ['zepto', 'template', 'api', 'underscore'], function ($, tpl, api, _) {
    $(".quickPosition").on("click", "li", function () {
        cityListPage.startGoto($.trim($(this).attr("title")), cityListPage.isStartCityPanel);
    });

    $("#closePanel").on("click", function () {
        cityListPage.closePanel();
    });

    $("#closeEndCityPanel").on("click", function () {
        cityListPage.closeEndCityPanel();
    });

    $("#queryClean").on("click", function () {
        cityListPage.resetPanel();
    });

    $("#endCityQueryClean").on("click", function () {
        cityListPage.resetEndCityPanel();
    });

    $("#startCityQueryClean").on("click", function () {
        cityListPage.openStartCityPanel();
    });
    $("#cityInput").on("input", function () { //检索出发城市
        var str = $.trim($(this).val());
        if (str.length == 0) {
            cityListPage.openStartCityPanel();
            return false;
        };
        $("#startCityQueryClean").show();
        $(".startCityList .hotcity_box").hide();
        $(".startCityList .location_box").hide();
        $("#cityList").hide();
        $("#quickPosition").hide();
        pattern = new RegExp("(^" + str + "|\\|" + str + ")", "i");
        var pinYin = null,
            jianPin = null,
            name = null,
            data = $("#cityList dd"),
            searchArray = new Array();
        $.each(data, function (index, item) {
            pinYin = $(item).attr("data-py"),
                jianPin = $(item).attr("data-jp"),
                name = $(item).attr("data-name"),
                predate = $(item).attr("data-predate");
            if (pattern.test(pinYin + "|" + jianPin) || name.indexOf(str) > -1) {
                var seachData = {};
                seachData.name = name;
                seachData.preDate = predate;
                searchArray.push(seachData);
            }
        });
        if(searchArray.length == 0) {
        	$("#cityMatch").html("<div id=\"req_error\" class=\"nodata\"><div class=\"nd_img\"></div><p class=\"nd_txt\">Uh oh， 没有找到城市!</p></div>").show();
        	return false;
        }
        var template = _.template($("#cityMatchTpl").html()); //装载模板
        $("#cityMatch").html(template({
            data: searchArray
        })).show();
    });

    //touchstart
    $(".quickPosition").on("touchstart","li", function () {
    	var elmentId=(cityListPage.isStartCityPanel)?"startcity_jp":"endcity_jp";
        $("#"+elmentId).text($(this).text());
        $("#"+elmentId).show();
    });
    //touchend
    $(".quickPosition").on("touchend", "li",function () {
    	var elmentId=(cityListPage.isStartCityPanel)?"startcity_jp":"endcity_jp";
        $("#"+elmentId).hide();
    });
    //touchcancel
    $(".quickPosition").on("touchcancel","li", function () {
    	var elmentId=(cityListPage.isStartCityPanel)?"startcity_jp":"endcity_jp";
        $("#"+elmentId).hide();
    });
    //touchmove
    $(".quickPosition").on("touchmove", function (event) {
        try {
            //定位 延迟  平滑效果
            var element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);//查找元素
            if (!_.isNull(element)) {//存在元素
                var reg= /^[A-Za-z]+$/,elementObj=$(element);//判断是否A-Z
                if (reg.test($.trim(elementObj.text()) ) ) {
                	var elmentId=(cityListPage.isStartCityPanel)?"startcity_jp":"endcity_jp";
                	 $("#"+elmentId).text($.trim(elementObj.text()));
                     setTimeout(cityListPage.startGoto(elementObj.attr("title"), cityListPage.isStartCityPanel), 300);
                     event.preventDefault();
                }
            }
        } catch (e) {
            console.log(e.name + "--" + e.message);
        }
    });
   
    var handler = {
        searchCity: function (str, data, isLoadStartCity) { //筛选城市
            var quickPositionElementId = "quickPosition",
                cityListElementId = "cityList",
                queryCleanElementId = "queryClean",
                cityMatchElementId = "cityMatch";
            if (!isLoadStartCity) {
                quickPositionElementId = "endcityQuickPosition",
                    cityListElementId = "endcityList",
                    queryCleanElementId = "endCityQueryClean",
                    cityMatchElementId = "endcityMatch";
            }
            if (str.length === 0) {
                if (isLoadStartCity) {
                    cityListPage.resetPanel();
                } else {
                    cityListPage.resetEndCityPanel();
                }
                return;
            }
            $("#" + quickPositionElementId).hide();
            $("#" + cityListElementId).hide();
            $(".startCityList .location_box").hide();
            $(".startCityList .hotcity_box").hide();
            $(".endCityList .location_box").hide();
            $(".endCityList .hotcity_box").hide();
            $("#" + queryCleanElementId).show()
            var arrResultData = [];
            pattern = new RegExp("(^" + str + "|\\|" + str + ")", "i");
            _.each(data, function (item) {
                var filterData = _.filter(item.citys, function (city) {
                    return pattern.test(city.pinyin + "|" + city.simplepy) || city.name.indexOf(str) > -1;
                });
                if (filterData.length > 0) {
                    arrResultData = _.union(arrResultData, filterData);
                }
            });
            if(arrResultData.length == 0) {
            	$("#"+cityMatchElementId).html("<div id=\"req_error\" class=\"nodata\"><div class=\"nd_img\"></div><p class=\"nd_txt\">Uh oh， 没有找到城市!</p></div>").show();
            	return false;
            }
            var template = _.template($("#cityMatchTpl").html()); //装载模板
            $("#" + cityMatchElementId).empty().html(template({
                data: arrResultData
            })).show();
        }
    };

    var renderHtml = function (data, isLoadStartCity) { //渲染 html
        if (!_.isObject(data)) {
            data = JSON.parse(data);
        }
        if (!_.isNull(data) && data.length >0) {
            var cityListElementId = "cityList";
            var quickPositionElementId = "quickPosition";
            var cityInputElementId = "cityInput";

            if (!isLoadStartCity) { //加载到达城市
                cityListElementId = "endcityList";
                quickPositionElementId = "endcityQuickPosition";
                cityInputElementId = "endCityInput";
            }
            var name = "startcity";
            if (!isLoadStartCity) {
                name = "endcity";
            }
            tpl.templateInstall(cityListElementId, {
                data: data,
                isLoadStartCity: name
            }, "cityListTpl"); //装载 城市模板
            var arrResultData = _.filter(_.pluck(data, "name"), function (item) {
                return !_.isEmpty(item);
            }); //A-Z有哪些 去掉空格
            tpl.templateInstall(quickPositionElementId, {
                data: arrResultData,
                isLoadStartCity: name
            }, "quickMatchTpl"); //装载A-Z模板
            //搜索框搜索
            $("#" + cityInputElementId).on("input", function () {
                handler.searchCity($.trim($(this).val()), data, isLoadStartCity);
            })
        } else {
            $("#endcityQuickPosition").html("");
        	$("#endcityList").html("<div id=\"req_error\" class=\"nodata\"><div class=\"nd_img\"></div><p class=\"nd_txt\">Uh oh， 没有找到城市!</p></div>").show();
        }
    };

    var cityListPage = {
        isStartCityPanel: true,
        startGoto: function (pr, isStartCityPanel) { // 始发城市字母快速选择
            var element = document.getElementById(pr);
            var distance = element.offsetTop;
            var parent = element.offsetParent;
            distance += parent.offsetTop;
            if (isStartCityPanel) {
                document.getElementById("cityList").scrollTop = distance - 81 - $("._hotcity_box_start").length*81;
            } else {
                document.getElementById("endcityList").scrollTop = distance - 44;
            }
        },
        loadCityData: function (isLoadStartCity, param) { //加载城市数据，快捷定位,加载出发城市或者到达城市
            var data = null;
            cityListPage.isStartCityPanel = isLoadStartCity;
            if (isLoadStartCity) { //加载出发城市

            } else { //加载到达城市
                $("#isLoadedEndcity").val("false"); //标记是否到达城市 加载完成
                $("#endcityList").hide();
                $.ajax({
                    type: 'POST',
                    url: api.getEndCityUrl(),
                    data: param || "",
                    timeout: 30000,
                    success: function (result) {
                        if (result === null || $.trim(result) == "" || typeof (result) == "undefined") {
                            $.dialog({
                                content: "服务器异常,请稍后再试",
                                title: "alert",
                                width: 200,
                                time: 2000
                            });
                            return;
                        }
//                        if ("[]" == $.trim(result)) {
//                        	$.dialog({ content: "您选择的出发城市没找到目的城市!", title: "alert",width: 200,time: 2000}); return;
//                        }
                        renderHtml(result, isLoadStartCity);
                    },
                    error: function (xhr, type) {
                        $.dialog({
                            content: "网络异常,请稍后再试",
                            title: "alert",
                            width: 200,
                            time: 2000
                        });
                    },
                    complete: function () {
                        $("#isLoadedEndcity").val("true");
                        $("#endcityList").show();
                        $("#endcityQuickPosition").show();
                        _obj.overlay.loadingHide();
                    }
                });
            }

        },
        selectedCityName: "深圳", //属性应该为可读 避免污染变量
        //selectedEndCityName:"",//end cityName
        selectedCityEvent: function (selectedCityName, isLoadStartCity) { //传入回调函数
            var elementID = "cityList";
            if (isLoadStartCity) {
                cityListPage.closePanel(); //关闭面板	
            } else {
                cityListPage.closeEndCityPanel();
                elementID = "endcityList";
            }
            //cityListPage.selectedCityName = selectedCityName;
            $("#" + elementID + " dd[data-name='" + selectedCityName + "']").addClass("cur").siblings().removeClass("cur");
        },
        openStartCityPanel: function () {
            $("#cityListPage").show();
            cityListPage.resetPanel();
        },
        openEndCityPanel: function () {
            $("#endcityListPage").show();
            cityListPage.resetEndCityPanel();
        },
        closePanel: function () {
            $("#cityListPage").hide();
        },
        closeEndCityPanel: function () {
            $("#endcityListPage").hide();
        },
        setPanelTitle: function (str) {
            $("#cityTips").text(str);
        },
        clearCityList: function () {
            $("#cityList").hide();
            //$("#cityList").empty();
            $("#cityList").show();
        },
        clearEndCityList: function () {
            $("#endcityList").hide();
            $("#endcityList").empty();
            $("#endcityList").show();
        },
        resetPanel: function () { //重置为最初状态
            $("#queryClean").hide();
            $("#cityMatch").hide();
            $("#startCityQueryClean").hide();
            $(".startCityList .location_box").show();
            $(".startCityList .hotcity_box").show();
            $("#quickPosition").show();
            $("#cityList").show();
            $("#cityInput").val("");
        },
        resetEndCityPanel: function () { //目的城市 重置为最初状态
            $("#endCityQueryClean").hide();
            $("#endcityMatch").hide();
            $(".endCityList .location_box").show();
            $(".endCityList .hotcity_box").show();
            if ($("#isLoadedEndcity").val() === "false") {
                $("#endcityQuickPosition").hide();
            } else {
                $("#endcityQuickPosition").show();
            }
            if ($("#isLoadedEndcity").val() === "false") {
                $("#endcityList").hide();
            } else {
                $("#endcityList").show();
            }
            $("#endCityInput").val("");
        }
    };
    return cityListPage;
});