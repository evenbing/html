$(function () {
	'use strict'

	var $document = $(document)
	var $body = $(document.body)
	if (!$body.hasClass('home-page')) {
		return
	}

	var pathname2 = window.location.pathname;
	if (pathname2.indexOf('/category/team') >= 0) {
			$('.filter-cate > li:nth-child(2)').addClass('filter-notallowed');
		}

	$(document).on('click', '.filter-cate > li', function (e) {

		var pathname = window.location.pathname
		var index = $('.filter-cate > li').index($(this))

		if (pathname.indexOf('/category/team') >= 0 && index === 1) {
			return
		}

    	e.stopPropagation()

		var $this = $(this)
		var $thisSubList = $this.find('ul')
		$this.siblings('li').removeClass('active')
		$this.hasClass('active') ? $this.removeClass('active') : $this.addClass('active')

		// 点击任何区域下拉菜单消失
		$(document).on('click', function(){
	        $('.filter-cate > li').removeClass('active')
	    })

	})

	$('.filter-sublist').on('click', function (e){
	    e.stopPropagation()
	})

})

// 头部向下滚隐藏
$(function(){
	var scrollValue = $(window).scrollTop(),
		outerHeight = $(".g-header").outerHeight();
	window.onscroll = function(){
		
		var scrollTop = $(window).scrollTop();
		if(scrollTop>outerHeight && scrollTop>scrollValue){
			$(".g-header").removeClass("header-show").addClass("header-hide")
		} else{
			scrollTop+$(window).height()<$(document).height()&&$(".g-header").removeClass("header-hide").addClass("header-show");
		}
		scrollValue = scrollTop;
	}
});

$(function () {

	'use strict'

	// 判断是否已经点赞
	$(".btn-like").each(function(){
		var $this = $(this);
		var postID = $this.data("post-id");
		if(!postID){
			return;
		}
		var supportLS = window.localStorage !== undefined;
		var key = "cdc_likes";
		var ids;
		if(supportLS){
			var idsStr = window.localStorage.getItem(key);
		}else{
			var idsStr = getCookies(key);
		}
		if(idsStr){
			ids = idsStr.split(",");
			if(ids.indexOf(postID.toString()) !== -1){
				$this.addClass("liked");
				return;
			}
		}
	});
	
	// 点赞
	$(".btn-like").on("click", function(){
		var $this = $(this);
		var action = $this.data("action");
		var postID = $this.data("post-id");
		var supportLS = window.localStorage !== undefined;
		var key = "cdc_likes";
		var ids;
		if(!postID || !action){
			return;
		}
		// 判断有没重复点赞
		if(supportLS){
			var idsStr = window.localStorage.getItem(key);
			if(idsStr){
				ids = idsStr.split(",");
				if(ids.indexOf(postID.toString()) !== -1){
					alert("不能重复点赞");
					return false;
				}
				if(ids.length > 500){
					ids.setItem(key, "");
				}
			}
		}
		$.post(action, {support_ls: supportLS ? 1 : 0, post_id: postID}, function(data){
			if(data.status < 0){
				alert(data.message);
				return false;
			}
			$this.addClass("liked");
			if(supportLS){
				idsStr = window.localStorage.getItem(key);
				if(!idsStr){
					ids = [];
				}else{
					ids = idsStr.split(",");
				}
				ids.push(postID);
				window.localStorage.setItem(key, ids.join(","));
			}
		}, "json");
		return false;
	});


	// 绑定搜索框事件

	$(".search-input").on("keypress", function(e){
		if(e.which != 13 || $(this).val() == ''){
			return;
		}
		window.location.href = "http://cdc.tencent.com/?s=" +  encodeURIComponent($(this).val()) + '#search-result';
	});

	$('.search-submit').on('click' , function(){
		if($(".search-input").val() == ''){
			return;
		}
		window.location.href = "http://cdc.tencent.com/?s=" +  encodeURIComponent($(".search-input").val()) + '#search-result';
	})


	// 搜索
	$('.search-trigger').on('click', function (e) {
		$(document.body).find('.g-search').addClass('search-open')
		// show backdrop
		$(document.body).addClass('has-backdrop')
		$(document.body).find('.mask-backdrop').remove()
		$(document.body).append('<div class="mask-backdrop"></div>')
		var $backdrop = $(document.body).find('.mask-backdrop')

		var isScroll = $(document.body).hasClass('page-scroll')
		if (isScroll) {
			$backdrop.css({
				top: 74
			})
		} else {
			$backdrop.css({
				top: 74
			})
		}
		$(document.body).find('.search-input').focus();

			// 点击任何区域关闭搜索
			$(document).on('click', function(){
					$(document.body).find('.g-search').removeClass('search-open')
					$(document.body).removeClass('has-backdrop')
					$(document.body).find('.mask-backdrop').remove()
					$(document.body).find('.search-input').val('');
				})
			e.stopPropagation();

	});
	$('.search-box').on('click', function(e){
		e.stopPropagation();
	})
	$('.g-nav').on('click', function(e){
		e.stopPropagation();
	})
	
	// 关闭
	$('.search-close').on('click', function () {
		$(document.body).find('.g-search').removeClass('search-open')
		$(document.body).removeClass('has-backdrop')
		$(document.body).find('.mask-backdrop').remove()
		$(document.body).find('.search-input').val('');
	})
	


	// 判断管理条是否存在 如果存在的话则 调整下头部工具栏的位置
	if($("#wpadminbar").length > 0){
		$(".home-page.page-scroll>.g-header, .have_search>.g-header").css({"top": "32px"});
	}

	function getCookies(key){
		var part = document.cookie.split(";");
		var kv = {};
		for(var i = 0, l = part.length; i < l; i++){
			var p = part[i];
			$_kv = p.split("=");
			var k = $.trim($_kv[0]);
			kv[k] = decodeURIComponent($_kv[1]);
		}
		return kv[key];
	}

});



