define(function(require,a,t){var s=require("$"),n=require("_"),e=require("./CNCalendar"),o=require("./dialog"),i=require("./config");require("jquery/plugins/bootstrap-datepicker");var l={now:new Date,init:function(a,t){var s=this;s.nowYear=a,s.nowMonth=t,s.draw(a,t)},getDay:function(a,t,s){return new Date(a,t-1,s).getDay()},getLastDay:function(a,t){var s=new Date(a,t,0).getDate();return s},setEvent:function(){var a=this,t={isVacation:0,startTime:"",endTime:"",vacationInfo:"",setMan:window.g.name,setTime:a.now.getFullYear()+"-"+(a.now.getMonth()+1)+"-"+a.now.getDate()},e=n.template(s("#tmpl-dialog-set").html());s("body").on("click",".glyphicon-calendar",function(){s(this).siblings("input").trigger("focus")}),s(".j-setBtn").on("click",function(){var n=s(this).parent(".day-col");t.startTime=n.data("date"),t.endTime=n.data("date"),n.find(".show-vacation").size()?t.vacationInfo=n.find(".show-vacation").html():t.vacationInfo="",t.isVacation=parseInt(n.data("status"));new o.View({model:new o.Model({dialogId:"dialog-set",title:"节假日设置",content:e(t)}),saveCb:function(t){var n=s("#j-setStart"),e=s("#j-setEnd"),o=s("#j-setMark"),l=s('input[name="iswork"]:checked').val();if(new Date(n.val()).getTime()>new Date(e.val()).getTime())return void s(".j-tip").text("结束时间不应在开始时间之前！");if("2"===l&&""===s.trim(o.val()))return void s(".j-tip").text("请填写说明！");s(".j-tip").text("正在提交请求......");var r={startTime:n.val(),endTime:e.val(),status:l,remark:o.val()};s.post(i.urls.setVacation,r,function(n){n.ret?(t.modal("hide"),a.init(a.nowYear,a.nowMonth)):s(".j-tip").text(n.msg)})}});s("#j-setStart,#j-setEnd").datepicker({format:"yyyy-mm-dd",language:"zh-CN"})})},draw:function(a,t){function n(n){for(var e,i,v,D=0;u+m>D;D++)D%7==0&&(f+=0==D?"":"</div>",f+='<div class="date-row">'),D-m>=0?(e=D-m,i=9>e?"0"+(e+1):e+1,v=1===w[e].lunarDay?w[e].lunarMonthName+w[e].lunarDayName:w[e].lunarDayName,f+='<div data-status="'+n[D].status+'" data-date="'+a+"-"+(10>t?"0"+t:t)+"-"+i+'"',a===o.now.getFullYear()&&t===o.now.getMonth()+1&&e+1===o.now.getDate()?(f+='class="day-col today-col day-col-'+n[D].status+'">',f+='<span class="show-solar">'+(e+1)+'<span class="today-tip">(今日)</span></span> <span class = "show-lunar" >'+v+"</span>"):(f+='class="day-col day-col-'+n[D].status+'">',f+='<span class="show-solar">'+(e+1)+'</span> <span class = "show-lunar" >'+v+"</span>")):(e=p+D-m,i=9>e?"0"+(e+1):e+1,v=1===h[e].lunarDay?h[e].lunarMonthName+h[e].lunarDayName:h[e].lunarDayName,f+='<div data-status="'+n[D].status+'" data-date="'+d+"-"+(10>l?"0"+l:l)+"-"+i+'" class="day-col pre-day-col day-col-'+n[D].status+'">',f+='<span class="show-solar">'+(0>=t-1?12:t-1)+"月"+(e+1)+'日</span> <span class = "show-lunar" >'+v+"</span>"),2===n[D].status&&(f+='<div class="icon-vacation">休</div>'),null!=n[D].remark&&(f+='<p class="show-vacation" title="'+n[D].remark+'">'+n[D].remark+"</p>"),f+='<p class="set-tip j-setBtn">设置节假日</p></div >';if(0!=y)for(D=0;y>D;D++){v=1===g[D].lunarDay?g[D].lunarMonthName+g[D].lunarDayName:g[D].lunarDayName,i=9>D?"0"+(D+1):D+1;var j=n.length-y+D;f+='<div data-status="'+n[j].status+'"data-date="'+c+"-"+(10>r?"0"+r:r)+"-"+i+'" class="day-col pre-day-col day-col-"'+n[j].status+">",f+='<span class="show-solar ">'+(12>=t+1?t+1:1)+"月"+(D+1)+'日</span><span class = "show-lunar" >'+v+"</span>",2===n[j].status&&(f+='<div class="icon-vacation">休</div>'),null!=n[j].remark&&(f+='<p class="show-vacation" title="'+n[j].remark+'">'+n[j].remark+"</p>"),f+='<p class="set-tip j-setBtn">设置节假日</p></div>'}else f+="</div>";s(".j-dateBox").html(f),o.setEvent()}var o=this;t=parseInt(t),a=parseInt(a);var l=0>=t-1?12:t-1,r=12>=t+1?t+1:1,d=12===l?a-1:a,c=1===r?a+1:a,u=o.getLastDay(a,t),p=o.getLastDay(d,l),m=o.getDay(a,t,1),v=o.getDay(a,t,u),y=6-v,w=e.calendar(a,t).monthData,h=e.calendar(d,l).monthData,g=e.calendar(c,r).monthData,f="",D=10>p-m+1?"0"+(p-m+1):p-m+1,j=d+"-"+(10>l?"0"+l:l)+"-"+D,k=c+"-"+(10>r?"0"+r:r)+"-"+(10>y?"0"+y:y);s(".j-dateBox").html('<p class="load-tip">正在加载数据......</p>'),s.post(i.urls.qryVacation,{startTime:j,endTime:k},function(a){a.ret?n(a.list):i.notify("节假日信息加载失败！")})}};t.exports=l});