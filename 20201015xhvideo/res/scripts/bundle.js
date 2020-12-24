"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function ($) {
    /**
     *日期格式化
     *@method format
     *@param  "yyyy-MM-dd"
     *@return "2017-09-01"
     */
    ;Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }return fmt;
    }

    /**
     *字符串序列化为json
     *@method str2json
     *@param  String 属性名
     *@return Object|String
     */
    ;String.prototype.str2json = function (name) {
        var num = this.indexOf("?"),
            str = this.substr(num + 1),
            arr = str.split("&"),
            res = {};
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                var n = arr[i].substring(0, num),
                    v = arr[i].substr(num + 1);
                res[n.toLowerCase()] = decodeURIComponent(v);
            }
        }
        if (name) {
            name = name.toLowerCase();
            return res[name] ? res[name] : '';
        }
        return res;
    }

    //切换页面
    ;$.fn.render = function (el) {
        var o = typeof el != 'string' ? el : null;
        if (o) {
            el = null;
        }
        el = !el ? 'section' : el;
        $(el).removeClass('active');
        this.addClass('active');
        this.trigger('render', o);
    }

    //表单序列化为json对象
    ;$.fn.form2json = function () {
        var res = {};
        this.find('[name]').each(function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            res[name] = val;
        });
        return res;
    };

    var ua = function () {
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        var res = { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
            weixin: u2.match(/MicroMessenger/i) == "micromessenger",
            ali: u.indexOf('AliApp') > -1
        };
        res.weixin = res.weixin && res.mobile;
        return res;
    }();

    var hocodo = {

        //获取浏览器信息
        ua: ua,

        /**
        *添加百度统计事件
        *@method BDTJ
        *@param  String 事件名称
        */
        BDTJ: function BDTJ(name, val) {
            if (!window['_hmt']) {
                console.error('please create tongji script');
                return;
            }
            val = !val ? '' : val;
            _hmt.push(['_trackEvent', name, val, new Date().format('yyyy-MM-dd')]);
        },


        //友盟统计事件
        YMTJ: function YMTJ(category, action, label, value, nodeid) {
            if (!window['_czc']) {
                console.error('please create tongji script');
                return;
            }
            val = !val ? '' : val;
            _czc.push(['_trackEvent', category, action, label, value, nodeid]);
        },
        qrcodeUrl: function qrcodeUrl(text) {
            return "http://wandafilm.xhgai.com/service/test/qrcode.php?margin=1&text=" + encodeURIComponent(text);
        },


        //文件上传
        upload: function upload($el, callback) {
            if (!window['EXIF']) {
                console.error('please import EXIF.js');
                return;
            }
            $el.change(function () {
                var files = $(this)[0].files;
                if (files.length > 0) {
                    layer.loading();
                    EXIF.getData(files[0], function () {
                        EXIF.getAllTags(this);
                        var url = URL.createObjectURL(files[0]);
                        var img = new Image();
                        var org = EXIF.getTag(this, 'Orientation');
                        img.onload = function () {
                            var rotation = 0;
                            switch (org) {
                                case 3:
                                    rotation = 180;
                                    break;
                                case 6:
                                    rotation = 90;
                                    break;
                                case 8:
                                    rotation = 270;
                                    break;
                            }
                            callback(url, rotation, org);
                        };
                        img.src = url;
                    });
                }
            });
        },


        //微信分享
        share: function share(options) {
            if (!window['wx']) {
                console.error('please import https://res.wx.qq.com/open/js/jweixin-1.2.0.js');
                return;
            }
            options = $.extend({}, {
                title: '分享标题',
                desc: '分享描述语',
                link: '',
                imgUrl: '',
                trigger: function trigger(res) {},
                cancel: function cancel(res) {},
                success: function success(res) {
                    BDTJ('EVENT', '分享到朋友圈');
                },
                fail: function fail(res) {}
            }, options);

            window.wxShareConfig = options;

            var info = {
                appId: '',
                secret: '',
                url: window.location.href.split("#")[0]
            };

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "https://app.hocodo.com/webapps/weixinservice/weixinservice.php?callback=?",
                data: { "param": JSON.stringify(info) },
                async: false,
                success: function success(data) {
                    wx.config({
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow']
                    });
                    wx.ready(function () {
                        wx.hideMenuItems({
                            menuList: ['menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });
                        wx.onMenuShareTimeline(window.wxShareConfig);
                        wx.onMenuShareAppMessage(window.wxShareConfig);
                    });
                }
            });
        },


        //进入页面自动播放
        autoPlay: function autoPlay(callback) {
            if (this.ua.weixin) {
                document.addEventListener("WeixinJSBridgeReady", function () {
                    callback && callback();
                }, false);
                document.addEventListener("YixinJSBridgeReady", function () {
                    callback && callback();
                }, false);
            } else {
                callback && callback();
            }
        },


        //文本框失去焦点后回弹
        afterInput: function afterInput() {
            window.scrollSmoothTo = function (position) {
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = function (callback, element) {
                        return setTimeout(callback, 17);
                    };
                }
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var step = function step() {
                    var distance = position - scrollTop;
                    scrollTop = scrollTop + distance / 5;
                    if (Math.abs(distance) < 1) {
                        window.scrollTo(0, position);
                    } else {
                        window.scrollTo(0, scrollTop);
                        requestAnimationFrame(step);
                    }
                };
                step();
            };
            window.screenTop = 0;
            $('body').on('focus', 'input,textarea', function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                window.screenTop = scrollTop;
            }).on('blur', 'input,textarea', function () {
                window.scrollSmoothTo(window.screenTop);
            });
        },
        music: function music(id, videoId) {
            id = !id ? 'music' : id;
            $('#' + id).click(function () {
                $(this).toggleClass('playing');
                if (videoId) {
                    var v = document.getElementById(videoId);
                    if (v.paused) v.play();else v.pause();
                }
            });
        },

        //ajax
        remote: function remote(a) {
            var options = $.extend({
                type: 'POST',
                dataType: 'json',
                success: function success(res) {},
                error: function error() {}
            }, a);

            options.noLayer = a.layer === false;

            options.success = function (res) {
                if (!options.noLayer) layer.closeAll();
                if (res.code == 200) {
                    a.success && a.success(res);
                } else {
                    if (a.error) {
                        a.error(res);
                    } else {
                        layer.info(res.msg || '网络异常，请稍后重试');
                    }
                }
            };
            options.error = function (res) {
                layer.info(res.msg || '网络异常，请稍后重试');
            };

            if (!options.noLayer) layer.loading();
            return $.ajax(options);
        }
    };

    window.hocodo = hocodo;

    (function () {
        if ((typeof WeixinJSBridge === "undefined" ? "undefined" : _typeof(WeixinJSBridge)) == "object" && typeof WeixinJSBridge.invoke == "function") {
            handleFontSize();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
            }
        }

        function handleFontSize() {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
            // 重写设置网页字体大小的事件
            WeixinJSBridge.on('menu:setfont', function () {
                WeixinJSBridge.invoke('setFontSizeCallback', {
                    'fontSize': 0
                });
            });
        }
    })();
})(jQuery);
'use strict';