///  首页的
$(function () {

	'use strict'
	// 首页滚动
	if (!$(document.body).hasClass('home-page')) {
		return
	}

	// 第一页为空就直接隐藏翻页按钮
	if($(".article-list>.article-item").length <= 0){
		$(".load-more").hide();
	}

	// 翻页
	$(".load-more").on("click", function(){
		var $this = $(this);
		var maxPage = parseInt($this.data("max-page-num"), 10);
		// 当前页码
		window.currPage = window.currPage == undefined ? parseInt($this.data("curr-page-num"), 10) : window.currPage;
		// 判断下一页是不是最后一页
		if(window.currPage + 1 > maxPage){
			// 如果是最后一页的话则隐藏
			$this.hide();
			return;
		}
		var nextPageUrl = window.location.href;
		nextPageUrl = nextPageUrl.replace('#search-result','');
		if(nextPageUrl.indexOf("paged=") !== -1){
			nextPageUrl = nextPageUrl.replace(/paged=\d+/i, "paged=" + (window.currPage + 1));
		}else if(nextPageUrl.indexOf("?") !== -1){
			nextPageUrl += "&paged=" + (window.currPage + 1);
		}else{
			nextPageUrl += "?paged=" + (window.currPage + 1);
		}

		// 补上ajax 
		if(nextPageUrl.indexOf("ajax=1") == -1){
			nextPageUrl += "&ajax=1";
		}

		// 请求下一页
		$.get(nextPageUrl)
			.success(function(data){
				window.currPage++;
				$(".article-list").append(data);
				if(window.currPage + 1 > maxPage){
					// 如果是最后一页的话则隐藏
					$this.hide();
					return;
				}
			})
			.error(function(){
				var $a = $this.find("a:eq(0)");
				var srcText = $a.text();
				$a.text("翻页错误，请稍后再试");
				setTimeout(function(){
					$a.text(srcText);
				}, 3000);
			});
	});



	
	// 首页滚动

	var html = document.getElementsByTagName('html')[0];
	var screenWidth = html.getBoundingClientRect().width;

	if (screenWidth <= 640 ) {
		$(document.body).addClass('page-scroll');
		return
	}

	if (!$(document.body).hasClass('home-page')) {
		return
	}

	function pageScroll(){
		var top = $(window).scrollTop()
		if (top > 1) {
			// 判断管理条是否存在 如果存在的话则 调整下头部工具栏的位置
			if($("#wpadminbar").length > 0){
				$(".home-page.page-scroll>.g-header, .have_search>.g-header").css({"top": "32px"});
			}
			$(document.body).addClass('page-scroll')
		} else {
			$(document.body).removeClass('page-scroll')
			// 判断管理条是否存在 如果存在的话则 调整下头部工具栏的位置
			if($("#wpadminbar").length > 0){
				$(".g-header").css({"top": "0"});
			}
		}
	}
	pageScroll();
	$(window).on('scroll',function(){
		pageScroll();
	})


	// 轮播(轮播图数量为1时，停用轮播插件)
	var bnamount = $('.g-banner').find('img').length;
		if (bnamount > 1) {
			var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        autoplay: 3500,
		        speed: 1000,
		        effect: 'fade',
		        fade: true
		    })
		} else{
			$('.g-banner').find('.swiper-button-next').hide();
			$('.g-banner').find('.swiper-button-prev').hide();
		}

})



