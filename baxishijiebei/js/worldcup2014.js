"use strict";!function(e){window.W={};function t(e){var t=navigator.userAgent.toLowerCase();var r=t.indexOf("opera")!=-1;var n=t.indexOf("msie")!=-1&&!r;if(e.parentNode===null||e.style.display=="none"){return false}var a=null;var i=[];var s;if(e.getBoundingClientRect){s=e.getBoundingClientRect();var l=Math.max(document.documentElement.scrollTop,document.body.scrollTop);var o=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);return{x:s.left+o,y:s.top+l}}else if(document.getBoxObjectFor){s=document.getBoxObjectFor(e);var c=e.style.borderLeftWidth?parseInt(e.style.borderLeftWidth):0;var d=e.style.borderTopWidth?parseInt(e.style.borderTopWidth):0;i=[s.x-c,s.y-d]}else{i=[e.offsetLeft,e.offsetTop];a=e.offsetParent;if(a!=e){while(a){i[0]+=a.offsetLeft;i[1]+=a.offsetTop;a=a.offsetParent}}if(t.indexOf("opera")!=-1||t.indexOf("safari")!=-1&&e.style.position=="absolute"){i[0]-=document.body.offsetLeft;i[1]-=document.body.offsetTop}}if(e.parentNode){a=e.parentNode}else{a=null}while(a&&a.tagName!="BODY"&&a.tagName!="HTML"){i[0]-=a.scrollLeft;i[1]-=a.scrollTop;if(a.parentNode){a=a.parentNode}else{a=null}}return{x:i[0],y:i[1]}}function r(e,t){if(NTES.browser.msie){r=function(e,t){NTES(e).addEvent("mouseenter",function(e){var r=this;t(e,r)})}}else{r=function(e,t){NTES(e).addEvent("mouseover",function(e){var r=this;var n=e.currentTarget,i=e.relatedTarget||e.formElement;if(!a(n,i)&&n!==i){t(e,r)}})}}r(e,t)}function n(e,t){if(NTES.browser.msie){n=function(e,t){NTES(e).addEvent("mouseleave",function(e){var r=this;t(e,r)})}}else{n=function(e,t){NTES(e).addEvent("mouseout",function(e){var r=this;var n=e.currentTarget,i=e.relatedTarget||e.formElement;if(!a(n,i)&&n!==i){t(e,r)}})}}n(e,t)}function a(e,t){try{return e.contains?e!=t&&e.contains(t):!!(e.compareDocumentPosition(t)&16)}catch(r){}}function i(e,t,r){var n={};var a=T.param(n,e);var i={curClass:"current",triggerEvent:"mouseover",scrollUnit:a.scrollBody[0].offsetWidth,direc:"x",interval:0,delay:600};var s=T.param(i,t);var l=null;var o=a.contents.length;var c=0;var d=a.ctrls?a.ctrls:"";var e={ctrls:d,contents:a.contents},f={css:s.curClass,eventName:s.triggerEvent,delay:100,interval:s.interval,onHandle:function(e,t,n){if(s.scrollUnit!=a.scrollBody[0].offsetWidth){s.scrollUnit=a.scrollBody[0].offsetWidth}v(e,s.scrollUnit,a.scrollBody[0],s.delay);r&&r(e,t,n)}};var u=new switchable(e,f);function v(e,t,r,n){if(l!=null){clearInterval(l);l=null}var a=e*t,i=r.scrollLeft,s=0;var o=(new Date).getTime();var c=0;l=setInterval(function(){c=(new Date).getTime()-o;s=T.circ(c,i,a-i,n);if(c>n){r.scrollLeft=a;clearInterval(l);l=null;return}r.scrollLeft=s},13)}return u}function s(t){var r=e(t),n=e(".slider_prev",r),a=e(".slider_next",r);var i={scrollWrap:r,scrollBody:e(".slider_body",r),ctrls:e(".slider_ctrls a",r),contents:e(".slider_item",r)};var s={curClass:"in_current",triggerEvent:"mouseover",direc:"x",delay:500,scrollUnit:r[0].offsetWidth};var l=new W.focusScroll(i,s);l.trans(0);n.bind("click",function(e){e.preventDefault();l.prev()});a.bind("click",function(e){e.preventDefault();l.next()})}function l(e,t,r,n){var a=e;var i=t;i.bind("click",function(e){e.preventDefault();if(a.hasClass(r)){a.removeClass(r);i.html("<span><em>&lt;</em><em>&lt;</em></span>")}else{a.addClass(r);i.html("<span><em>&gt;</em><em>&gt;</em></span>")}n&&n()})}function o(){var t=e(".js_videos_toggle");var r=e(".ctrl_btn",t);l(t,r,"videos_center_show",function(){e(".js_data_toggle").removeClass("data_center_show")})}function c(){var t=e(".js_data_toggle");var r=e(".ctrl_btn",t);l(t,r,"data_center_show",function(){e(".js_videos_toggle").removeClass("videos_center_show")})}function d(){var t=e(".js_matchbar");var r=e(".matchbar_con",t);var n=e(".match_slider .js_panels");template.helper("$getDay",function(e){var t=new Date(e.replace(/-/gi,"/"));var r=t.Format("d");return r});template.helper("$getTime",function(e){var t=new Date(e.replace(/-/gi,"/"));var r=t.Format("hh:mm");return r});function a(t){var r=e(".js_panel",n);var a=0;for(var i=0,s=r.length;i<s;i++){var l=e("dl",r[i]);for(var o=0,c=l.length;o<c;o++){if((o+1)%2==1){e(l[o]).addClass("odd")}if(l[o].getAttribute("_day")==t){e(l[o]).addClass("match_selected");a=i}}}return a}function i(e){var t=[];var r={currentdate:new Date(e[0].currentdate.replace(/-/gi,"/")).Format("yyyy-MM-dd"),list:{}};var n=e[0].scheduleList;var a=n.length;var i=0;var s=0;var l=0;for(var o=0;o<a;o++){var i=new Date(n[o].date.replace(/-/gi,"/")).Format("yyyy-MM-dd");if(!t.contains(i)){t.push(i);r.list[i]={};r.list[i].list=[];l++}}for(var c=0;c<a;c++){for(var d=0,f=t.length;d<f;d++){s=new Date(n[c].date.replace(/-/gi,"/")).Format("yyyy-MM-dd");if(s==t[d]&&r.list[t[d]]){r.list[t[d]].list.push(n[c])}}}r.len=t.length;return r}function s(){e.load.jsonp({url:"http://worldcup.2014.163.com/api/index/current_databox.json",charset:"utf-8",key:"jsoncallback",value:"matchSingleData"},function(t){if(t.length==0||e.json.stringfy(s.oriData)==e.json.stringfy(t))return;var n={list:[]};n.list=t;var a=template.render("matchbar_tpl",n);r.html(a);s.status=t[0].status;s.oriData=t})}function l(t){e.load.jsonp({url:"http://worldcup.2014.163.com/api/index/databox.json",charset:"utf-8",key:"jsoncallback",value:"matchDatas"},function(r){if(r[0].len==0||e.json.stringfy(l.oriData)==e.json.stringfy(r))return;var i={currentdate:r[0].currentdate,len:r[0].len,list:r[0].scheduleDayMap};var s={list:[]};var o="";o+='<div class="js_panel">';var c=0,d=i.len;for(var f in i.list){s.list=i.list[f];s.day=f;if(c==d){o+='</div><div class="js_panel">';o+=template.render("matchbar_finals_tpl",s)}else if(c==18&&s.list[0].roundNumber==8){o+=template.render("matchbar_tpl",s);o+='</div><div class="js_panel">';c++}else if((c+1)%5==1&&c!=0&&c!=20){o+='</div><div class="js_panel">';o+=template.render("matchbar_tpl",s)}else{o+=template.render("matchbar_tpl",s)}c++}o+="</div>";n.html(o);var u=a(i.currentdate);l.oriData=r;t&&t(u)})}s();if(s.status!=2){s.interval=setInterval(function(){s();if(s.status==2){clearInterval(s.interval)}},3e4)}l(function(e){if(NTES("#match_slider")){var t=scroll_switch(NTES("#match_slider"));t.trans(e)}});setInterval(l,3e4)}function f(){var t=e("#match_unfold"),r=e("#match_fold"),a=e("#matchbar_unfold");t.bind("click",function(e){e.preventDefault();a.addClass("matchbar_unfold_selected")});r.bind("click",function(e){e.preventDefault();a.removeClass("matchbar_unfold_selected")});n(a[0],function(){a.removeClass("matchbar_unfold_selected")})}function u(){var e=document.documentElement.clientWidth||document.body.clientWidth;if(u.winWidth!=e&&NE("#pwrap")[0]){NE("#pwrap").removeClass("pwrap_1200");e>=1220&&NE("#pwrap").addClass("pwrap_1200");u.winWidth=e}}function v(){var a=e.$(".host_map li");var i=null;r(a,function(r,n){var s=n;var l=t(s);if(i!=null){clearTimeout(i)}e(a).removeClass("current");e(s).addClass("current");if(!e(s).hasClass("grid_a")){var o=e(".stadiuminfo",s);o[0].style.left=-o[0].offsetWidth/2+s.offsetWidth/2+"px"}});n(a,function(t,r){var n=r;i=setTimeout(function(){e(a).removeClass("current")},200)})}function m(){var t=function(e){return e<10?"0"+e:e};var r=new Date(2014,5,13,2);var n=e("#wctimer_bd em");if(new Date<r){var a=function(){var i=new Date;var s=e.date.diff(i,r);n[0].innerHTML=t(s.day);n[1].innerHTML=t(s.hours);n[2].innerHTML=t(s.minutes);n[3].innerHTML=t(s.seconds);setTimeout(a,1e3)};a()}else{n[0].innerHTML=t(0);n[1].innerHTML=t(0);n[2].innerHTML=t(0);n[3].innerHTML=t(0)}}function p(){var t=e(".js_switchskin");var a=e("#pwrap");var i=e(".wc_banner_brazil");var s=e("li",t);var l=e(".skins_more");var o=null;var c="";if(e.cookie.get("_userSkin")){a.removeClass(a.attr("_skin"));c=e.cookie.get("_userSkin");a.addClass(c);a.attr("_skin",c);if(c=="pwrap_brazil"){i.css({visibility:"visible"})}else{i.css({visibility:"hidden"})}}s.bind("click",function(t){t.preventDefault();c="pwrap_"+this.className.split("_")[1];a.removeClass(a.attr("_skin"));a.addClass(c);a.attr("_skin",c);if(c=="pwrap_brazil"){i.css({visibility:"visible"})}else{i.css({visibility:"hidden"})}e.cookie.set("_userSkin",c,365)});l.bind("click",function(e){e.preventDefault();t.addClass("wc_skins_more")});r(t[0],function(e){clearTimeout(o)});n(t[0],function(e){o=setTimeout(function(){t.removeClass("wc_skins_more")},200)})}function h(){if(e.browser.msie&&e.browser.version<=9)return this;if(document.ontouchstart!==undefined)return this;var r=e(".js_shaking"),n=e(".wc_banner_brazil",r),a=e(".wc_banner_in",r),i=e(".wc_man",r),s=e(".wc_ball",r),l=null,o=0,c=0;setTimeout(function(){var r=t(n[0]);r.h=n[0].offsetHeight;r.w=n[0].offsetWidth;var d=t(a[0]);var f=t(i[0]);var u=t(s[0]);var v=r.w/2+r.x;e(document.body).bind("mousemove",function(e){c=e.pageX});if(l)clearInterval(l);l=setInterval(function(){if(o==c)return;o+=(c-o)*.15;a.css3({x:(v-o)*.03});i.css3({x:(v-o)*.02});s.css3({x:(v-o)*.01})},30)},2050)}e.extend(W,{focusScroll:i,sliderCall:s,videoToggle:o,dataToggle:c,matchBar:d,wResize:u,mapPop:v,countDown:m,matchBarToggle:f,switchSkin:p,shaking:h})}(NE);