/*  =======================================================================================
 *  Source Name	    :   main.js
 *  Build Version	:   0.1.0
 *  --------------------------------------------------------------------------------
 *
 *  Date		    :	Revised on [2018/4/17]
 *  Author          :   GAI (replace8@qq.com)
 * 
 *  --------------------------------------------------------------------------------
 *
 *  Descript        :
 *
 *  ======================================================================================== */

var scene;
var videos = {
    "s1_1": {
        mp4: 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a5756e35285890807743979838/YYhfI38A0iUA.mp4',
        cover: 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5756e35285890807743979838/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef'
    },
    "s1_2": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a5757205285890807743979853/vMUJNf9pJb8A.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5757205285890807743979853/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf3349965285890811709718747/NR0PYeI9ZQYA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf3349965285890811709718747/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s1_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db0d65285890807749653164/A8GdUUxHT7gA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db0d65285890807749653164/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e914f58b5285890811710175729/nDoOcgsaXwYA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e914f58b5285890811710175729/coverBySnapshot_10_0.jpg?v=ba14ef"
    },

    "s2_1": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575abd5285890807743979904/IaH81JoTBoUA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575abd5285890807743979904/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeace5285890811710069874/iPdsOGqIFM8A.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeace5285890811710069874/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s2_2": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575ae05285890807743979916/fbhIQKOXP4kA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575ae05285890807743979916/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334d725285890811709718815/qIApxg3QdUwA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334d725285890811709718815/coverBySnapshot_10_0.jpg?v=ba14ef"

    },
    "s2_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575b425285890807743979945/0s9EWO6JxfAA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575b425285890807743979945/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeb105285890811710069894/baxOCTOtRHoA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeb105285890811710069894/coverBySnapshot_10_0.jpg?v=ba14ef"
    },

    "s3_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db5185285890807749653265/IxAL7t2VHwEA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db5185285890807749653265/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s3_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db57e5285890807749653298/5yEvrFg7GggA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db57e5285890807749653298/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },

    "s3_4": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db8f35285890807749653332/IWVT6xwzhzoA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db8f35285890807749653332/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334db65285890811709718837/jVokfCA8u9EA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334db65285890811709718837/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s3_5": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a645e545285890807743980066/eOqCkvi8SDQA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a645e545285890807743980066/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },

    "s4_1": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010dbcd65285890807749653407/ulnhQW4oWacA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbcd65285890807749653407/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e135285890811709718861/ZbZYZWBtRGkA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e135285890811709718861/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s4_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a64620c5285890807743980121/hwZAUu1wXDgA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a64620c5285890807743980121/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s4_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010dbd955285890807749653460/Q481mQzh0O4A.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbd955285890807749653460/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e795285890811709718894/pdEL19vOVboA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e795285890811709718894/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s5_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a6466105285890807743980206/RJnolWJLiAgA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a6466105285890807743980206/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s5_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd685285890807750507412/iMCOiAQiaWYA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd685285890807750507412/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s5_3": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd8c5285890807750507425/sFD4RRe416wA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd8c5285890807750507425/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    // 新的
    "s6_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdea9565285890811709619666/4adk5GgeJEsA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdea9565285890811709619666/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s6_1_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c4122e0d5285890811709945331/BlG0qX4ymlcA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e0d5285890811709945331/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s6_1_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c412322c5285890811709945420/2eAqk3lUvNkA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c412322c5285890811709945420/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s6_2_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c4122e725285890811709945363/paIibfcQqZgA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e725285890811709945363/coverBySnapshot_10_0.jpg?v=ba14ef"
    },
    "s6_2_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdbe6af5285890811709614529/NZuM8lPZulIA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdbe6af5285890811709614529/coverBySnapshot_10_0.jpg?v=ba14ef"
    }
};
var krpano;var vkrpo;var step = 0;
function playVideo(status) {
    var jscall = '';
    var video;
    if (status == 'ended') {
        if (scene == 's1') {}
    }
    if (jscall.length > 0) {
        krpano.call(jscall);
    }
}
var loaded = 0;
var timeline = new TimelineMax({
    paused: true,
    onComplete: function onComplete() {
        setTimeout(function () {
            krpano.call('initview();');
        }, 500);
        timeline = null;
        setTimeout(function () {
            var tl = new TimelineMax({
                onComplete: function onComplete() {
                    $('#index').remove();
                }
            });
            tl.to($('#index'), 1, { alpha: 0, ease: Power0.easeNone });
        }, 3000);
    }
});

