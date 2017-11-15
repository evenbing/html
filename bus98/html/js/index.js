require.config({
baseUrl:  "js",
	paths: {
		"zepto": "zepto",
        "underscore":"underscore",
		"slider": "TouchSlider",/*轮播图*/
		"calendar":"calendar",/*日期选择*/
		"findCitys":"findCitys.js?v=1.2",
		"alertt":"zepto.alert",/*提示框*/
		"template":"template",
		"api":"api",
		"city":"city.js?v=1.1",
	    'common': 'common-utils',
	    //'baiduMap':'baidu_map',
		"appFunc":"appFunc",//定义function
		"dateHandler":"dateHandler"
	},
    shim:{
    	zepto: {
    		exports: '$'
    	}
    }
});
//,'baiduMap',_baidu_map
require([ 'zepto', 'underscore', 'calendar', 'slider', 'findCitys','alertt','api','appFunc','dateHandler','common'], function($, _,calendar,slider,findCitys,alertt,api,appFunc,dateHandler,_obj) {
	//var basePath = "http://localhost:8080";	
	var index = {
				init:function () {
			        $('._start_time').datePicker({
			        	type:'reserve',
			        	day:appFunc.getPreDay(),
			        	okreturn:function(){
			        		var dateTime = $("._start_time").val();
			        		if(dateTime==null||typeof(dateTime)=="undefined"||dateTime==""){
			        			return;
			        		}
			        		dateTime = dateTime.split(" ");
			        		var dt = new Date(dateTime);
			        		var month = (dt.getMonth() + 1)<10?"0"+(dt.getMonth() + 1):(dt.getMonth() + 1);
			        		var day = dt.getDate()<10?"0"+dt.getDate():dt.getDate();
			        		$("#dateline").html(month + "月" + day + "日");
			        		$(".city_week").html(dateHandler.getWeek(dateTime[0]));
						}
			        });
					$("#startDateInput").on("click",function(){
						$("._start_time").trigger("click");
					});
			        //end绑定日期
			        //关闭下载
			        index.download_close();
			        //出发目的城市值对换
			        index.switchCity();
		            //end出发目的城市值对换
		            //轮播图
			        index.touchSlider();
			        $(".liad").show();
		            //end轮播图
		            $('#searchSubmit').click(function() {
		            	index.sub();
		            });
		            index.loadSearchHistory();
		            $(".hot_line_l a").on("click",function(){
		            	var startCityName = $(this).attr("startCityName");
						var endCityName = $(this).attr("endCityName");
						var startDate = $("._start_time").val();
		            	window.location.href = domainURL + "/schedule/search?startCityName="+encodeURIComponent(encodeURIComponent(startCityName))+"&endCityName="+encodeURIComponent(encodeURIComponent(endCityName))+"&dateline="+encodeURIComponent(encodeURIComponent(startDate));
		            });
		            /*
		            setTimeout(function(){
		            	var is_show_order = _obj.cookie.getCookie("is_show_order");
		            	if(is_show_order==null||is_show_order==""){
				            //请求订单查询
			            	$.ajax({
								type : "POST",
								url : basePath + "/noPayOrder.html",
								timeout : 20000, 
								cache : false,
								success : function(result) {
									//列表
									if(result===null||$.trim(result)==""||typeof(result) == "undefined"){
										return;
									}
									if(result.indexOf("<!DOCTYPE html>")>=0){
										return;
									}
									result = JSON.parse(result);
									if (result.rsCode == "0") {
										var ctx = result.ctx;
										if(ctx==null||ctx==""||ctx.length<=0){
											return;
										}
										$(".indexprompt").html("<p>您已成功提交订单，请于10分钟内完成支付</p>");
										$("._order_notice_num").html('<i class="fot_new">'+ctx.length+'</i>');
									}
								},
								error:function(){
									return;
								}
							});
		            	}
		            },2000);*/
				},
				touchSlider : function(){
		            //轮播图
		            //TouchSlider
		      		var active=0,
		      		as=$('#pagenavi a');
		      		for(var i=0;i<as.length;i++){
		      			(function(){
		      				var j=i;
		      				as[i].onclick=function(){
		      					t2.slide(j);
		      					return false;
		      				}
		      			})();
		      		}
		      		var t2=new TouchSlider({id:'slider', speed:600, timeout:6000, before:function(index){
		      				as[active].className='';
		      				active=index;
		      				as[active].className='active';
		      			}});
		            //end轮播图
				},
				download_close : function(){
					var dataVal = _obj.cookie.getCookie("wx_index_download");
					//调用关闭app下载
		        	if(dataVal==null||dataVal==""){
		        		$(".fix_bottom_download").show();
		   		 	}else{
		   		 		$(".fix_bottom_download").hide();
		   		 	}
		        	$(".fix_bottom_download .download_close").on('click', function(){
		        		_obj.cookie.setCookie("wx_index_download","1",30*24*60*60);
		        		$(".fix_bottom_download").hide();
		        	});
		        	//end调用关闭app下载
				},
				letDivCenter : function (divName){   
				    var margintop = ($(divName).height())/2;   
				    var marginleft = ($(divName).width())/2;
				    $(divName).css({ 'margin-top' : -margintop, 'margin-left' : -marginleft, "top" : "50%" , "left" : "50%", position: "fixed"});  
				},
				switchCity : function(){
					//出发目的城市值对换
		            $('.switch').click(function() {
		                  var startCityV = $('#startCityName').val();
		            	   var destCityV = $('#endCityName').val();
		            	   $('#startCityName').val(destCityV);
		            	   $('#endCityName').val(startCityV);
		            });
		            //end出发目的城市值对换
				},
				sub : function sub() {
					var startCityName = $.trim($("#startCityName").val());
					var endCityName = $.trim($("#endCityName").val());
					var startDate = $("._start_time").val();
					if (startCityName == '' || endCityName == '' || startDate == '') {
						$.dialog({content : '请填写完整信息',title: "alert",width: 200,time : 1000});
					} else {
					   	/*if(!findCitys.isSaleTicketOnline(startCityName)){
					   		$.dialog({content : '该城市暂未开通网上售票',title: "alert",width: 200,time : 2000});
					   		return false;
					   	}*/
						var savedate=new Date().Format("yyyy/MM/dd hh:mm:ss");
						var timeout=dateHandler.addDate(savedate,365).Format("yyyy/MM/dd hh:mm:ss");
						appFunc.saveLocalStorage(api.key_searchSchedule,
								{startCity:startCityName,
								 endCity:endCityName,
								 savedate:savedate,
								 timeout:timeout}//起始城市和过期时间
						);//保存localstorage
						//显示查询进度条
//						_obj.overlay.loadingShow();
						window.location.href =domainURL + "/schedule/search?startCityName="+encodeURIComponent(encodeURIComponent(startCityName))+"&endCityName="+encodeURIComponent(encodeURIComponent(endCityName))+"&dateline="+encodeURIComponent(encodeURIComponent(startDate));
					}
				},
				loadSearchHistory:function(){
					var searchData=appFunc.getLocalStorageByKey(api.key_searchSchedule);
					if(!_.isUndefined(searchData) && !_.isNull(searchData)){
						searchData=JSON.parse(searchData);
						$("#startCityName").val(searchData.startCity);
						$("#endCityName").val(searchData.endCity);
					}
				},
				locationShow:function(locationAddr){
					$("._locationAddr").html(locationAddr);
					$("._noLocation").css("display","none");
					$("._yesLocation").css("display","block");
				},
				locationHide:function(){
					$("._locationAddr").html("");
					$("._noLocation").css("display","block");
					$("._yesLocation").css("display","none");
				},
				locationDetail:function(data){
					//var stCity = _baidu_map.receiveCity(data);
					//index.locationShow(stCity);
				}
		};
        $(function(){
    		//初始化
    		index.init();
    		findCitys.init();
            //弹窗广告
	        var sver = _obj.cookie.getCookie("index_advice");
	        var nver = $("._index_open_advert").attr("version");
	        if($("._index_open_advert").html()==null||sver==null||sver==nver){}else{
		        _obj.overlay.show();
		        $("._index_open_advert").show();
		        index.letDivCenter("._index_open_advert");
		        $("._index_open_advert").css({ 'margin-top' : "-180px"});
		        _obj.cookie.setCookie("index_advice",nver,2*60*60);
	        }
	        $("#_advert_iknow").on("click",function(){
	        	_obj.overlay.hide();
	        	$("._index_open_advert").hide();
	        });

	        $("#_advert_notip").on("click",function(){
	        	_obj.overlay.hide();
	        	$("._index_open_advert").hide();
		        var nver = $("._index_open_advert").attr("version");
			    _obj.cookie.setCookie("index_advice",nver,2*24*60*60);
	        });
	        $("._close_advert").on("click",function(){
	        	_obj.overlay.hide();
		        $("._index_open_advert").hide();
	        });
	        //定位
	        //_baidu_map.autoPosition(index.locationDetail);
        });
});