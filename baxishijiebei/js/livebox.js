!function(t){"use strict";var a={};var e='<div class="slider_item">'+'	<div class="match_info1">'+"		<p>\u7b2c<%=orderId%>\u573a <%=groupName%>\u7ec4</p>"+'		<p><span class="dt">\u7403\u573a\uff1a</span><span class="dd"><%=venue%></span></p>'+'		<p><span class="dt">\u76f4\u64ad\uff1a</span><span class="dd"><%=tv%></span></p>'+"	</div>"+'	<div class="match_teams">'+'		<table class="match_teams_tb">'+'			<col class="tb_col1">'+'			<col class="tb_col2">'+'			<col class="tb_col3">'+'			<col class="tb_col4">'+'			<col class="tb_col5">'+"			<tr>"+'				<td class="tb_col1"><h3 class="match_team"><a href="http://worldcup.2014.163.com/team/<%=homeId%>/"><%=home%></a></h3></td>'+'				<td class="tb_col2"><span class="match_flag"><a href="http://worldcup.2014.163.com/team/<%=homeId%>/"><img src="http://img1.cache.netease.com/sports/wc2014/flag_114x64/<%=homeId%>.png" width="114" height="64" ></a></span></td>'+'				<td class="tb_col3">'+"					<%if(status == 0 || status == 3){%>"+'					<p class="match_date"><%=$getDate(date)%></p>'+'					<p class="match_time"><%=$getTime(date)%></p>'+"					<%}else{%>"+'					<p class="match_score"><em><%=homeScore%></em> <i>-</i> <em><%=awayScore%></em></p>'+"					<%}%>"+"				</td>"+'				<td class="tb_col4"><span class="match_flag"><a href="http://worldcup.2014.163.com/team/<%=awayId%>/"><img src="http://img1.cache.netease.com/sports/wc2014/flag_114x64/<%=awayId%>.png" width="114" height="64" ></a></span></td>'+'				<td class="tb_col5"><h3 class="match_team"><a href="http://worldcup.2014.163.com/team/<%=awayId%>/"><%=away%></a></h3></td>'+"			</tr>"+"		</table>"+"	</div>"+'	<div class="match_info2">'+'		<%if(linkReport !="" || linkPreview != "" || (video != "" && status != 0 && status != 3 && status != 2)){%>'+"		<p>"+'			<%if(video != "" && status != 0 && status != 3 && status != 2){%>'+'			<a class="live_link" href="<%=video%>">\u6b63\u76f4\u64ad</a>'+'			<%}else if(linkReport !=""){%>'+'			<a href="<%=linkReport%>">\u6218\u62a5</a>'+'			<%}else if(linkPreview !=""){%>'+'			<a href="<%=linkPreview%>">\u524d\u77bb</a>'+"			<%}%>"+"		</p>"+"		<%}%>"+'		<%if(linkPhoto !=""){%>'+'		<p><a href="<%=linkPhoto%>">\u56fe\u96c6</a></p>'+"		<%}%>"+'		<%if(vdemand !="" || bet != ""){%>'+"		<p>"+'			<%if(vdemand != ""){%>'+'			<a href="<%=vdemand%>">\u89c6\u9891</a>'+"			<%}%>"+'			<%if(bet != ""){%>'+'		 	<a href="<%=bet%>">\u6295\u6ce8</a>'+"			<%}%>"+"		</p>"+"		<%}%>"+"	</div>"+"</div>";template.helper("$getDate",function(t){var a=new Date(t.replace(/-/gi,"/"));var e=a.Format("MM-dd");return e});template.helper("$getTime",function(t){var a=new Date(t.replace(/-/gi,"/"));var e=a.Format("hh:mm");return e});function s(a,e){t.load.jsonp({url:"http://worldcup.2014.163.com/api/match/data/"+e+".json",charset:"utf-8",dataType:"json",key:"jsoncallback",value:"matchBarData_"+e},function(t){c(t,a)})}function c(s,c){var i=c;var r=t(".slideritems_lst",i);if(s.length==0||t.json.stringfy(a[s[0].mid].oriData)==t.json.stringfy(s))return;var n=template.compile(e);var o=n(s[0]);r.html(o);a[s[0].mid].oriData=s;a[s[0].mid].status=s[0].status;if(i.hasClass("js_matchbar_slider")){l(i)}}function l(a){var e=a,s=t(".slider_prev",e),c=t(".slider_next",e);var l={scrollWrap:e,scrollBody:t(".slider_body",e),contents:t.$(".slider_item",e),ctrls:t.$(".slider_ctrl span",e)};var i={scrollUnit:l.contents[0].offsetWidth};var r=W.focusScroll(l,i);if(l.contents.length<=1){s.hide();c.hide()}else{s.show();c.show()}c.bind("click",function(t){t.preventDefault();r.next()});s.bind("click",function(t){t.preventDefault();r.prev()})}function i(t){var e=t;if(!e.attr("_matchid")||e.attr("_matchid")=="")return;var c=e.attr("_matchid");a[c]={};s(e,c);if(a[c].status!=2){a[c].interval=setInterval(function(){s(e,c);if(a[c].status==2){clearInterval(a[c].interval)}},1e4)}}t(".js_matchbar_data").each(function(){var a=t(this);i(a)})}(NE);