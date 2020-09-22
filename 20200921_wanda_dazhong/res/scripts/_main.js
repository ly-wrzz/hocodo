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
    init(){
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
    ifPartake(){
        var that = this;
        if (!that.urlObj.openid) return layer.info('openid错误');
        hocodo.remote({
            url:that.hocodoUrl+'/index/faw_west/IsAward',
            data:{
                openid: that.urlObj.openid
            },
            success(res){
                if (res.code == 200) {
                    hocodo.BDTJ('进入首页');
                    that.$p1.render();
                }else if (res.code == 201) {
                    hocodo.BDTJ('进入重复中奖页');
                    that.$p4.render();
                    $("#p4 .already_yes_prize").show();
                    $("#p4 .yes_prize").hide();
                    $("#p4 .no_prize").hide();
                    $("#p4 .already_yes_prize .code_img img").attr('src','http://wandafilm.hocodo.com/service/test/qrcode.php?margin=1&text='+res.data.code);
                    $("#p4 .already_yes_prize .code_number").text(res.data.code);
                }else if (res.code == 502) {
                    hocodo.BDTJ('进入未中奖页');
                    that.$p4.render();
                    $("#p4 .no_prize").show();
                    $("#p4 .yes_prize").hide();
                    $("#p4 .already_yes_prize").hide();
                }else{
                    layer.info(res.msg);
                }
            }
        })
    },
    onePage(){
        var that = this;
        $('#p1 .next_page').on('click',function () {
            if ($('#user_protocol').is(':checked')) {
                hocodo.BDTJ('点击我要参与');
                that.$p2.render();
            }else {
                layer.info('请阅读并勾选用户协议');
            }
        });
        $('#p1 .click_see').on('click',function () {
            hocodo.BDTJ('查看用户协议');
            $('#p1 .protocol').css("top","0");
        });
        $('#p1 .protocol').on('touchend',function () {
            hocodo.BDTJ('关闭用户协议');
            $('#p1 .protocol').css("top","100%");
        });
    },
    twoPage(){
        var urlObj = this.urlObj;
        var that = this;
        $('#p2 .code_btn').on('click',function () {
            var $this = $(this);
            if ($(this).text() == '获取验证码') {
                var phone = $("input[name='phone']").val();
                if (!(/^1[345678]\d{9}$/.test(phone))) {
                    layer.info('请正确输入手机号');
                    return;
                }
                hocodo.BDTJ('点击获取验证码');
                hocodo.remote({
                    url: that.hocodoUrl+'/index/faw_west/sendMessage',
                    data:{
                        openid: that.urlObj.openid,
                        smscode: that.urlObj.smscode,
                        stamp: that.urlObj.stamp,
                        result: that.urlObj.result,
                        phone,
                        cinemaID: that.urlObj.cinemaid
                    },
                    success(res){
                        if (res.code == 200) {
                            var s = 60;
                            $this.text(s+'秒');
                            $this.css("color", "red");
                            var interval = setInterval(()=>{
                                s--;
                                $this.text(s+'秒');
                                if (s <= 0) {
                                    $this.text('获取验证码');
                                    $this.css("color", "#0000dd");
                                    window.clearInterval(interval);
                                }
                            },1000);
                        }else {
                            layer.info(res.msg);
                        }
                    }
                })
            }else {
                layer.info('请忽重复发送验证码');
            }
        });
        $('#p2 .submit_btn').on('click',function () {
            var data = $('#info').form2json();

            if (!data.name) return layer.info('请输入您的姓名');
            if (!(/^1[345678]\d{9}$/.test(data.phone))) return layer.info('请正确输入手机号');
            if (!data.code) return layer.info('请输入您的验证码');

            data.cinemaID = urlObj.cinemaid;
            data.openid = urlObj.openid;
            data.smscode = urlObj.smscode;
            data.stamp = urlObj.stamp;
            data.result = urlObj.result;
            
            hocodo.BDTJ('点击报名参与');
            hocodo.remote({
                url: that.hocodoUrl+'/index/faw_west/reward',
                data: data,
                success(res){
                    if (res.code == 200) {
                        hocodo.BDTJ('用户中奖');
                        that.$p3.render();
                        layer.loading();
                        setTimeout(()=>{
                            that.$p4.render();
                            $("#p4 .yes_prize").show();
                            $("#p4 .already_yes_prize").hide();
                            $("#p4 .no_prize").hide();
                            $("#p4 .yes_prize .code_img img").attr('src','http://wandafilm.hocodo.com/service/test/qrcode.php?margin=1&text='+res.data.code);
                            $("#p4 .yes_prize .code_number").text(res.data.code);
                            layer.closeAll();
                        },3000)
                    }else if (res.code == 502) {
                        hocodo.BDTJ('用户未中奖');
                        that.$p3.render();
                        layer.loading();
                        setTimeout(()=>{
                            that.$p4.render();
                            $("#p4 .no_prize").show();
                            $("#p4 .yes_prize").hide();
                            $("#p4 .already_yes_prize").hide();
                            layer.closeAll();
                        },2000)
                    }else {
                        layer.info(res.msg);
                    }
                }
            })
        });
    }
};
$(()=>{
    daZhong.init();
});