$(function () {
    adjustHeight();
});
window.onload = function () {
    window.onresize = adjustHeight;
}
$(window).resize(function () {
    adjustHeight();
});
function adjustHeight() {
    var height = $(window).height() - $("#footer").height() - $("#header").height();
    $("#divbody").css("min-height", height);
}
$(window).scroll(function () {

});