// 返回顶部

goTopEx();
function goTopEx() { 
	var obj = document.getElementById("roll-backtop"); 
		function getScrollTop() { 
			return document.documentElement.scrollTop + document.body.scrollTop; 
		} 
		function setScrollTop(value) { 
			if (document.documentElement.scrollTop) { 
			document.documentElement.scrollTop = value; 
			}
			else { 
			document.body.scrollTop = value; 
			} 
		} 
		window.onscroll = function() { 
			getScrollTop() > 500 ? obj.style.display = "block": obj.style.display = "none";
			} 
		obj.onclick = function() { 
			var goTop = setInterval(scrollMove, 10); 
			function scrollMove() { 
			setScrollTop(getScrollTop() / 1.1); 
			if (getScrollTop() < 1) clearInterval(goTop); 
		} 
	} 
}

// about页面去掉返回顶部
$(function () {
	var isArticlePage = $(document).find('.article-page').length > 0
	if (isArticlePage) {
		var $backtop = $(document).find('#roll-backtop')
		$backtop.css({
			'margin-right': -288
		})
	}

	var isAboutPage = $(document).find('.about-content').length > 0
	if (isAboutPage) {
		$(document).find('#roll-backtop').remove()
	}

}) 


$(function(){

	// 分享交互
	$('.btn-share').on('click',function (e) {
		var $that = $(this).next('.share-list');
		$that.hasClass('show_pop') ? $that.removeClass('show_pop') : $that.addClass('show_pop');

		$(document).on("click", function(){
	        $(".share-list").removeClass('show_pop');
	    });

    	e.stopPropagation();
	})

	$(".share-list").on("click", function(e){
		    e.stopPropagation();
	})

	$('.share-list > .close').on('click', function () {
		$('.share-list').removeClass('show_pop');
	})

	$('.weixin-qrcode').on('mouseover',function () {
		$('#qrcode').show();
	})
	$('.weixin-qrcode').on('mouseout',function () {
		$('#qrcode').hide();
	})

	// 手机端导航
	$('.menu-item-has-children').on('touchstart',function(e){
		var $this = $(this);
		if( $this.hasClass('show-child') ){
			$this.removeClass('show-child');
			$this.find('.sub-menu').hide();
			

		} else{
			$this.addClass('show-child');
			$this.find('.sub-menu').show();
		}
		// 点击任何区域下拉菜单消失
			$(document).on("touchstart", function(){
		        $this.removeClass('show-child');
		        $this.find('.sub-menu').hide();
		    });
	    	e.stopPropagation();
	})

	$('.menu-item-has-children').on("touchstart", function(e){
	    e.stopPropagation();
	});

	$('.sub-menu').on("touchstart", function(e){
	    e.stopPropagation();
	});
})

// banner视频
function playQQVideo(videoId){
	$(document.body).find('.video-area').html('<div class="video-frame"><iframe src="http://v.qq.com/iframe/player.html?vid='+ videoId +'&amp;tiny=0" width="1200" height="740" frameborder="0" allowfullscreen></iframe><a href="javascript:;" class="video-close"></a></div>');
	$(document.body).find('.banner-video').show();

	$('.video-close').on('click', function(){
		$(document.body).find('.video-frame').remove();
		$(document.body).find('.banner-video').hide();
	})
}