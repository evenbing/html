//定义组装模板模块
define(
		"template",
		[ 'zepto' ,'api','underscore'],
		function($,api,_) {
			var basePath = $("#basePath").val();
			function templateInstall(templateID,data){//定义组装模板函数 参数：模板，数据{data:XXX}，需要附加到的元素ID
//				var tpl=$("#"+templateID).html();
				var template = _.template(templateID);// 装载模板
				return	template(data);// 返回组装好的Html
			}
			//推荐线路模板 (按照筛选条件 页内查询无数据)
			var recommendedTpl="";
	
	    	var busScheduleTpl = "<%if(data.length>0){_.each(data,function(item,index){%>" +
	    			"<a href=\"Javascript:void(0);\" data-from=\"<%=item.startStationName%>\" data-startTime=\"<%=item.startTime%>\" data-price=\"<%=item.fullPrice%>\" data-sort=\"<%=index%>\" data-id=<%=item.scheduleId%> >" +
	    			"<ul class=\"kb_list_tab <%if(item.leaveSeats==0){ %> graybg <%}%> \"  ><li class=\"kb_trip\" ><p class=\"time\"><%=item.startTime%></p>" +
	    			"<p class=\"stroke\">行程：<%=(item.distance>=1)?parseInt(item.distance):'--'%>KM</p></li>" +
	    			"<li class= \"kb_chezhan \"><p><span class= \"traicon begin \"></span><%=item.startCityName%>-<%=item.startStationName%></p><p>" +
	    			"<span class= \"traicon end \"></span><%=item.endCityName%>-<%=item.endStationName%></p></li>" +
	    			"<li class= \"kb_price \"><strong><dfn>¥</dfn><b><%=item.fullPrice%></b></strong><p><span class= \"<%if(item.leaveSeats>0){ %>btn_b <%}else{%>btn_g <%}%> \">" +
	    			"<%if(item.leaveSeats>0){ %>有票 <%}else{%>无票 <%}%></span></p></li></ul></a><%})}else {%>" +
	    			"<div id=\"nodata\" class=\"nodata\"><div class=\"nd_img\"></div><p class=\"nd_txt\">Uh oh，抱歉没有找到您要的数据!</p></div></div><%} %>";
			
			var busScheduleStationTpl = "<li><input id=\"statusall\"  type=\"checkbox\" data-name=\"all\" <%if('all'===checkeStationName){print('checked=checked')} %>  >" +
					"<label for=\"statusall\" >全部车站</label></li><%_.each(data,function(ele,index){%>" +
					"<li ><input id=\"status<%=index%>\" data-name=\"<%=ele%>\" type=\"checkbox\"  <%if(ele===checkeStationName){print('checked=checked')} %>  />" +
					"<label for=\"status<%=index%>\"><%=ele%></label></li><%})%>";

			return {
				compiled_busSchedule : function(result,tmlOption) {// 编译时刻表模板 参数 json对象，模板操作(附加，或者插入)
					try {
						var tpl=	templateInstall(busScheduleTpl,{data:result.object});
						var element=$("#chipiao_list");					
						if(tmlOption===api.getAppendOption){
							element.append(tpl);
						}else if(tmlOption===api.getInsertOption){
							element.html(tpl);
							this.compiled_busScheduleStation(result);
						}
					}
					catch(e){
						
					}
			
				},compiled_busScheduleStation:function(result){//编译时刻表车站模板 参数json对象
					var stooges =result.object;
					var checkeStationName=  $("#staionList  input:checked").attr("data-name");
					if(_.isNull(checkeStationName) || _.isUndefined(checkeStationName)){
						checkeStationName="all";
					}
					var uniqueStationName=_.uniq(_.pluck(stooges,"startStationName"));
					var tpl=	templateInstall(busScheduleStationTpl,{data:uniqueStationName,checkeStationName:checkeStationName});
						$("#staionList").html(tpl);				  
				},
				compiled_busStation : function() {//编译车站模板
					
				},templateInstall:function(appendToElementId,data,templateId){//将模板生成并且追加到元素
					var template=_.template($("#"+templateId).html());
	  			  	$("#"+appendToElementId).html(template(data));
				}
				
			}
		})