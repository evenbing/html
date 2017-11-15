var url = window.location.href;
if (url.indexOf("index/download") < 0) {
    var mySys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? mySys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? mySys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? mySys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? mySys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? mySys.safari = s[1] : 0;
//if (mySys.ie) alert('IE: ' + mySys.ie);
//if (mySys.firefox) alert('Firefox: ' + mySys.firefox);
//if (mySys.chrome) alert('Chrome: ' + mySys.chrome);
//if (mySys.opera) alert('Opera: ' + mySys.opera);
//if (mySys.safari) alert('Safari: ' + mySys.safari);
    if (mySys.ie < 8) {
        window.location.href = "/index/download";
    }
}