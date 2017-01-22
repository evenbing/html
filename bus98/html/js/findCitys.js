/**
 * 出发城市，目的城市，车站查询城市
 */
define(['zepto','city','api','underscore','appFunc','dateHandler','alertt','common'],function ($,cityListPage,api,_,appFunc,dateHandler,alertt,_obj) {
	var basePath = $("#basePath").val();
	var param={};
	$("#isLoadedEndcity").val("false");
	var isFirstLoadedEndcity=true;
	var findCitys = {
		isSaleTicketOnline : function (startCityName){
			var cityListStr = $("#cityList").html();
			if(cityListStr.indexOf(startCityName)>=0) {
				return true;
			} else {
				return false;
			}
		},
		selectStartCity:function(selectedName){
			var oldStartCityName = $.trim($("#startCityName").val());
        	cityListPage.selectedCityEvent(selectedName,true);//参数传入 true 关闭起始城市面版 false  关闭到达城市
        	$("#startCityName").val(selectedName);
        	$("#endCityName").val("");//清空目的城市
        	if(oldStartCityName!=selectedName){//如果再次选中的城市名称和之前的一样 不去请求后台数据 只需要显示
        		var preDate = $("#cityList dd[data-name='"+selectedName+"']").attr("data-predate");
        		if(preDate==null||preDate==""){}else{
	        		appFunc.saveLocalStorage(api.key_startCityPreDate,JSON.stringify({startCity:selectedName,preDate:preDate}));
	        		findCitys.preDate=preDate;
	        		$('._start_time').datePicker({type:'reserve',day:parseInt(preDate),okreturn:function(){
			        		var dateTime = $("._start_time").val();
			        		if(dateTime==null||typeof(dateTime)=="undefined"||dateTime==""){
			        			return;
			        		}
			        		dateTime = dateTime.split(" ");
			        		var dt = new Date(dateTime);
			        		var month = (dt.getMonth() + 1)<10?"0"+(dt.getMonth() + 1):(dt.getMonth() + 1);
			        		var day = dt.getDate()<10?"0"+dt.getDate():dt.getDate();
			        		$("#dateline").html(month + "月" + day);
			        		$(".city_week").html(dateHandler.getWeek(dateTime[0]));
						}
			        });
		        	param.startCityName=selectedName;//加载出发城市的时候,加载到达城市，加快网页相应速度 减少用户等待时间
		        	param.endCityName="";
		        	if(param.startCityName.length==0){
		        		return false;
		        	}
	        		cityListPage.loadCityData(false,param);
	        		isFirstLoadedEndcity=false;
        		}
        	}
		},
		init : function(){
	        $("#startCityName").on("click",function(){
	        	cityListPage.isStartCityPanel=true;
	        	cityListPage.openStartCityPanel();
	        	$("#cityListPage .quickPosition").height($(window).height()-$(".middleFixedc").height()-$(".topFixedc").height());
	    	});
	        $("#endCityName").on("click",function(){//加载到达城市
	        	var startCityName=$.trim($("#startCityName").val());
	        	if(startCityName.length>0){
		        	//到达城市还未加载完成 显示  loading
		        	if($("#isLoadedEndcity").val()==="false"){
		        		_obj.overlay.loadingShow();	
		        	}
		        	if(isFirstLoadedEndcity){//未选择 出发城市时 选择到达城市
		        		param.startCityName=startCityName;
		        		cityListPage.loadCityData(false,param);
		        		isFirstLoadedEndcity=false;
		        	}
		        	cityListPage.openEndCityPanel(); 	 
		        	cityListPage.isStartCityPanel=false;
	        	}else{
	        		$.dialog({content : "请选择出发城市",title: "alert",width: 200,time : 1000});
	        	}
	        });
	        //热门城市，历史城市
	        $("._hotcity_box_start span").on("click",function(){
	        	$("._hotcity_box_start span").removeClass("cur");
	        	$(this).addClass("cur");
	        	var obj = $(this);
	        	var selectedName = $.trim(obj.text());
	        	findCitys.selectStartCity(selectedName);
	        });
	        $(".startCityList").on("click","dd",function(){//保存出发城市预售期 格式：{"startCity":"北京","preDate":"5"}
	        	var obj = $(this);
	        	var selectedName = $.trim(obj.text());
	        	findCitys.selectStartCity(selectedName);
	        });
	        
	        $(".endCityList").on("click","dd",function(){
	        	var endCityName=$.trim($(this).text());
	        	$("#endCityName").val(endCityName);
	          	cityListPage.selectedCityEvent(endCityName,false);
	        	cityListPage.closeEndCityPanel();
	        });
	        
		},
		preDate:20//出发城市预售期 
	};
	return findCitys;
});
