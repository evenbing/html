require.config({
	baseUrl: "js",
	paths: {
			"zepto": "zepto",
			"underscore":"underscore",
			"calendar":"calendar.js?v=3.0",/*日期选择*/
			'common': 'common-utils',//loading 模块 loading显示隐藏
			"api":"api",//常见变量
			"appFunc":"appFunc",//定义function
			"template":"template",//定义模板操作模块
			"dateHandler":"dateHandler",//定义日期操作模块
			"alertt":"zepto.alert"
	},
    shim:{
    	zepto: {
    		exports: '$'
    	}
    }
});

require([ 'zepto', 'underscore', 'calendar', 'api','appFunc', 'dateHandler','common', 'template',"alertt"],
		function($, _, calendar, api, appfunc, dateHandler, _obj, template,alertt) {
	var basePath = "";
	var firstDate=$("#todayDate").val();			//当天时间
	var condition = {
		startCityName : $("#startCityName").val(),
		endCityName : $("#endCityName").val(),
		inputDate : $("#inputDate").val()
	};
	var handler={//定义处理程序 代码需要重构 注意 逻辑和事件处理分开 
			loadScheduleData:function(){
				//加载时刻表数据
				_obj.overlay.loadingShow();
				$.ajax({
					url : api.getScheduleUrl(),
					type: 'POST',
					timeout : 20000, 
					data : condition,
					success : function(msg) {
						$("#content").html(msg);
						search.dataHtml = msg;
						//加载上车点
						search.loadStartPlace();
						//加载下车点
						search.loadEndPlace();
						//绑定事件
						search.bundEvent();
						//查询结束
						$("#req_error").css("display","none");
						$("#content").css("display","block");
					},
					error:function(){
						//查询结束
						$("#req_error").css("display","block");
						$("#content").css("display","none");
					},
					complete : function() {
						_obj.overlay.loadingHide();
					}
				});
			},checkRemainTicket:function(_obj){//检查余票
				var busLineId = _obj.attr("busLineId");
				var startStationCode = _obj.attr("startStationCode");
				var endCityCode = _obj.attr("endCityCode");
				var busLineCode = _obj.attr("busLineCode");
				//busLineId,startStationCode,endCityCode,busLineCode,startDate
				if(busLineId!=""&&startStationCode!=""||endCityCode!=""){
					appfunc.handlerAjax(api.getRemainTicketUrl(),{"busLineId": busLineId,"startStationCode": startStationCode,"endCityCode": endCityCode,"busLineCode": busLineCode,"startDate": condition.inputDate},function(result){
						if(result.resultCode == "0"){
							$.dialog({
						        content : result.resultMsg,
						        title : 'alert',
						        ok : function() {
						        	_obj.find('ul').addClass('graybg');
						        	_obj.find('ul').find('.btn_b').attr('class','btn_g').html('无票');
						        	//改为没余票
						        },
						        lock : true
						    });
						}else{
							 window.location.href = "../order/create?busLineId=" + busLineId;
						}
					});
				}
			},getScheduleDataByDataTime:function(dateTime){//获取时间获取时刻表数据
				condition.inputDate = dateTime;
				var week = dateHandler.getWeek(dateTime);
				var urlAddr = "";
				if(condition.startCityName == undefined|| condition.endCityName == undefined){
					urlAddr = basePath + "/schedule/search";
				}else{
					urlAddr = basePath + '/schedule/search?startCityName='+ encodeURIComponent(encodeURIComponent(condition.startCityName))
					+'&endCityName=' + encodeURIComponent(encodeURIComponent(condition.endCityName))
					+'&dateline=' + encodeURIComponent(encodeURIComponent(dateTime));
				}
				window.location.href = urlAddr;
			},
			currTab:"",//选中的Tab元素Id
			opendPagePanel:"",//打开的面板元素Id
	};
	
	var search = {	
		/**查询结束后调用*/
		dataHtml:"",	
		hideCondition:function(){
			$("#timePage").css("display","none");
			$("#stationPage").css("display","none");
			$("#sortPage").css("display","none");
		},
		getAllStartPlace:function(){
			var dataHtml = search.dataHtml;
			var startPlaceStr = '';
			var startPlaceObj  = $(dataHtml).find("._start_station");
			for(var i=0;i<startPlaceObj.length;i++){
				var startPlaceName = $(startPlaceObj[i]).text().trim();
				if(startPlaceStr.indexOf(startPlaceName)<0){
					startPlaceStr += startPlaceName + "_";
				}
			}
			var array = startPlaceStr.split("_");
			return array;
		},
		hideListScroll:function(){
			var listHeight = document.documentElement.clientHeight - 129;
			$("#content").css("height",listHeight+"px");
			$("#content").addClass("hideListScroll");
			//加上遮罩
			if ($("#mblocker")) {
	            $("#mblocker").remove()
	        }
	        var V = document.createElement("div");
	        V.setAttribute("id", "mblocker");
			(document.body || document.documentElement).appendChild(V);     
		},
		showListScroll:function(){
			$("#content").removeClass("hideListScroll");
			$("#content").css("height","auto");
			//删除遮罩
			if ($("#mblocker")) {
		        $("#mblocker").remove();
		    }
		},
		loadStartPlace:function(){
			var startPlaceArray = search.getAllStartPlace();
			var startPlaceHtml = '';
			if(startPlaceArray==null||$.trim(startPlaceArray)==""||typeof(startPlaceArray) == "undefined"||startPlaceArray.length<=0){
				
			}else{
				var showName = "";
				for(var i=0;i<startPlaceArray.length;i++){
					if(startPlaceArray[i]==""){
						continue;
					}
					if(startPlaceArray[i].length>10){
						showName = startPlaceArray[i].substr(0,10)+"...";
					}else{
						showName = startPlaceArray[i];
					}
					startPlaceHtml += '<li data-val="'+startPlaceArray[i]+'"><label>'+showName+'</label></li>';
				}
			}
			$(".startPlaceList").html(startPlaceHtml);
		},
		getAllEndPlace:function(){
			var dataHtml = search.dataHtml;
			var endPlaceObj  = $(dataHtml).find("._end_station");
			var endPlaceStr = "";
			for(var i=0;i<endPlaceObj.length;i++){
				var endPlaceName = $(endPlaceObj[i]).text().trim();
				if(endPlaceStr.indexOf(endPlaceName)<0){
					endPlaceStr += endPlaceName + "_";
				}
			}
			var array = endPlaceStr.split("_");
			return array;
		},
		loadEndPlace:function(){
			var endPlaceArray = search.getAllEndPlace();
			var endPlaceHtml = '';
			if(endPlaceArray==null||$.trim(endPlaceArray)==""||typeof(endPlaceArray) == "undefined"||endPlaceArray.length<=0){}
			else{
				var showName = "";
				for(var i=0;i<endPlaceArray.length;i++){
					if(endPlaceArray[i]==""){
						continue;
					}
					if(endPlaceArray[i].length>10){
						showName = endPlaceArray[i].substr(0,10)+"...";
					}else{
						showName = endPlaceArray[i];
					}
					endPlaceHtml += '<li data-val="'+endPlaceArray[i]+'"><label>'+showName+'</label></li>';
				}
			}
			$(".endPlaceList").html(endPlaceHtml);
		},
		receiveDataArray:function(){
			//排序
			var dataHtml = search.dataHtml;
			var startPlaceObj  = $(dataHtml).find("._start_station");
			var endPlaceObj  = $(dataHtml).find("._end_station");
			var dataArray = new Array();
			for(var i=0;i<startPlaceObj.length;i++){
				dataArray[i] = $(startPlaceObj[i]).text() + "_" + $(endPlaceObj[i]).text() + "_" + i;
			}
			return dataArray;
		},
		bundEvent:function(){
			//订票
			$(".chepiao_list a").unbind("click").on("click",function(){
				handler.checkRemainTicket($(this));
			});
			//刷新
			$("._refresh").unbind("click").on("click",function(){
				_obj.overlay.loadingShow();
				setTimeout(function(){
					handler.getScheduleDataByDataTime(condition.inputDate);
				},2000);
			});
			//首页
			$("._index").unbind("click").on("click",function(){
				handler.getScheduleDataByDataTime(condition.inputDate);
			});
			//上车点查询
			$(".startPlaceList li").unbind("click").on("click",function(){
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				var thisVal = $(this).attr("data-val");
				$(".startPlaceList li").removeClass("cur");
				$(this).addClass("cur");
				$("#selectStartPalce").addClass("active");
				search.execute();
				//隐藏滚动条
				search.showListScroll();
			});
			//下车点查询
			$(".endPlaceList li").unbind("click").on("click",function(){
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				var thisVal = $(this).attr("data-val");
				$(".endPlaceList li").removeClass("cur");
				$(this).addClass("cur");
				$("#selectEndPalce").addClass("active");
				search.execute();
				//隐藏滚动条
				search.showListScroll();
			});
			//选择全部起始站点
			$(".cancelStartPlaceFilter").unbind("click").on("click",function(){
				$("#selectStartPalce").removeClass("active");
				$(".startPlaceList li").removeClass("cur");
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				search.execute();
				//隐藏滚动条
				search.showListScroll();
			});
			//取消
			$(".closeStartPlace").unbind("click").on("click",function(){
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				//隐藏滚动条
				search.showListScroll();
			});
			//选择全部目的地站点
			$(".cancelEndPlaceFilter").unbind("click").on("click",function(){
				$("#selectEndPalce").removeClass("active");
				$(".endPlaceList li").removeClass("cur");
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				search.execute();
				//隐藏滚动条
				search.showListScroll();
			});
			$(".closeEndPlace").unbind("click").on("click",function(){
				$("#startPlacePage").css("display","none");
				$("#endPlacePage").css("display","none");
				//隐藏滚动条
				search.showListScroll();
			});
		},
		filterData:function(){
			var allDataArray = search.receiveDataArray();
			//上车点过滤
			var startPlaceCondition = $(".startPlaceList li.cur").attr("data-val");
			if(startPlaceCondition==null||startPlaceCondition==""||typeof(startPlaceCondition) == "undefined"){}else{
				startPlaceCondition = startPlaceCondition.trim();
			}
			if(startPlaceCondition==null||startPlaceCondition==""){}else{
				allDataArray = $.grep(allDataArray, function (data, index) {
					var dataArray = data.split("_");
					if(dataArray[0]==startPlaceCondition){
						return true;
					}
				});
			}
			//下车点过滤
			var endPlaceCondition = $(".endPlaceList li.cur").attr("data-val");
			if(endPlaceCondition==null||endPlaceCondition==""||typeof(endPlaceCondition) == "undefined"){}else{
				endPlaceCondition = endPlaceCondition.trim();
			}
			if(endPlaceCondition==null||endPlaceCondition==""){}else{
				allDataArray = $.grep(allDataArray, function (data, index) {
					var dataArray = data.split("_");
					if(dataArray[1]==endPlaceCondition){
						return true;
					}
				});
			}
			return allDataArray;
		},
		execute:function(){
			var dataArray = search.filterData();
			if(dataArray.length<=0){
				$("#content").css("display","none");
				$("#page_search_nodata").css("display","block");	
			}else{
				$("#content").css("display","block");
				$("#page_search_nodata").css("display","none");
			}
			var newHtml = "";
			var dataObj  = $(search.dataHtml).find("._search_index");
			for(var i=0;i<dataArray.length;i++){
				var index = parseInt(dataArray[i].split("_")[2]);
				newHtml += $(dataObj[index]).prop("outerHTML");
			}
			$(".chepiao_list").html(newHtml);
			//事件绑定
			search.bundEvent();
		}
	};
	var data = {
		init : function() {
			this.bind();
		},
		bind : function() {
			var events = [
					{element : "#prev_next li",// 元素ID 
						event : "click",// 元素事件类型
						handler : function() {// 处理函数
							var elementId=$(this).attr("id");
							var dateTime=null;
							//当前时间
							var todayDate = new Date($("#todayDate").val());
							//查询时间
							var searchDate = new Date($("._start_time").val());
							if(elementId=="prevDay"){	// 小于当前时间 return
								var date=new Date(searchDate); 
								date.setDate(date.getDate()-1); 
								if(_obj.tools.compareTime(date,todayDate)<0){
									$.dialog({content : '您查询的数据已过期!',title: "alert",width: 150,time : 1000});
									return;
								}
								//刷新
								handler.getScheduleDataByDataTime(date.Format("yyyy-MM-dd"));
								return false;
							}else if(elementId==="nextDay"){
								//下一天
								var date = new Date(searchDate); 
								date.setDate(date.getDate()+1); 
								//预售期最后一天
								var endDate =  new Date(todayDate.getTime() + (condition.preDay-1)*24*60*60*1000);
								if(_obj.tools.compareTime(date,endDate)>0){
									$.dialog({content : '查询时间已超出预售期!',title: "alert",width: 150,time : 1000});
									return;
								}
								//刷新
								handler.getScheduleDataByDataTime(date.Format("yyyy-MM-dd"));
							}else if(elementId==="currentDay"){//点击当前日期，弹出日期控件
								return;
							}
						}
					},{
						element : "#screening li",//tab切换
						event : "click",
						handler : function() {
							var clickElement=$(this);
							handler.switchTab(clickElement.attr("refer"));
							handler.currTab=clickElement.attr("id");
						}
					},{
						element:"#searchStation",//查询车站
						event : "click",
						handler:function(){
							var searchStr=$.trim($("#searchName").val());
							if(searchStr.length>0){
								window.location.href=api.getChezhanUrl()+"?cityName="+encodeURI(searchStr);
							}
						}
					},{
						element:"#searchName",
						event : "input",
						handler:function(){
							if($.trim($(this).val()).length<=0){
								$("#queryClean").hide();
							}else{
								$("#queryClean").show();
							}
						}
					},{
						element:"#queryClean",
						event : "click",
						handler:function(){
							$("#searchName").val("");
							$(this).hide();
						}
					}
			];
			appfunc.bindEvents(events);// 绑定事件
		}
	};
	data.init();// 实例化方法
	$(function(){
		//日期控件
		$("._start_time").datePicker({
			type:'reserve',
        	day:appfunc.getPreDay(),
			okreturn:function(){
				handler.getScheduleDataByDataTime($("._start_time").val());
			}
		});
		$("#_showDate").on("click",function(){
			$("._start_time").trigger("click");
		});
		
		$("#selectStartPalce").on("click",function(){
			var displayVal = $("#startPlacePage").css("display");
			if(displayVal=="none"){
				$("#startPlacePage").css("display","block");
				search.hideListScroll();
			}else{
				$("#startPlacePage").css("display","none");
				search.showListScroll();
			}
			$("#endPlacePage").css("display","none");
		});
		$("#selectEndPalce").on("click",function(){
			var displayVal = $("#endPlacePage").css("display");
			if(displayVal=="none"){
				$("#endPlacePage").css("display","block");
				search.hideListScroll();
			}else{
				$("#endPlacePage").css("display","none");
				search.showListScroll();
			}
			$("#startPlacePage").css("display","none");
		});
		//首次加载数据
		handler.loadScheduleData();
	});

});
