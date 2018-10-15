/*
    妈妈资本管理有限公司WAP端屏幕适配专用类库
 */
function adaptPage(id) {
    var sWidth = window.innerWidth;
    var sHeight = window.innerHeight;
    var plat = navigator.platform;
    if ((sWidth > 420)
        && (plat.indexOf("Android") > -1 || plat.indexOf("iPhone") > -1)) {
        if (document.compatMode == "CSSICompat") {
            sWidth = document.documentElement.clientWidth;
            sHeight = document.documentElement.clientHeight;
        } else {
            sWidth = document.body.clientWidth;
            sHeight = document.body.clientHeight;
        }
    }

    $("." + id).css("width", sWidth);
    $("." + id).css("max-width", "640px");
    $("." + id).css("margin", "0 auto");
}
/** 提示* */
function messager(msg) {
    if (layer && msg) {
        layer.open({
            content : msg,
            shade : true,
            style : 'background-color:rgba(30,30,30,.6); color:#fff; border-radius:4px;font-size:14px;max-width:80% ;width:auto;padding-left:10px;padding-right:10px;',
            time : 2,
            success : function() {
                $('.layermcont').css('color', '#fff');
            },
            end : function() {
                $('.layermcont').css('color', '#7a7a7a');
            }
        });
    }
}
function isApp() {
    if (navigator.userAgent.indexOf("mamaWallet") != -1
        || navigator.userAgent.indexOf("mmwallet") != -1) {
        return true;
    }
    return false;
}
function toApp(isDownload) {
    if (!isApp() && !browser.versions.weixin) {
        if (browser.versions.ios) {
            // window.open("iOSMamaWallet://");
            // location.href="https://88mmmoney.com/";

            location.href = "iOSMamaWallet://";
            setTimeout(
                function() {
                    if (isDownload) {
                        location.href = "https://itunes.apple.com/cn/app/ma-ma-qian-bao/id1025005906?mt=8";
                        /** *下载app的地址** */
                    }
                }, 2000)
        } else if (browser.versions.android) {
            // window.location.href = "androidMamaWallet://";
            var ifr = document.createElement("iframe");
            ifr.src = "androidmamawallet://";
            ifr.style.display = "none";
            document.body.appendChild(ifr);
            setTimeout(
                function() {
                    document.body.removeChild(ifr);
                    if (isDownload) {
                        location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.mmmoney.app";
                    }
                }, 2000)
        }
    }
}
function getRemSize() {
    var this_width = $(window).width(); //当前浏览器可视窗口的宽度
    if(this_width > 640) {
        this_width = 640;
    }
    var font_size = parseInt((this_width - 320) * (3 / 55) + 10);
    font_size = font_size > 14 ? 14 : font_size;
    return font_size;
}
var browser = {
    versions : function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident : u.indexOf('Trident') > -1,
            /* IE内核 */
            presto : u.indexOf('Presto') > -1,
            /* opera内核 */
            webKit : u.indexOf('AppleWebKit') > -1,
            /* 苹果、谷歌内核 */
            gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            /* 火狐内核 */
            mobile : !!u.match(/AppleWebKit.*Mobile.*/),
            /* 是否为移动终端 */
            ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            /* ios终端 */
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            /* android终端或者uc浏览器 */
            iPhone : u.indexOf('iPhone') > -1,
            /* 是否为iPhone或者QQHD浏览器 */
            iPad : u.indexOf('iPad') > -1,
            /* 是否iPad */
            webApp : u.indexOf('Safari') == -1,
            /* 是否web应该程序，没有头部与底部 */
            souyue : u.indexOf('souyue') > -1,
            superapp : u.indexOf('superapp') > -1,
            weixin : u.toLowerCase().indexOf('micromessenger') > -1,
            Safari : u.indexOf('Safari') > -1
        };
    }(),
    language : (navigator.browserLanguage || navigator.language).toLowerCase()
};
$(function() {
    adaptPage(adaptPageClass);
    window.onresize = function() {
        adaptPage(adaptPageClass);
    }
    var this_width = $(window).width();// 当前浏览器可视窗口的宽度
    if (this_width > 640) {
        this_width = 640;
    }
    var font_size = parseInt((this_width - 320) * (3 / 55) + 10);
    if (font_size > 14) {
        font_size = 14 + 'px';
    } else {
        font_size = font_size + 'px';
    }
    $("html").css("font-size", font_size);// 响应式布局，根据不同屏幕宽度，设置字体大小
})
