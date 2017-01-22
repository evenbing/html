var _baidu_map = {};
define(['zepto','common'],function($,_obj){
	_baidu_map = {
		locationCookieName:"locationDetail",
		receiveDetail:function(rollFunc){
			var locationDetail = _obj.cookie.getCookie(_baidu_map.locationCookieName);
			if(locationDetail==null||$.trim(locationDetail)==""||typeof(locationDetail)=="undefined"){
				_baidu_map.autoPosition(rollFunc);
			}else{
				locationDetail = decodeURIComponent(locationDetail);
				rollFunc(JSON.parse(locationDetail));
			}
		},
		receiveCity:function(data){
			var stCity = "";
			try{
				stCity = data.addressComponents.city;
			}catch(e){
				return stCity;
			}
			if((stCity.lastIndexOf("市")+1)==stCity.length){
        		stCity = stCity.substring(0,stCity.length-1);
        	}
        	if((stCity.lastIndexOf("县")+1)==stCity.length){
        		stCity = stCity.substring(0,stCity.length-1);
        	}
        	return stCity;
		},
		autoPosition:function(rollFunc){
			// 百度地图API功能
			var map = new BMap.Map("baiduMap");
			var point = new BMap.Point(116.331398,39.897445);
			map.centerAndZoom(point,15);
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					_baidu_map.getDetailAddr(r.latitude,r.longitude,rollFunc,1);
				}
				else {
					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true});
		},
		getDetailAddr:function(lat,lng,rollFunc,isCookie,param){
			var point = new BMap.Point(lng,lat);
			var geoc = new BMap.Geocoder();  
			geoc.getLocation(point, function(rs){
				var addComp = rs.addressComponents;
				var data = {
					point:{
						lng:rs.point.lng,
						lat:rs.point.lat
					},
					addressComponents:{
						province: addComp.province,
						city: addComp.city,
						district: addComp.district,
						street: addComp.street,
						streetNumber: addComp.streetNumber
					}
				};
				rollFunc(data,param);
				if(isCookie==1){
					//记录cookie
		        	_obj.cookie.setCookie(_baidu_map.locationCookieName,encodeURIComponent(JSON.stringify(data)),60*60);
				}
			});   
		},
		showMap:function(lng,lat){
			// 百度地图API功能
			var map = new BMap.Map("baiduMap");
			if(lat==null){
				lat = 116.331398;
			}
			if(lng==null){
				lng = 39.897445;
			}
			var point = new BMap.Point(lng,lat);
			var mk = new BMap.Marker(point);
			map.addOverlay(mk)
			map.panTo(point);
			map.centerAndZoom(point,15);
		},
		seoPosition:function(cityName,obj){
			// 百度地图API功能
			var map = new BMap.Map("baiduMap");
			var point = new BMap.Point(116.331398,39.897445);
			map.centerAndZoom(point,12);
			// 创建地址解析器实例
			var myGeo = new BMap.Geocoder();
			// 将地址解析结果显示在地图上,并调整地图视野
			myGeo.getPoint(cityName, function(point){
				if (point) {
					_baidu_map.showPosition(point.lng,point.lat,obj);
				}else{
					alert("您选择地址没有解析到结果!");
				}
			}, cityName);
		},
		searchLocation:function(searchStr,cityName,rollFunc){
		    var param = "";
		    if (cityName!= "") {
		        param= cityName + encodeURIComponent(searchStr)+"&region="+cityName;
		    } else {
		        param = searchStr;
		    }
			$.ajax({
	            url: 'http://api.map.baidu.com/place/v2/suggestion?output=json&ak=DA48111bbbf2fb5d0d9bced68d19ad07&query='+param,
	            type: 'GET',
	            dataType: 'jsonp',
	            success:function(data){
	                var tempStr = "";
	                if(data.status==0){
	                    var array = data.result;
		                var headTag = '<dl>';
		                for (var i = 0; i < array.length; i++) {
		                    if(array[i].city=="" || array[i].name==""){
		                        continue;
		                    }
		                    tempStr += "<dd latlng='"+array[i].location.lat+ ","+array[i].location.lng+"'><p>" + array[i].name + "</p><span>" + array[i].district + "</span></dd>";
		                };
		                if(array.length==0){
		                    tempStr="未找到【"+searchStr+"】相关数据";
		                }
		                var endTag = '</dl>';
		                tempStr = headTag + tempStr + endTag;
	                }else{
	                	tempStr="<dl>未找到【"+searchStr+"】相关数据</dl>";
	                }
	                rollFunc(tempStr);
	            }
	        });
		},
		showPosition:function(lng,lat,obj) {
		    var location= lat + "," + lng;
		    $.ajax({
		        url: 'http://api.map.baidu.com/geocoder/v2/?ak=DA48111bbbf2fb5d0d9bced68d19ad07&output=json&pois=1&location=' + location,
		        type: 'GET',
		        dataType: 'jsonp',
		        success: function(data) {
		            if (data.status == 0) {
		            	_baidu_map.rendData(data,obj);
		            }
		        }
		    });
		},
		rendData:function(data,className){
	        var array = data.result.pois; //可以将信息缓存 终点也需要用到
	        var cityListc = $(obj);
	        var headTag = '<dl>';
	        var tempStr = "";
	        for (var i = 0; i < array.length; i++) {
	            if(array[i].name=="" || array[i].addr==""){
	                continue;
	            }
	            tempStr += "<dd latlng='"+array[i].point.y+ ","+array[i].point.x+"'><p>" + array[i].name + "</p><span>" + array[i].addr + "</span></dd>";
	        };
	        var endTag = '</dl>';
	        var rendHtml = headTag + tempStr + endTag;
	        cityListc.empty().append(rendHtml);
		}
	}
	return _baidu_map;
});