var $el, $go, $title, $sub, $tag;
var sceneLoaded;

$(function () {
    $('#btns').click(function () {
        $('#title').html('');
        LoadScene('tour');
    });
    $('#gyro').click(function () {
        $(this).toggleClass('active');
        var jscall = 'set(plugin["gyro2"].enabled,' + (!$(this).hasClass('active') ? 'false' : 'true') + ');';
        krpano.call(jscall);
        vkrpo.call(jscall);
    });
    $('#night').click(function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            krpano.call('loadscene(night, null, MERGE);');
        } else {
            krpano.call('loadscene(day, null, MERGE);');
        }
        var jscall = '';
        for (var i = 1; i < 10; i++) {
            jscall += 'set(hotspot["poi' + i + '2"].visible, true);';
        }
        krpano.call(jscall);
    });
    var imgs = ['res/images/light_1.png?v=ba14ef', 'res/images/light_2.png?v=ba14ef', 'res/images/subtitle.png?v=ba14ef', 'res/images/title.png?v=ba14ef'];

    // 加载
    var loader = new PIXI.Loader();
    loader.onProgress.add(function (e) {
        var progress = Math.round(e.progress);
        $('.progress .bar div').css({ width: progress + '%' });
        $('.progress span').text(progress + '%');
    });
    loader.onComplete.add(function () {
        $('#loading').remove();
        imgs.map(function (a) {
            var img = new Image();
            img.onload = function (e) {
                if (this.src.indexOf('bg.jpg?v=ba14ef') != -1) {
                    $('#index .bg').css({
                        'background-image': 'url(' + this.src + ')'
                    });
                }
                loaded++;
                if (loaded == imgs.length) {
                    loadComplete();
                }
            };
            img.src = a;
        });
    });
    loader.add(['res/images/360_rotate.png?v=ba14ef' + ver, 'res/images/gyro.png?v=ba14ef' + ver, 'res/images/gyro_active.png?v=ba14ef' + ver, 'res/images/light_1.png?v=ba14ef' + ver, 'res/images/light_2.png?v=ba14ef' + ver, 'res/images/loadbar.png?v=ba14ef' + ver, 'res/images/loading.png?v=ba14ef' + ver, 'res/images/logo.png?v=ba14ef' + ver, 'res/images/share.jpg?v=ba14ef' + ver, 'res/images/t_1.png?v=ba14ef' + ver, 'res/images/t_2.png?v=ba14ef' + ver, 'res/images/t_chaoshi.png?v=ba14ef' + ver, 'res/images/t_cunwei.png?v=ba14ef' + ver, 'res/images/t_mogu.png?v=ba14ef' + ver, 'res/images/t_nongjia.png?v=ba14ef' + ver, 'res/images/t_xiaochi.png?v=ba14ef' + ver, 'res/images/t_xitai.png?v=ba14ef' + ver, 'res/images/title.png?v=ba14ef' + ver, 'res/images/xhlogo.png?v=ba14ef' + ver, 'res/images/tips.png?v=ba14ef' + ver, 'res/images/day.png?v=ba14ef' + ver, 'res/images/night.png?v=ba14ef' + ver, 'images/chaoshi.png?v=ba14ef' + ver, 'images/cunweihui.png?v=ba14ef' + ver, 'images/erhaoyuan.png?v=ba14ef' + ver, 'images/mogu.png?v=ba14ef' + ver, 'images/nongjiayuan.png?v=ba14ef' + ver, 'images/spot6_gif.png?v=ba14ef' + ver, 'images/xiaochijie.png?v=ba14ef' + ver, 'images/xitai.png?v=ba14ef' + ver, 'images/yihaoyuan.png?v=ba14ef' + ver, 'images/new.png?v=ba14ef' + ver, 'images/fuwuzhongx.png?v=ba14ef' + ver, 'images/nongcun.png?v=ba14ef' + ver, 'images/jinru_fuwuzhongx.png?v=ba14ef' + ver, 'images/jinru_nongcun.png?v=ba14ef' + ver, 'res/scripts/jquery.min.js', 'res/scripts/rem.750.js', 'res/scripts/TweenMax.js', 'tour.js' + ver, 'res/scripts/config.js' + ver, 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5756e35285890807743979838/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf3349965285890811709718747/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e914f58b5285890811710175729/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeace5285890811710069874/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334d725285890811709718815/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeb105285890811710069894/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db5185285890807749653265/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db57e5285890807749653298/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334db65285890811709718837/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a645e545285890807743980066/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e135285890811709718861/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a64620c5285890807743980121/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e795285890811709718894/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd685285890807750507412/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd8c5285890807750507425/coverBySnapshot/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdea9565285890811709619666/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e0d5285890811709945331/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c412322c5285890811709945420/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e725285890811709945363/coverBySnapshot_10_0.jpg?v=ba14ef', 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdbe6af5285890811709614529/coverBySnapshot_10_0.jpg?v=ba14ef'
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a5756e35285890807743979838/YYhfI38A0iUA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf3349965285890811709718747/NR0PYeI9ZQYA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e914f58b5285890811710175729/nDoOcgsaXwYA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeace5285890811710069874/iPdsOGqIFM8A.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeb105285890811710069894/baxOCTOtRHoA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334d725285890811709718815/qIApxg3QdUwA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db5185285890807749653265/IxAL7t2VHwEA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db57e5285890807749653298/5yEvrFg7GggA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334db65285890811709718837/jVokfCA8u9EA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a645e545285890807743980066/eOqCkvi8SDQA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e135285890811709718861/ZbZYZWBtRGkA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a64620c5285890807743980121/hwZAUu1wXDgA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e795285890811709718894/pdEL19vOVboA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a6466105285890807743980206/RJnolWJLiAgA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd685285890807750507412/iMCOiAQiaWYA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd8c5285890807750507425/sFD4RRe416wA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdea9565285890811709619666/4adk5GgeJEsA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdbe6af5285890811709614529/NZuM8lPZulIA.mp4',
    // 'http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c412322c5285890811709945420/2eAqk3lUvNkA.mp4',
    ]);
    loader.load();

    function loadComplete() {
        embedpano({ swf: "tour.swf", xml: "tour.xml?r=23", target: "pano", html5: "auto", mobilescale: 1.0, passQueryParameters: true,
            onready: function onready(r) {
                krpano = r;
                krpano.call('loadscene(day, null, MERGE);');
            }
        });
        embedpano({ swf: "tour.swf", xml: "video.xml?r=23", target: "video", html5: "auto", mobilescale: 1.0, passQueryParameters: true,
            onready: function onready(r) {
                vkrpo = r;
            }
        });
        $('#index').append($('#html').html());
        $el = $('#index'), $title = $('.title', $el), $sub = $('.sub', $el), $tag = $('.logo', $el);

        timeline.fromTo($title, 1, { y: 100, scale: 1.5, alpha: 0 }, { y: 0, scale: 1, alpha: 1, ease: Power0.easeNone }, .3);
        timeline.fromTo($sub, 1, { y: -30, alpha: 0 }, { y: 0, alpha: 1 });
        timeline.fromTo($tag, 1, { y: 60, alpha: 0 }, { y: 0, alpha: 1 }, .8);
    }
});

