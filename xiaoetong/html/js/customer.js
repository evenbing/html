var sms_name;var sms_content;var model_id;var needRefresh=false;var $is_address_right=true;$(document).ready(function(){refresh();initMsgModel();bindElement();$("#searchUser").click(function(){showLoading();var e=$("select[name='is_pay']").val();var t=$("select[name='ruler']").val();var s=$.trim($("#searchContent").val());window.location.href="/customer?is_pay="+e+"&ruler="+t+"&search="+s});$("#searchContent").keypress(function(e){if(e.which==13){$("#searchUser").click()}});$("select[name='is_pay']").on("change",function(){$("#searchUser").click()});checkUrl()});function set_black_list(e,t){$.alert(t==1?"移入黑名单后，该用户将无法在店铺内发表商品评论":"确认移出黑名单","info",{title:"提示",onOk:function s(){showLoading();$.post("/black_name_list",{user_id:e,type:t},function(e){if(e.code==0){if(t==0){baseUtils.show.blueTip("移出黑名单成功")}else{baseUtils.show.blueTip("移入黑名单成功")}window.location.reload()}else{baseUtils.show.redTip("网络错误")}hideLoading()})},canceltext:"取消",oktext:"确认"})}function jumpDetail(e){var e=e;var t=e.split("|")[0];var s=e.split("|")[1];window.location.href="/customerdetail?appId="+t+"&userId="+s}function jumpMsg(e){var e=e;var t=e.split("|")[0];var s=e.split("|")[1];$("#SmsModal").modal("show");document.getElementById("link_type_selector")[0].selected=true;$("#skip_target_selector").empty();$("#skip_target_selector").addClass("hide");$("#skip_target_input").removeClass("hide");$(".modal-footer").children("button").eq(0).unbind("click").bind("click",function(){var e=$("#sms_nickname").val();var i=$("#sms_content").val();if(e.length==0){$.alert("亲，还未输入发送人昵称哦~","error",{btn:2});return false}if(i.length==0){$.alert("亲，还未输入消息内容哦~","error",{btn:2});return false}if(!$is_address_right){$.alert("亲，外部链接输入有问题哦~","error",{btn:2});return false}$("#SmsModal").modal("hide");showLoading();var a={};var r=$("#link_type_selector").find("option:selected").val();if(r=="audio"){r=2}else if(r=="video"){r=3}else if(r=="image_text"){r=1}else if(r=="alive"){r=7}else if(r=="package"){r=6}else if(r=="h5"){r=5}else{r=0}a["skip_type"]=r;if(r==5){a["skip_target"]=$("#skip_target_input").val().trim()}else if(r==0){a["skip_target"]=""}else{a["skip_target"]=$("#skip_target_selector").find("option:selected").val()}if(r==2||r==3||r==1||r==6){if(a["skip_target"]==""){baseUtils.show.blueTip("请选择跳转资源链接!");return false}}if(r!=0){a["skip_title"]=$("#link_name").val()}else{a["skip_title"]=""}$.post("/customermsg",{appId:t,userId:s,nickname:e,content:i,params:a},function(e){hideLoading();if(e.ret==0){baseUtils.show.blueTip("发送成功!",function(){window.location.reload()})}else{window.wxc.xcConfirm("系统繁忙，请稍后再试!","error")}})})}function initMsgModel(){$(".model_type").on("click",function(){$(".model_type").removeClass("border_blue");$(this).addClass("border_blue");$("#sms_nickname").val($(this).attr("data-name"));$("#sms_content").val($(this).attr("data-content"));if($("#cancel_model").hasClass("border_blue")){$(".edit_model").addClass("hide");$(".model_type").removeClass("border_blue")}model_id=$(this).attr("data-id");sms_name=$(this).attr("data-name");sms_content=$(this).attr("data-content")});$("#sms_content").keyup(function(){if($(".border_blue").length>0){$(".edit_model").removeClass("hide")}});$("#sms_nickname").keyup(function(){if($(".border_blue").length>0){$(".edit_model").removeClass("hide")}});$(".edit_model").on("click",function(){model_id=$(".border_blue").attr("data-id");var e=$("#sms_nickname").val();var t=$("#sms_content").val();if(model_id==""){model_id=0;if(e!=""&&t!=""){console.log("新增模板："+model_id+">>"+e+">>"+t)}else{baseUtils.show.redTip("您的发送人昵称/内容为空");return}}else{if(e!=""&&t!=""){console.log("更新模板："+model_id+">>"+e+">>"+t)}else{baseUtils.show.redTip("您的发送人昵称/内容为空");return}}if(e==sms_name&&t==sms_content){baseUtils.show.redTip("您没有做任何模板修改")}else{showLoading();var s="/modelchange";$.post(s,{model_id:model_id,send_nick_name:e,content:t},function(s){hideLoading();console.log(s);var i=s.code;var a=s.msg;baseUtils.show.blueTip(a);if(i==0){$(".border_blue").attr("data-id",s.id);$(".border_blue").attr("data-name",e);$(".border_blue").attr("data-content",t);needRefresh=true}else if(i==1){console.log(s.errorMsg)}else if(i==2){$(".border_blue").attr("data-name",e);$(".border_blue").attr("data-content",t);needRefresh=true}})}})}function refresh(){$("#SmsModal").on("hide.bs.modal",function(){if(needRefresh){location.reload()}})}function bindElement(){$("#link_type_selector").on("change",function(){var e=$(this).find("option:selected").val();if(e=="h5"){$("#skip_target_selector").empty();$("#skip_target_selector").addClass("hide");$("#skip_target_input").removeClass("hide");return}else if(e=="no_jump"){$("#skip_target_selector").empty();$("#skip_target_selector").removeClass("hide");$("#skip_target_input").addClass("hide");return}else{$("#skip_target_selector").empty();$("#skip_target_selector").removeClass("hide");$("#skip_target_input").addClass("hide")}$.get("/banner/getResourceList?type="+e,function(e){$("#skip_target_selector").empty();e=JSON.parse(e);var t=e.length;var s="";for(var i=0;i<t;i++){s+="<option value='"+e[i].id+"'>"+e[i].title+"</option>"}$("#skip_target_selector").append(s)})})}function checkUrl(){$("#skip_target_input.form-control").bind("input propertychange",function(){var e=document.getElementById("skip_target_input").value;if(e==""||!e.indexOf("http://")||!e.indexOf("https://")){$(".http_error_tip").addClass("hide");$(".modal-footer").css({margin:"45px 15px 0"}).css({padding:"30px 0px"});$is_address_right=true}else{$(".http_error_tip").removeClass("hide");$(".modal-footer").css({margin:"0 15px 0"}).css({padding:"15px 0 0 30px"});$is_address_right=false}});$("#link_type_selector").change(function(){var e=$(this).children(":selected").val();if(e!=="h5"){$(".http_error_tip").addClass("hide");$(".modal-footer").css({margin:"45px 15px 0"}).css({padding:"30px 0px"});$is_address_right=true}else{$("#skip_target_input").val("")}})}