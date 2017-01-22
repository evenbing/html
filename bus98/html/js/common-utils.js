var _obj = {};
define(['zepto'],function($){
	//var _obj={}
	/*页面需要一个class="overlay"的div*/
	_obj.overlay = {
		show:function(){
			$(document.body).append('<div class="overlay"></div>');
			$(".overlay").attr("style","background: #000;filter: alpha(opacity = 30);filter: alpha(opacity = 30);opacity: 0.3;"+
					"position: absolute;top: 0px;left: 0px;"
					+ "width: 100%;height: 100%;z-index: 1000;");
			//计算弹出层
			var height = $(document).height();
			//浏览器可视高度
			var clientHeight = $(window).height();
			if(height<clientHeight){
				height = clientHeight;
			}
			$(".overlay").css("height",height+"px");
			//让滚动条消失
			/*
			$("html").css({
                "height": "100%",
                "overflow": "hidden"
            });
            */
			$(".overlay").css("display","block");
		},
		hide:function(){
			//让滚动条显示
			/*
			 $("html").css({
                 "overflow": "auto"
             });
             */
			$(".overlay").remove();
		},
		loadingShow:function(){
			_obj.overlay.show();
			$(document.body).append('<div class="load3" id="_loading_div"><div class="lrond"><div class="ltest"></div></div><div class="load"><p>加载中</p></div></div>');
   			//var left = ($(document).width()-200)/2;
   			//var top = ($(window).height()-74)/2;
   			//$("#_loading_div").css("top",top + "px");
   			//$("#_loading_div").css("left",left + "px");
		},
		loadingHide:function(){
   			$("#_loading_div").remove();
			_obj.overlay.hide();
		}
	}
	_obj.openDialog = {
			dialogHtml:function(code,desc){
				return '<div class="_warm_prompt" style="width: 420px;position:fixed;box-shadow: 0 0 5px #aaa;z-index:1000;display: none;">'+
						'<div class="ui_title_wrap">'+
							'<div class="ui_title">'+
								'<div class="ui_title_text">'+
									'<span class="ui_title_icon"></span>温馨提示'+
								'</div>'+
								'<div class="ui_btn_wrap">'+
									'<a class="ui_btn_close" onclick="_obj.openDialog.hide();">关闭</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="wp_bd">'+
							'<i class="'+(code==0?"i_right":"i_error")+'"></i>'+
							'<span style="text-align:center;">' +desc + '</span>'+
						'</div>'+
					'</div>';
			},
			dialogNoCloseHtml:function(code,desc){
				return '<div class="_warm_prompt" style="width: 420px;position:fixed;box-shadow: 0 0 5px #aaa;z-index:1000;display: none;">'+
						'<div class="ui_title_wrap">'+
							'<div class="ui_title">'+
								'<div class="ui_title_text">'+
									'<span class="ui_title_icon"></span>温馨提示'+
								'</div>'+
								'<div class="ui_btn_wrap"></div>'+
							'</div>'+
						'</div>'+
						'<div class="wp_bd">'+
							'<i class="'+(code==0?"i_right":"i_error")+'"></i>'+
							'<span style="text-align:center;">' +desc + '</span>'+
						'</div>'+
					'</div>';
			},
			showNoClose:function(code,charNum,desc){
				_obj.overlay.show();
				if (isNaN(charNum)||charNum<9) {
					charNum = 9;
				}
				//计算字体宽度
				var ctxWidth = charNum*16 + 45 + 200;
				$(document.body).append(_obj.openDialog.dialogNoCloseHtml(code,desc));
				$("._warm_prompt").css("width",ctxWidth + "px");
				_obj.openDialog.scrollOpt();
				$("._warm_prompt").fadeIn("normal");
			},
			show:function(code,charNum,desc){
				_obj.overlay.show();
				if (isNaN(charNum)||charNum<9) {
					charNum = 9;
				}
				//计算字体宽度
				var ctxWidth = charNum*16 + 45 + 200;
				$(document.body).append(_obj.openDialog.dialogHtml(code,desc));
				$("._warm_prompt").css("width",ctxWidth + "px");
				_obj.openDialog.scrollOpt();
				$("._warm_prompt").fadeIn("normal");
			},
			hide:function(){
				$("._warm_prompt").fadeOut("normal",function(){
					_obj.overlay.hide();
					$("._warm_prompt").remove();
				});
			},
	   		scrollOpt:function(){
	   			var left = ($(document).width()-$("._warm_prompt").width())/2;
	   			var top = ($(window).height()-$("._warm_prompt").height())/2;
	   			$("._warm_prompt").css("top",top + "px");
	   			$("._warm_prompt").css("left",left + "px");
	   		}
	};	
	_obj.cookie = {
		get:function(cookieName){
			var ckArray = document.cookie.split(";");
			for(var i=0;i<ckArray.length;i++){
				var keyVal = $.trim(ckArray[i]).split("=");
				if(keyVal[0]==cookieName){
					return decodeURIComponent(keyVal[1]);
				}
			}
			return "";
		},
		setCookie:function(name,value,expsec){ 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() + expsec*1000); 
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/"; 
		},
		getCookie:function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg)){
		        return unescape(arr[2]); 
		    }else{
		    	return null; 
		    } 
		}
	};
	_obj.browser = {
		isWeiXinClient:function(){
			var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}
	};
	_obj.calendar = {
		addDay:function(date,num){
			if(date instanceof Date){
				date.setDate(date.getDate() + num);
			}else{
				date = new Date();
			}
			var month = date.getMonth()+1;
			if(month<10){
				month = "0" + month;
			}
			var day = date.getDate();
			if(day<10){
				day = "0" + day;
			}
			return date.getFullYear()+'-'+month+'-'+day; 
		}	
	};
	_obj.date = {
		getWeek:function(dateStr){	//传入从服务器写到本地的时间，id=InputDate
			var paramDate = new Date(dateStr);
			if(isNaN(paramDate.getFullYear())){
				return null;
			}
			var nowDate = new Date();
			if(paramDate.getFullYear()==nowDate.getFullYear()&&paramDate.getMonth()==nowDate.getMonth()){
				if(paramDate.getDate()==nowDate.getDate()){
					return "今天";
				}else if(paramDate.getDate()==(nowDate.getDate()+1)){
					return "明天";
				}else if(paramDate.getDate()==(nowDate.getDate()+1)){
					return "后天";
				}
			}
			var resultWeek = "";
			switch(paramDate.getDay()){
				case 0:
					resultWeek = "周日";break;
	            case 1:
	            	resultWeek = "周一";break;
	            case 2:
	            	resultWeek = "周二";break;
	            case 3:
	            	resultWeek = "周三";break;
	            case 4:
	            	resultWeek = "周四";break;
	            case 5:
	            	resultWeek = "周五";break;
	            case 6:
	            	resultWeek = "周六";break;
			}
			return resultWeek;
		}	
	};
	_obj.tools = {
		letDivCenter : function (divName){   
		    var margintop = ($(divName).height())/2;   
		    var marginleft = ($(divName).width())/2;
		    $(divName).css({ 'margin-top' : -margintop, 'margin-left' : -marginleft, "top" : "50%" , "left" : "50%", position: "fixed"});  
		},
		checkMobile:function(mobilePhone){
			var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			return reg.test(mobilePhone);
		},
		checkPositiveNumber:function(number){
			var reg = /^[1-9][0-9]*$/;
			return reg.test(number);
		},
		checkCertificateNo:function(num) {
			var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5,
					8, 4, 2, 1);
			var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4",
					"3", "2", "x");
			var varArray = new Array();
			var intValue;
			var lngProduct = 0;
			var intCheckDigit;
			var intStrLen = num.length;
			var idNumber = num;
			if ((intStrLen != 15) && (intStrLen != 18)) {
				return false;
			}
			var i=0;
			for (i = 0; i < intStrLen; i++) {
				varArray[i] = idNumber.charAt(i);
				if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
					return false;
				} else if (i < 17) {
					varArray[i] = varArray[i] * factorArr[i];
				}
			}
			if (intStrLen == 18) {
				var date8 = idNumber.substring(6, 14);
				if (this.isDate8(date8) == false) {
					return false;
				}
				for (i = 0; i < 17; i++) {
					lngProduct = lngProduct + varArray[i];
				}
				intCheckDigit = parityBit[lngProduct % 11];
				try {
					if (varArray[17].toUpperCase() != intCheckDigit.toUpperCase()) {
						return false;
					}
				} catch (e) {
					return false;
				}
			} else { // length is 15
				var date6 = idNumber.substring(6, 12);
				if (isDate6(date6) == false) {
					return false;
				}
			}
			return true;
		},
		isDate8:function(sDate) {
			if (!/^[0-9]{8}$/.test(sDate)) {
				return false;
			}
			var year, month, day;
			year = sDate.substring(0, 4);
			month = sDate.substring(4, 6);
			day = sDate.substring(6, 8);
			var iaMonthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
			if (year < 1700 || year > 2500)
				return false
			if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
				iaMonthDays[1] = 29;
			if (month < 1 || month > 12)
				return false
			if (day < 1 || day > iaMonthDays[month - 1])
				return false
			return true
		},
		compareTime:function(dateOne,dateTwo){
			var dtOne = 0,dtTwo = 0;
			if(dateOne instanceof Date){
				dateOne.setHours(0,0,0,0);
				dtOne = dateOne.getTime();
			}else{
				return -1;
			}
			if(dateTwo instanceof Date){
				dateTwo.setHours(0,0,0,0);
				dtTwo = dateTwo.getTime();
			}else{
				var date = new Date();
				date.setHours(0,0,0,0);
				dtTwo = date.getTime();
			}
			if(dtOne>dtTwo){
				return 1;
			}else if(dtOne==dtTwo){
				return 0;
			}else{
				return -1;
			}
		},
		getUrlAddrParam:function() {
		  	var url = location.search; //获取url中"?"符后的字串
		   	var theRequest = new Object();
		   	if (url.indexOf("?") != -1) {
		      	var str = url.substr(1);
		      	strs = str.split("&");
		      	for(var i = 0; i < strs.length; i ++) {
		         	theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		      	}
		   	}
		   	return theRequest;
		}
	};
	_obj.redirect = function(urlAddr){
		var newUrlAddr = urlAddr;
		if(newUrlAddr.indexOf("?")>=0){
			newUrlAddr = newUrlAddr + "&_random=" + Math.random();
		}else{
			newUrlAddr = newUrlAddr + "?_random=" + Math.random();
		}
		window.location.href = newUrlAddr;	
	};
	return _obj;
});