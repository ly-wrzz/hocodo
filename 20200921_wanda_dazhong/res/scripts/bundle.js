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
    }

    //禁止放大文本(H5)
    ;(function () {
        var handleFontSize = function handleFontSize() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
            WeixinJSBridge.on('menu:setfont', function () {
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
            });
        };
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
    })();

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
            val = !val ? location.href.str2json('cinemaid') : val;
            _hmt.push(['_trackEvent', name, val, new Date().format('yyyy-MM-dd')]);
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
                    var url = URL.createObjectURL(files[0]);
                    var img = new Image();
                    img.onload = function () {
                        var org = EXIF.getTag(this, 'Orientation');
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
                        callback(url, rotation);
                    };
                    img.src = url;
                }
            });
        },


        //微信分享
        share: function share(options) {
            var that = thia;
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
                    that.BDTJ('分享到朋友圈');
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
                url: "http://app.xhgai.com/webapps/weixinservice/weixinservice.php?callback=?",
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
            var _this = this;

            id = !id ? 'music' : id;
            $('#' + id).click(function () {
                $(_this).toggleClass('playing');
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
                // console.log(res);
                // if(res.code == 0){
                a.success && a.success(res);
                // }else{
                //     // layer.info(res.msg);
                //     a.error&&a.error(res)
                // }
            };
            options.error = function (res) {
                layer.info('网络异常，请稍后重试');
            };

            if (!options.noLayer) layer.loading();
            return $.ajax(options);
        }
    };

    window.hocodo = hocodo;
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
var daZhong = {
    hocodoUrl: 'http://wandafilm.hocodo.com/project',
    $p1: '',
    $p2: '',
    $p3: '',
    $p4: '',
    urlObj: location.href.str2json(),
    init: function init() {
        this.$p1 = $('#p1');
        this.$p2 = $('#p2');
        this.$p3 = $('#p3');
        this.$p4 = $('#p4');
        hocodo.afterInput();
        this.ifPartake();
        this.onePage();
        this.twoPage();
    },

    // 进入页面判断用户是否抽奖
    ifPartake: function ifPartake() {
        var that = this;
        if (!that.urlObj.openid) return layer.info('openid错误');
        hocodo.remote({
            url: that.hocodoUrl + '/index/faw_west/IsAward',
            data: {
                openid: that.urlObj.openid
            },
            success: function success(res) {
                if (res.code == 200) {
                    hocodo.BDTJ('进入首页');
                    that.$p1.render();
                } else if (res.code == 201) {
                    hocodo.BDTJ('进入重复中奖页');
                    that.$p4.render();
                    $("#p4 .already_yes_prize").show();
                    $("#p4 .yes_prize").hide();
                    $("#p4 .no_prize").hide();
                    $("#p4 .already_yes_prize .code_img img").attr('src', 'http://wandafilm.hocodo.com/service/test/qrcode.php?margin=1&text=' + res.data.code);
                    $("#p4 .already_yes_prize .code_number").text(res.data.code);
                } else if (res.code == 502) {
                    hocodo.BDTJ('进入未中奖页');
                    that.$p4.render();
                    $("#p4 .no_prize").show();
                    $("#p4 .yes_prize").hide();
                    $("#p4 .already_yes_prize").hide();
                } else {
                    layer.info(res.message);
                }
            }
        });
    },
    onePage: function onePage() {
        var that = this;
        $('#p1 .next_page').on('click', function () {
            if ($('#user_protocol').is(':checked')) {
                hocodo.BDTJ('点击我要参与');
                that.$p2.render();
            } else {
                layer.info('请阅读并勾选用户协议');
            }
        });
        $('#p1 .click_see').on('click', function () {
            hocodo.BDTJ('查看用户协议');
            $('#p1 .protocol').css("top", "0");
        });
        $('#p1 .protocol').on('touchend', function () {
            hocodo.BDTJ('关闭用户协议');
            $('#p1 .protocol').css("top", "100%");
        });
    },
    twoPage: function twoPage() {
        var urlObj = this.urlObj;
        var that = this;
        $('#p2 .code_btn').on('click', function () {
            var $this = $(this);
            if ($(this).text() == '获取验证码') {
                var phone = $("input[name='phone']").val();
                if (!/^1[345678]\d{9}$/.test(phone)) {
                    layer.info('请正确输入手机号');
                    return;
                }
                hocodo.BDTJ('点击获取验证码');
                hocodo.remote({
                    url: that.hocodoUrl + '/index/faw_west/sendMessage',
                    data: {
                        openid: that.urlObj.openid,
                        smscode: that.urlObj.smscode,
                        stamp: that.urlObj.stamp,
                        result: that.urlObj.result,
                        phone: phone,
                        cinemaID: that.urlObj.cinemaid
                    },
                    success: function success(res) {
                        if (res.code == 200) {
                            var s = 60;
                            $this.text(s + '秒');
                            $this.css("color", "red");
                            var interval = setInterval(function () {
                                s--;
                                $this.text(s + '秒');
                                if (s <= 0) {
                                    $this.text('获取验证码');
                                    $this.css("color", "#0000dd");
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        } else {
                            layer.info(res.msg);
                        }
                    }
                });
            } else {
                layer.info('请忽重复发送验证码');
            }
        });
        $('#p2 .submit_btn').on('click', function () {
            var data = $('#info').form2json();

            if (!data.name) return layer.info('请输入您的姓名');
            if (!/^1[345678]\d{9}$/.test(data.phone)) return layer.info('请正确输入手机号');
            if (!data.code) return layer.info('请输入您的验证码');

            data.cinemaID = urlObj.cinemaid;
            data.openid = urlObj.openid;
            data.smscode = urlObj.smscode;
            data.stamp = urlObj.stamp;
            data.result = urlObj.result;

            hocodo.BDTJ('点击报名参与');
            hocodo.remote({
                url: that.hocodoUrl + '/index/faw_west/reward',
                data: data,
                success: function success(res) {
                    if (res.code == 200) {
                        hocodo.BDTJ('用户中奖');
                        that.$p3.render();
                        layer.loading();
                        setTimeout(function () {
                            that.$p4.render();
                            $("#p4 .yes_prize").show();
                            $("#p4 .already_yes_prize").hide();
                            $("#p4 .no_prize").hide();
                            $("#p4 .yes_prize .code_img img").attr('src', 'http://wandafilm.hocodo.com/service/test/qrcode.php?margin=1&text=' + res.data.code);
                            $("#p4 .yes_prize .code_number").text(res.data.code);
                            layer.closeAll();
                        }, 2000);
                    } else if (res.code == 502) {
                        hocodo.BDTJ('用户未中奖');
                        that.$p3.render();
                        layer.loading();
                        setTimeout(function () {
                            that.$p4.render();
                            $("#p4 .no_prize").show();
                            $("#p4 .yes_prize").hide();
                            $("#p4 .already_yes_prize").hide();
                            layer.closeAll();
                        }, 2000);
                    } else {
                        layer.info(res.msg);
                    }
                }
            });
        });
    }
};
$(function () {
    daZhong.init();
});