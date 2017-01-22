//日期处理模块 日期存储格式：2015-08-05 getDate返回时间对象 , getWeek 返回格式 星期返回 今天，明天 星期一，星期二...星期天
"use strict";
define("dateHandler",[],function(){
	return{
		getDate:function(dateTime){//返回时间对象
			var time;
			if(typeof(dateTime)==="string"){
				time=new Date(dateTime.replace(/-/g,"/"));
			}else{
				time=new Date(dateTime);
			}
			return time;
		},
		getWeek:function(paramTime){//传入从服务器写到本地的时间，id=InputDate
			var time_today=new Date(),
			time_other=this.getDate(paramTime),
			today_date=0,
			other_date=0,
			week="";
			today_date=time_today.getDate();
			other_date=time_other.getDate();
			
			if(today_date==other_date){
				week="今天";
			}else {
				switch(time_other.getDay()){
				 case 0:
					 week = "周日";
                     break;
                 case 1:
                	 week = "周一";
                     break;
                 case 2:
                	 week = "周二";
                     break;
                 case 3:
                	 week = "周三";
                     break;
                 case 4:
                	 week = "周四";
                     break;
                 case 5:
                	 week = "周五";
                     break;
                 case 6:
                	 week = "周六";
                     break
				}
			}
			return week;
		}, addDate: function(dateTime, day) {
            var time = this.getDate(dateTime);
            return this.getDate(time.setDate(time.getDate() + day))
        }
		
	}
})