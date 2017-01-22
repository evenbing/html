//定义function bindEvents：传入参数对象 {element:"#id",event:"click",handle:function(){code }} 批量绑定事件 
"use strict";
define("appFunc", ["zepto","common","underscore"], function($,_obj,_) {
	
	// 扩展方法 时间格式化
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+" : this.getMonth() + 1, // 月份
			"d+" : this.getDate(), // 日
			"h+" : this.getHours(), // 小时
			"m+" : this.getMinutes(), // 分
			"s+" : this.getSeconds(), // 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
			"S" : this.getMilliseconds()							// 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	
    var a = {
        bindEvents: function(b) {
            for (var c in b) {
                if (b[c].selector) {
                    $(b[c].element).on(b[c].event, b[c].selector, b[c].handler);
                } else {
                    $(b[c].element).on(b[c].event, b[c].handler);
                }
            }
        },
        handlerAjax:function(url,condition,callback){//处理 ajax请求 url：请求地址 condition：参数条件 callback:回调函数
        	_obj.overlay.loadingShow();
    		$.ajax({
				type : 'POST',
				url : url + "?v=" + Math.random(),
				data : condition || "",
				timeout : 20000,
				success : function(result) {
					if(result===null||$.trim(result)==""||typeof(result) == "undefined"){
						$.dialog({content : "服务器异常,请稍后再试",title: "alert",width: 200,time : 2000});
						return ;
					}
					if(result.indexOf("<!DOCTYPE html>")>=0){
						window.location.href = basePath+"/login.html?v="+Math.random();
					}
					if(typeof callback==="function"){//执行回调函数
						callback(JSON.parse(result));
					}
				},
				error : function(xhr, type) {
					$.dialog({content : "网络异常,请稍后再试",title: "alert",width: 200,time : 2000});
				},
				complete : function() {
					_obj.overlay.loadingHide();
				}
			});
        },
        isIllegalCharacter: function(str) {//非法字符验证验证
        	  var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）;—|{}【】‘；：”“'。，、？]");
        	  return pattern.test(str);  
        },isMobile:function(str){//手机号码验证
        	if(!this.isIllegalCharacter(str)){
        	   var pattern = /^(1)\d{10}$/;
           	    return pattern.test(str);
        	}
        },isImgCode:function(str){//是图片验证码
        	var pattern = /^\d{4}$/;
        	return pattern.test(str);
        },isMsgCode:function(str){//是短信验证码
        	var pattern = /^\d{6}$/;
        	return pattern.test(str);
        },isEmail:function(str)//是邮箱
        {
        	var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        	return pattern.test(str);
        },isImageFile : function(str) {//是图片
			var isImage = false;
			if (str.length > 0 && str.indexOf(".") > -1) {
				var fileExt = str.toLowerCase().substr(str.lastIndexOf("."));
				var imageExt = new Array(".jpg", ".jpeg", ".png",".gif");
				$.each(imageExt, function(index, item) {
					if (item === fileExt) {
						isImage = true;
					}
				});
			}
			return isImage;
		},
 
        IdentityCodeValid:function(num) {
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
		},isDate8:function(sDate) {
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
		saveLocalStorage:function(key,data){//保存localStorage key data 可以是对象或者字符串
                	if(_.isObject(data)){
                		data=JSON.stringify(data);
                	} 
                	_obj.cookie.setCookie(key,data,30*24*60*60);
                },getLocalStorageByKey:function(key){
                	return _obj.cookie.getCookie(key);
                },trimObjectValue:function(data){
                	if(_.isObject(data)){
                		$.each(data,function(index,item){
                			data[index]=$.trim(item);
                		});
                		return data;
                	}
                },getPreDay:function(){//获取预售期
					var preDay=0;//预售期
			    		try{
			    			var startCityPreDate=a.getLocalStorageByKey("STARTCITY_PREDATE");
			    			if(!_.isNull(startCityPreDate)){
			    				preDay=parseInt(JSON.parse(startCityPreDate).preDate);
			    			}
			    		}catch(err){
			    			console.log(err.name+"---"+err.message);
			    		}
			    	return preDay;
                }
    };
    return a;
}
);
