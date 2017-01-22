//定义api 常量 和常见，或者扩展方法
define(["zepto","api"], function($,api) {
	return {
		getScheduleUrl : function() {
//			return "/ajax/chepiaoSearchData.html";
			return "/ajax/ajaxSearchSchedule";
		},
		getStationUrl : function() {
			return "/ajax/chepiao_list.html";
		},
		getChezhanUrl:function(){
			return "/ajax/chezhan_list.html";
		},getRemainTicketUrl:function(){
//			return "/ajax/ajaxGetRemainingTicket.html";
			return "/ajax/getRemainTicket";
		},
		getStartCityUrl:function(){
			return "/ajax/startCitys.html";
		},
		getEndCityUrl:function(){//修改后
			return "/ajax/getEndCityJsonByStartCity";
		},
		getLoginUrl:function(){
			return "/ajax/Login.html";
		},
		getRegisterMsgCodeUrl:function(){
			return "/ajax/registerCode.html";
		},
		getFindPwdMsgCodeUrl:function(){
			return "/ajax/forgetPasswordCode.html";
		},
		getVerifyMsgCodeUrl:function(){
			return "/ajax/verifyMsgCode.html";
		},
		getAjaxRegisterUrl:function(){
			return "/ajax/Register.html";	
		},
		getResetPwdUrl:function(){
			return "/ajax/resetPassword.html";
		},
		getAppendOption : "APPEND" //定义操作--附加到HTML到文件末尾
		,getInsertOption : "INSERT" //定义操作--清空当前，并且插入到其中
		,getFilterByTime:"BYTIME"
		,getFilterByStationName:"BYSTATIONNAME"
		,key_searchSchedule:"SCHEDULE_SEARCH_HISTORY"//保存最近时刻表localstorage  key
		,key_startCityPreDate:"STARTCITY_PREDATE"
	}
});