var isfirst = true;
function firstSceneLoaded() {
    if (!isfirst) {
        return;
    } else {
        isfirst = false;
        krpano.call('skin_view_littleplanet();');
        setTimeout(function () {
            krpano.call('normalview();');
        }, 0);
        return;
    }
}
function onVideoEnded() {
    $('#zimu').empty();
}
function loadZimu(time) {
    var zm = zmList[scene];
    if (time > 0 && zm) {
        var text = "";
        for (var i = 0; i < zm.length; i++) {
            if (zm[i].start <= time && zm[i].end >= time) {
                text = zm[i].text;
                break;
            }
        }
        if (text.length > 0) {
            text = text.split("：");
            text = "<div style='padding-left:" + (text[0].length + 1) + "em;'><span><b>" + text[0] + "：</b><i>" + text[0] + "：</i></span>" + "<p><b>" + text[1] + "</b><i>" + text[1] + "</i></p></div>";
            if (window.lastText != text) {
                window.lastText = text;
                $('#zimu').html(text);
            }
        }
    }
}
function loadRenwu(time) {
    $('#btns').addClass('on');
    $('#night').removeClass('on');
    if (time != "") {
        var personal = personalList[scene];
        if (!personal) personal = personalList[scene.substr(0, 3)];
        if (personal) {
            $('#renwu').html(personal.join('<br/>'));
            window.renwuTimer = setTimeout(function () {
                $('#renwu').addClass('on');
                window.renwuTimer = setTimeout(function () {
                    $('#renwu').removeClass('on');
                }, 5000);
            }, time);
        }
        var tit = titleConfig[scene];
        if (!tit) tit = titleConfig[scene.substr(0, 3)];
        if (tit) {
            $('#title').html('<img src="res/images/' + tit + '.png?v=ba14ef"/>');
        } else {
            $('#title').empty();
        }
    }
}
var isS23;
function LoadScene(s, fromHome) {
    console.log(s);
    var v = videos[s];
    var a = vkrpo.get('plugin[video]');
    a.pause();
    $('#renwu').html('');
    $('#zimu').html("");
    $('#btns').removeClass('on');
    $('#night').addClass('on');
    window.renwuTimer && clearTimeout(window.renwuTimer);
    scene = s || 'day';
    isS23 = scene == 's2_3';
    $('#next').removeClass('on');
    $('#next').off('click').on('click', function () {
        $(this).removeClass('on');
        var name = scene;
        var next;
        if (name.indexOf('s1_') != -1) {
            next = 's2_1';
        } else if (name.indexOf('s2_') != -1) {
            next = 's3_4';
        } else if (name == 's3_4') {
            next = 's3_2';
        } else if (name == 's3_2') {
            next = 's3_5';
        } else if (name == 's3_5') {
            next = 's4_1';
        } else if (name.indexOf('s4_') != -1) {
            next = 's3_1';
        } else if (name == 's3_1') {
            next = 's5_1';
        } else {
            next = 's1_1';
        }
        LoadScene(next);
    });
    if (v) {
        window.s13timer && clearTimeout(window.s13timer);
        vkrpo.get('hotspot').getArray().map(function (a) {
            a.visible = false;
        });
        var poi = {
            's1_1': [19, 3.7, 130, ['s1_1']],
            's1_2': [0, 0, 130, ['s1_2']],
            's1_3': [78.7, 3.25, 130],
            's2_1': [0, 0, 130, ['s2_1']],
            's2_2': [0, 0, 130],
            's2_3': [26, 4.68, 130],
            's3_1': [0, 0, 130],
            's3_2': [-2.29, -4.35, 100, ['s3_2_new', 's2_3_new']],
            's3_3': [0, 0, 130],
            's3_4': [-10.8, 4.8, 130],
            's3_5': [0, 0, 130],
            's4_1': [0, 0, 130, ['s4_1', 's4_1_2']],
            's4_3': [23, 9.8, 130],
            's5_1': [31.7, 22, 130, ['s5_1', 's5_1_2']],
            's5_2': [0, 0, 130],
            's5_3': [0, 0, 130],
            's6_1': [0, 0, 130, ['s6_1_1', 's6_2_1']],
            's6_1_1': [0, 0, 130, ['s6_1_2']],
            's6_1_2': [0, 0, 130],
            's6_2_1': [0, 0, 130, ['s6_2_2']],
            's6_2_2': [0, 0, 130]
        }[scene];
        var jscall = '';
        jscall += 'set(view.hlookat,' + poi[0] + ');';
        jscall += 'set(view.vlookat,' + poi[1] + ');';
        jscall += 'set(view.fov,' + poi[2] + ');';

        if (poi[3]) {
            poi[3].map(function (a) {
                jscall += 'set(hotspot[' + a + '].visible, true);';
                jscall += 'set(hotspot[' + a + '2].visible, true);';
            });
        }

        if (scene == 's5_1') {
            jscall += 'set(hotspot["s5_1"].ath, 32.5);';
            jscall += 'set(hotspot["s5_1"].atv, -6.5);';

            jscall += 'set(hotspot["s5_12"].ath, 32.5);';
            jscall += 'set(hotspot["s5_12"].atv, -2.5);';

            jscall += 'set(hotspot["s5_1_2"].ath, 6);';
            jscall += 'set(hotspot["s5_1_2"].atv, 6);';

            jscall += 'set(hotspot["s5_1_22"].ath, 6);';
            jscall += 'set(hotspot["s5_1_22"].atv, 10);';
        }
        vkrpo.call(jscall);
        a.enabled = true;
        a.posterurl = v.cover;
        a.videourl = v.mp4;
        a.playvideo(v.mp4, v.cover, false);
        a.onvideoready = function () {
            test("ready");
        };
    } else {
        a.playvideo("", "", true);
        a.enabled = false;
        $('#pano').addClass('on');
        $('#video').removeClass('on');
    }
}
var fn;
function test(state) {
    if (state === 'ready') {
        var a = vkrpo.get('plugin[video]');
        fn = 'removeClass';
        if (['s1_3', 's2_2', 's3_1', 's3_2', 's3_4', 's3_5', 's4_3', 's5_2', 's5_3'].indexOf(scene) != -1) {
            fn = 'addClass';
        }
        a.videoDOM.removeEventListener("timeupdate", null, false);
        a.videoDOM.addEventListener("timeupdate", function () {
            if (!this.paused) loadZimu(this.currentTime);
            if (isS23 && this.currentTime > 3.5) {
                isS23 = false;
                vkrpo.call('set(hotspot[s2_3].visible, true);set(hotspot[s2_32].visible, true);');
            }
            if (fn == 'addClass' && this.currentTime >= this.duration - 5) {
                fn = null;
                $('#next').addClass('on');
            }
        }, false);
        $('#zimu').removeClass('on');
    } else if (state === 'play') {
        var a = vkrpo.get('plugin[video]');
        loadRenwu(a.renderrenwu);
        $('#zimu').addClass('on');
        $('#pano').removeClass('on');
        $('#video').addClass('on');
        window.s13timer && clearTimeout(window.s13timer);
        if (scene == 's1_3') {
            window.s13timer = setTimeout(function () {
                if (scene == 's1_3') {
                    var t = 'tween(view.hlookat, -34, .8, linear);tween(view.vlookat, 8.7, .8, linear)';
                    vkrpo.call(t);
                }
            }, 2200);
        } else if (scene == 's5_1') {
            window.s13timer = setTimeout(function () {
                if (scene == 's5_1') {
                    var t = '';
                    t += 'tween(hotspot["s5_1"].ath, 45.9, 13, linear);';
                    t += 'tween(hotspot["s5_1"].atv, -4.5, 13, linear);';

                    t += 'tween(hotspot["s5_12"].ath, 45.9, 13, linear);';
                    t += 'tween(hotspot["s5_12"].atv, -0.5, 13, linear);';

                    t += 'tween(hotspot["s5_1_2"].ath, 3, 13, linear);';
                    t += 'tween(hotspot["s5_1_2"].atv, 32.8, 13, linear);';

                    t += 'tween(hotspot["s5_1_22"].ath, 3, 13, linear);';
                    t += 'tween(hotspot["s5_1_22"].atv, 36.8, 13, linear);';
                    vkrpo.call(t);
                }
            }, 2200);
        }
    } else {
        $('#zimu').empty();
    }
}

