function showdiv(targetid,objN){
var target=document.getElementById(targetid);
var clicktext=document.getElementById(objN);
if(target.style.display=="block"){
	target.style.display="none";
	clicktext.innerText="打开菜单";
	document.getElementById("close").className='xgt pic-main mt';
	document.getElementById("aniu").className='off-aniu';
}else{
	target.style.display="block";
	clicktext.innerText='关闭菜单';
	document.getElementById("close").className='xgt pic-main';
	document.getElementById("aniu").className='on-aniu';
}};

//相关推荐滚动
$(document).ready(function(){

	$("#count1").dayuwscroll({
		parent_ele:'#wrapBox1',
		list_btn:'#tabT04',
		pre_btn:'#left1',
		next_btn:'#right1',
		path: 'left',
		auto:true,
		time:3000,
		num:5,
		gd_num:5,
		waite_time:1000
	});

});

(function($){
$.fn.dayuwscroll = function(param){
	var o = $.extend({
		parent_ele:'#t1',
		list_btn:'#tabT04',
		pre_btn:'#left',
		next_btn:'#right',
		path: 'left',
		auto:true,
		time:5000,
		num:1,
		gd_num:1,
		waite_time:1000
	},param);

	var target_ele = $(this).selector;
	var $left = $(o.pre_btn);
	var $right = $(o.next_btn);
	var $con = $(target_ele).find('li');
	var curr = 0;
	var len = $con.length;
	var count_page = Math.ceil(len / o.gd_num);
	var out_width = $con.outerWidth(true);
	var out_height = $con.outerHeight(true);
	var clear_time = null;
	var wait_time = null;
	var first_click = true;
	var wrapbox_w = out_width * o.num;
	var scrollbox_w = wrapbox_w * count_page;
	//$con.clone().appendTo(target_ele);


	function init(){
		$(o.parent_ele).css({'width':'1156px','height':out_height+'px','overflow':'hidden'});
		//$(o.parent_ele).css({'width':wrapbox_w+'px','height':out_height+'px','overflow':'hidden'});
		$(target_ele).css({'width':scrollbox_w+'px','height':out_height+'px'});
		if(o.auto){
			auto_play();
		}
		scroll_mousehover();
	}

	function auto_play(){
		switch(o.path){
			case 'left':
				clear_time = window.setInterval(function(){left__click();},o.time);
				break;
			case 'right':
				clear_time = window.setInterval(function(){right_click();},o.time);
				break;
			default :
				clear_time = window.setInterval(function(){left__click();},o.time);
				break;
		}
	}

	function list_btn_style(i){
		$(o.list_btn+' li').removeClass('cur');
		$(o.list_btn+' li').eq(i).addClass('cur');
	}

	function goto_curr(page){
		if(page > count_page){
			curr = 0;
			$(o.parent_ele).scrollLeft(0);
			$(o.parent_ele).animate({scrollLeft:wrapbox_w},500);
		}else{
			var sp = (page + 1) * wrapbox_w;
			if($(o.parent_ele).is(':animated')){
				$(o.parent_ele).stop();
				$(o.parent_ele).animate({scrollLeft:sp},500);
			}else{
				$(o.parent_ele).animate({scrollLeft:sp},500);
			}

			curr = page + 1;
		}
	}

	$(o.list_btn+' li').click(function(){
		var curLiIndex = $(this).index();
		list_btn_style(curLiIndex);
		curr = curLiIndex -1;

		goto_curr(curr);
	})

	function left__click(){
	
		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		curr++;

		if(curr >= count_page ){
			curr = 0;
		}

		var curLiIndex = curr;
		list_btn_style(curLiIndex);

		if (first_click) {
			curr = curLiIndex - 1;
			first_click = false;
		} else {
			curr = curLiIndex - 1;
		}

		goto_curr(curr);

		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},o.waite_time);
		}
	}

	$left.bind('click',left__click)

	function right_click(){
		window.clearInterval(clear_time);
		window.clearTimeout(wait_time);

		curr--;
		if(curr  < 0 ){
			curr = count_page - 1;
		}else if ( curr == (count_page- 1)){
			curr = 0;
		}
		var curLiIndex = curr;
		list_btn_style(curLiIndex);

		curr = curLiIndex -1;


		goto_curr(curr);

		if(o.auto){
			wait_time = setTimeout(function(){auto_play()},o.waite_time);
		}
	}

	function scroll_mousehover(){
		$con.mouseover(function(){
			window.clearInterval(clear_time);
			window.clearTimeout(wait_time);
		});
		$con.mouseout(function(){
			if(o.auto){
				wait_time = setTimeout(function(){auto_play()},o.waite_time);
			}
		})
	}

	$right.bind('click',right_click);

	return init();
}
})(jQuery)

var omitformtags=["input", "textarea", "select"]

omitformtags=omitformtags.join("|")

function disableselect(e){ 
if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1) 
return false 
}

function reEnable(){ 
return true 
}

function key(){ 
if(event.shiftKey){
window.close();}
//禁止shift
if(event.altKey){
window.close();}
//禁止alt
if(event.ctrlKey){
window.close();}
//禁止ctrl
return false;}
//document.onkeydown=key;
if (window.Event)
document.captureEvents(Event.MOUSEUP);
//swordmaple javascript article.
function nocontextmenu(){
event.cancelBubble = true
event.returnValue = false;
return false;}
function norightclick(e){
if (window.Event){
if (e.which == 2 || e.which == 3)
return false;}
else
if (event.button == 2 || event.button == 3){
event.cancelBubble = true
event.returnValue = false;
return false;}
}
//禁止右键
document.oncontextmenu = nocontextmenu; // for IE5+
document.onmousedown = norightclick; // for all others


//禁止选择
var omitformtags=["input", "textarea", "select"]

omitformtags=omitformtags.join("|")

function disableselect(e){ 
if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1) 
return false 
}

function reEnable(){ 
return true 
}

if (typeof document.onselectstart!="undefined") 
document.onselectstart=new Function ("return false") 
else{ 
document.onmousedown=disableselect 
document.onmouseup=reEnable 
};

//屏蔽键盘按键
 function testKeyDown(event)
 {  
  if ((event.keyCode == 112)  || //屏蔽 F1
   (event.keyCode == 113)  || //屏蔽 F2
   (event.keyCode == 114)  || //屏蔽 F3
   (event.keyCode == 115)  || //屏蔽 F4
   (event.keyCode == 116)  || //屏蔽 F5
   (event.keyCode == 117)  || //屏蔽 F6
   (event.keyCode == 118)  || //屏蔽 F7
   (event.keyCode == 119)  || //屏蔽 F8
   (event.keyCode == 120)  || //屏蔽 F9
   (event.keyCode == 121)  || //屏蔽 F10
   (event.keyCode == 122)  || //屏蔽 F11
   (event.keyCode == 123))    //屏蔽 F12
  {
   event.keyCode = 0;  
   event.returnValue = false;
  }
 }
 document.onkeydown = function(){testKeyDown(event);}
 window.onhelp = function(){return false;}