function startNormalView() {
    if (sceneLoaded) {
        return;
    }
    setTimeout(function () {
        timeline.play();
        setTimeout(function () {
            var i = 0;
            $('i', $el).each(function () {
                i++;
                var animation = 'an-show 1s linear ' + (i + 0.5) / 3 + 's infinite alternate';
                $(this).css({
                    'animation': animation,
                    '-webkit-animation': animation
                });
            });
        }, 500);
    }, 500);
    // $('#index').remove();
}
function endNormalView() {
    if (sceneLoaded) {
        return;
    }
    sceneLoaded = 1;
    var jscall = '';
    for (var i = 1; i < 10; i++) {
        jscall += 'set(hotspot["poi' + i + '2"].visible, true);';
    }
    krpano.call(jscall);
    $('#gyro').addClass('on');
    $('#night').addClass('on');

    if (!window.firstLoaded) {
        window.firstLoaded = true;
        $('#tips_mtk').addClass("on");
        $('#tips_mtk').click(function () {
            $('#tips_mtk').removeClass("on");
            $('.tips').addClass('show');
            setTimeout(function () {
                $('.tips').remove();
            }, 2500);
        });
    }
}

function onSceneLoaded() {
    if (!scene || scene == 'back') {
        $('#btns').removeClass('on');
        $('#night').addClass('on');
    } else {
        $('#btns').addClass('on');
        $('#night').removeClass('on');
    }
}