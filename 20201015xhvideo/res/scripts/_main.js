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
        cover: 'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5756e35285890807743979838/coverBySnapshot/coverBySnapshot_10_0.jpg'
    },
    "s1_2": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a5757205285890807743979853/vMUJNf9pJb8A.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5757205285890807743979853/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf3349965285890811709718747/NR0PYeI9ZQYA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf3349965285890811709718747/coverBySnapshot_10_0.jpg"
    },
    "s1_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db0d65285890807749653164/A8GdUUxHT7gA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db0d65285890807749653164/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e914f58b5285890811710175729/nDoOcgsaXwYA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e914f58b5285890811710175729/coverBySnapshot_10_0.jpg"
    },

    "s2_1": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575abd5285890807743979904/IaH81JoTBoUA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575abd5285890807743979904/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeace5285890811710069874/iPdsOGqIFM8A.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeace5285890811710069874/coverBySnapshot_10_0.jpg"
    },
    "s2_2": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575ae05285890807743979916/fbhIQKOXP4kA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575ae05285890807743979916/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334d725285890811709718815/qIApxg3QdUwA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334d725285890811709718815/coverBySnapshot_10_0.jpg"

    },
    "s2_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a575b425285890807743979945/0s9EWO6JxfAA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575b425285890807743979945/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/e6afeb105285890811710069894/baxOCTOtRHoA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeb105285890811710069894/coverBySnapshot_10_0.jpg"
    },

    "s3_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db5185285890807749653265/IxAL7t2VHwEA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db5185285890807749653265/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s3_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db57e5285890807749653298/5yEvrFg7GggA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db57e5285890807749653298/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },

    "s3_4": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010db8f35285890807749653332/IWVT6xwzhzoA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db8f35285890807749653332/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334db65285890811709718837/jVokfCA8u9EA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334db65285890811709718837/coverBySnapshot_10_0.jpg"
    },
    "s3_5": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a645e545285890807743980066/eOqCkvi8SDQA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a645e545285890807743980066/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },

    "s4_1": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010dbcd65285890807749653407/ulnhQW4oWacA.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbcd65285890807749653407/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e135285890811709718861/ZbZYZWBtRGkA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e135285890811709718861/coverBySnapshot_10_0.jpg"
    },
    "s4_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a64620c5285890807743980121/hwZAUu1wXDgA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a64620c5285890807743980121/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s4_3": {
        //mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/010dbd955285890807749653460/Q481mQzh0O4A.mp4",
        //cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbd955285890807749653460/coverBySnapshot/coverBySnapshot_10_0.jpg"
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bf334e795285890811709718894/pdEL19vOVboA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e795285890811709718894/coverBySnapshot_10_0.jpg"
    },
    "s5_1": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/3a6466105285890807743980206/RJnolWJLiAgA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a6466105285890807743980206/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s5_2": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd685285890807750507412/iMCOiAQiaWYA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd685285890807750507412/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s5_3": {
        mp4: "http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/35d5fd8c5285890807750507425/sFD4RRe416wA.mp4",
        cover: "http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd8c5285890807750507425/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    // 新的
    "s6_1":{
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdea9565285890811709619666/4adk5GgeJEsA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdea9565285890811709619666/coverBySnapshot_10_0.jpg"
    },
    "s6_1_1":{
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c4122e0d5285890811709945331/BlG0qX4ymlcA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e0d5285890811709945331/coverBySnapshot_10_0.jpg"
    },
    "s6_1_2":{
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c412322c5285890811709945420/2eAqk3lUvNkA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c412322c5285890811709945420/coverBySnapshot_10_0.jpg"
    },
    "s6_2_1":{
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/c4122e725285890811709945363/paIibfcQqZgA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e725285890811709945363/coverBySnapshot_10_0.jpg"
    },
    "s6_2_2":{
        mp4:"http://1254086875.vod2.myqcloud.com/e0e86a70vodcq1254086875/bcdbe6af5285890811709614529/NZuM8lPZulIA.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdbe6af5285890811709614529/coverBySnapshot_10_0.jpg"
    }
}
var krpano; var vkrpo; var step = 0;
function playVideo(status){
    var jscall = '';
    var video;
    if(status == 'ended'){
        if(scene == 's1'){
            
        }
    }
    if(jscall.length>0){
        krpano.call(jscall)
    }
}
var loaded = 0;
var timeline = new TimelineMax({
    paused:true,
    onComplete(){
        setTimeout(function(){
            krpano.call('initview();')

        },500)
        timeline = null;
        setTimeout(function(){
            var tl = new TimelineMax({
                onComplete(){
                    $('#index').remove();
                }
            });
            tl.to($('#index'), 1, {alpha:0, ease: Power0.easeNone})
        },3000)
    }
});

var $el,$go,$title,$sub,$tag;
var sceneLoaded;


$(()=>{
    $('#btns').click(function(){
        $('#title').html('');
        LoadScene('tour');
    })
    $('#gyro').click(function(){
        $(this).toggleClass('active')
        var jscall = 'set(plugin["gyro2"].enabled,'+(!$(this).hasClass('active')?'false':'true')+');';
        krpano.call(jscall)
        vkrpo.call(jscall)
    })
    $('#night').click(function(){
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            krpano.call('loadscene(night, null, MERGE);');
        }else{
            krpano.call('loadscene(day, null, MERGE);');
        }
        var jscall = ''
        for(var i=1;i<10;i++){
            jscall+='set(hotspot["poi'+i+'2"].visible, true);';
        }
        krpano.call(jscall);
    })
    var imgs = [
        'res/images/light_1.png',
        'res/images/light_2.png',
        'res/images/subtitle.png',
        'res/images/title.png'
    ]

    // 加载
    var loader = new PIXI.Loader();
    loader.onProgress.add(function(e){
        var progress = Math.round(e.progress);
        $('.progress .bar div').css({width:progress+'%'});
        $('.progress span').text(progress+'%');
    });
    loader.onComplete.add(function(){
        $('#loading').remove();
        imgs.map(a=>{
            var img = new Image();
            img.onload = function(e){
                if(this.src.indexOf('bg.jpg')!=-1){
                    $('#index .bg').css({
                        'background-image':'url('+this.src+')'
                    })
                }
                loaded++;
                if(loaded == imgs.length){
                    loadComplete();
                }
            }
            img.src = a;
        });
    })
    loader.add([
        'res/images/360_rotate.png'+ver,
        'res/images/gyro.png'+ver,
        'res/images/gyro_active.png'+ver,
        'res/images/light_1.png'+ver,
        'res/images/light_2.png'+ver,
        'res/images/loadbar.png'+ver,
        'res/images/loading.png'+ver,
        'res/images/logo.png'+ver,
        'res/images/share.jpg'+ver,
        'res/images/t_1.png'+ver,
        'res/images/t_2.png'+ver,
        'res/images/t_chaoshi.png'+ver,
        'res/images/t_cunwei.png'+ver,
        'res/images/t_mogu.png'+ver,
        'res/images/t_nongjia.png'+ver,
        'res/images/t_xiaochi.png'+ver,
        'res/images/t_xitai.png'+ver,
        'res/images/title.png'+ver,
        'res/images/xhlogo.png'+ver,
        'res/images/tips.png'+ver,
        'res/images/day.png'+ver,
        'res/images/night.png'+ver,
        'images/chaoshi.png'+ver,
        'images/cunweihui.png'+ver,
        'images/erhaoyuan.png'+ver,
        'images/mogu.png'+ver,
        'images/nongjiayuan.png'+ver,
        'images/spot6_gif.png'+ver,
        'images/xiaochijie.png'+ver,
        'images/xitai.png'+ver,
        'images/yihaoyuan.png'+ver,
        'images/new.png'+ver,
        'images/fuwuzhongx.png'+ver,
        'images/nongcun.png'+ver,
        'images/jinru_fuwuzhongx.png'+ver,
        'images/jinru_nongcun.png'+ver,
        'res/scripts/jquery.min.js',
        'res/scripts/rem.750.js',
        'res/scripts/TweenMax.js',
        'tour.js'+ver,
        'res/scripts/config.js'+ver,
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5756e35285890807743979838/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf3349965285890811709718747/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e914f58b5285890811710175729/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeace5285890811710069874/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334d725285890811709718815/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/e6afeb105285890811710069894/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db5185285890807749653265/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db57e5285890807749653298/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334db65285890811709718837/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a645e545285890807743980066/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e135285890811709718861/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a64620c5285890807743980121/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bf334e795285890811709718894/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd685285890807750507412/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd8c5285890807750507425/coverBySnapshot/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdea9565285890811709619666/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e0d5285890811709945331/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c412322c5285890811709945420/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/c4122e725285890811709945363/coverBySnapshot_10_0.jpg',
        'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/bcdbe6af5285890811709614529/coverBySnapshot_10_0.jpg'
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
    ])
    loader.load();

    function loadComplete(){
        embedpano(
            {swf:"tour.swf", xml:"tour.xml?r=23", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,
            onready:function(r){
                krpano = r;
                krpano.call('loadscene(day, null, MERGE);');
            }
        });
        embedpano(
            {swf:"tour.swf", xml:"video.xml?r=23", target:"video", html5:"auto", mobilescale:1.0, passQueryParameters:true,
            onready:function(r){
                vkrpo = r;
            }
        });
        $('#index').append($('#html').html());
        $el = $('#index'),
        $title = $('.title', $el),
        $sub = $('.sub', $el),
        $tag = $('.logo', $el);
        
        timeline.fromTo($title, 1, {y:100,scale:1.5,alpha:0}, {y:0,scale:1, alpha:1, ease: Power0.easeNone}, .3)
        timeline.fromTo($sub, 1, {y:-30,alpha:0}, {y:0, alpha:1})
        timeline.fromTo($tag, 1, {y:60,alpha:0}, {y:0, alpha:1}, .8)
        
    }
})

var isfirst = true;
function firstSceneLoaded(){
    if(!isfirst){
        return;
    }else{
        isfirst = false;
        krpano.call('skin_view_littleplanet();')
        setTimeout(()=>{
            krpano.call('normalview();')
        },0)
        return;
    }
}
function onVideoEnded(){
    $('#zimu').empty()
}
function loadZimu(time){
    var zm = zmList[scene];
    if(time>0&&zm){
        var text="";
        for(var i=0;i<zm.length;i++){
            if(zm[i].start<=time && zm[i].end>=time){
                text = zm[i].text;
                break;
            }
        }
        if(text.length>0){
            text = text.split("：");
            text = "<div style='padding-left:"+(text[0].length+1)+"em;'><span><b>"+text[0] + "：</b><i>"+text[0] + "：</i></span>" + "<p><b>"+text[1]+"</b><i>"+text[1]+"</i></p></div>";
            if(window.lastText!=text){
                window.lastText = text;
                $('#zimu').html(text);
            }
        }
    }
}
function loadRenwu(time){
    $('#btns').addClass('on');
    $('#night').removeClass('on');
    if(time!=""){
        var personal = personalList[scene];
        if(!personal) personal = personalList[scene.substr(0,3)]
        if(personal){
            $('#renwu').html(personal.join('<br/>'));
            window.renwuTimer = setTimeout(function(){
                $('#renwu').addClass('on');
                window.renwuTimer = setTimeout(function(){
                    $('#renwu').removeClass('on');
                }, 5000);
            }, time)
        }
        var tit = titleConfig[scene];
        if(!tit) tit = titleConfig[scene.substr(0,3)]
        if(tit){
            $('#title').html('<img src="res/images/'+tit+'.png"/>')
        }else{
            $('#title').empty();
        }
    }
}
var isS23;
function LoadScene(s, fromHome){
    console.log(s)
    var v = videos[s];
    var a = vkrpo.get('plugin[video]');
    a.pause();
    $('#renwu').html('');
    $('#zimu').html("");
    $('#btns').removeClass('on');
    $('#night').addClass('on');
    window.renwuTimer && clearTimeout(window.renwuTimer)
    scene = s || 'day';
    isS23 = scene == 's2_3';
    $('#next').removeClass('on');
    $('#next').off('click').on('click', function(){
        $(this).removeClass('on');
        var name = scene
        var next;
        if(name.indexOf('s1_')!=-1){
            next = 's2_1';
        }else if(name.indexOf('s2_')!=-1){
            next = 's3_4';
        }else if(name == 's3_4'){
            next = 's3_2'
        }else if(name == 's3_2'){
            next = 's3_5'
        }else if(name == 's3_5'){
            next = 's4_1'
        }else if(name.indexOf('s4_')!=-1){
            next = 's3_1'
        }else if(name == 's3_1'){
            next = 's5_1'
        }else{
            next = 's1_1'
        }
        LoadScene(next);
    })
    if(v){
        window.s13timer&&clearTimeout(window.s13timer)
        vkrpo.get('hotspot').getArray().map(a=>{
            a.visible = false;
        })
        var poi = {
            's1_1':[19,3.7,130, ['s1_1']],
            's1_2':[0,0,130, ['s1_2']],
            's1_3':[78.7,3.25,130],
            's2_1':[0,0,130, ['s2_1']],
            's2_2':[0,0,130],
            's2_3':[26,4.68,130],
            's3_1':[0,0,130],
            's3_2':[-2.29,-4.35,100, ['s3_2_new','s2_3_new']],
            's3_3':[0,0,130],
            's3_4':[-10.8,4.8,130],
            's3_5':[0,0,130],
            's4_1':[0,0,130, ['s4_1','s4_1_2']],
            's4_3':[23,9.8,130],
            's5_1':[31.7,22,130, ['s5_1','s5_1_2']],
            's5_2':[0,0,130],
            's5_3':[0,0,130],
            's6_1':[0,0,130, ['s6_1_1', 's6_2_1']],
            's6_1_1':[0,0,130, ['s6_1_2']],
            's6_1_2':[0,0,130],
            's6_2_1':[0,0,130, ['s6_2_2']],
            's6_2_2':[0,0,130]
        }[scene];
        var jscall = '';
        jscall+='set(view.hlookat,'+poi[0]+');'
        jscall+='set(view.vlookat,'+poi[1]+');'
        jscall+='set(view.fov,'+poi[2]+');'
        
        if(poi[3]){
            poi[3].map(a=>{
                jscall+='set(hotspot['+a+'].visible, true);'
                jscall+='set(hotspot['+a+'2].visible, true);'
            });
        }

        if(scene == 's5_1'){
            jscall+='set(hotspot["s5_1"].ath, 32.5);';
            jscall+='set(hotspot["s5_1"].atv, -6.5);';

            jscall+='set(hotspot["s5_12"].ath, 32.5);';
            jscall+='set(hotspot["s5_12"].atv, -2.5);';

            jscall+='set(hotspot["s5_1_2"].ath, 6);';
            jscall+='set(hotspot["s5_1_2"].atv, 6);';

            jscall+='set(hotspot["s5_1_22"].ath, 6);';
            jscall+='set(hotspot["s5_1_22"].atv, 10);';
        }
        vkrpo.call(jscall);
        a.enabled = true;
        a.posterurl = v.cover;
        a.videourl = v.mp4;
        a.playvideo(v.mp4, v.cover, false);
        a.onvideoready = function(){
            test("ready")
        }
    }else{
        a.playvideo("","", true);
        a.enabled = false;
        $('#pano').addClass('on');
        $('#video').removeClass('on');
    }

}
var fn;
function test(state){
    if(state === 'ready'){
        var a = vkrpo.get('plugin[video]');
        fn = 'removeClass';
        if(['s1_3','s2_2','s3_1','s3_2','s3_4','s3_5','s4_3','s5_2','s5_3'].indexOf(scene)!=-1){
            fn = 'addClass';
        }
        a.videoDOM.removeEventListener("timeupdate", null, false);
        a.videoDOM.addEventListener("timeupdate", function(){
            if(!this.paused)loadZimu(this.currentTime);
            if(isS23&&this.currentTime>3.5){
                isS23 = false;
                vkrpo.call(`set(hotspot[s2_3].visible, true);set(hotspot[s2_32].visible, true);`);
            }
            if(fn == 'addClass'&&this.currentTime>=this.duration-5){
                fn = null;
                $('#next').addClass('on');
            }
        }, false);
        $('#zimu').removeClass('on');
    }else if(state === 'play'){
        var a = vkrpo.get('plugin[video]');
        loadRenwu(a.renderrenwu)
        $('#zimu').addClass('on');
        $('#pano').removeClass('on');
        $('#video').addClass('on');
        window.s13timer&&clearTimeout(window.s13timer)
        if(scene=='s1_3'){
            window.s13timer=setTimeout(function(){
                if(scene=='s1_3'){
                    var t = 'tween(view.hlookat, -34, .8, linear);tween(view.vlookat, 8.7, .8, linear)';
                    vkrpo.call(t);
                }
            }, 2200)
        }else if(scene =='s5_1'){
            window.s13timer=setTimeout(function(){
                if(scene=='s5_1'){
                    var t = '';
                    t+='tween(hotspot["s5_1"].ath, 45.9, 13, linear);';
                    t+='tween(hotspot["s5_1"].atv, -4.5, 13, linear);';

                    t+='tween(hotspot["s5_12"].ath, 45.9, 13, linear);';
                    t+='tween(hotspot["s5_12"].atv, -0.5, 13, linear);';

                    t+='tween(hotspot["s5_1_2"].ath, 3, 13, linear);';
                    t+='tween(hotspot["s5_1_2"].atv, 32.8, 13, linear);';

                    t+='tween(hotspot["s5_1_22"].ath, 3, 13, linear);';
                    t+='tween(hotspot["s5_1_22"].atv, 36.8, 13, linear);';
                    vkrpo.call(t);
                }
            }, 2200)
        }
    }else{
        $('#zimu').empty()
    }
}


function startNormalView(){
    if(sceneLoaded){
        return;
    }
    setTimeout(function(){
        timeline.play();
        setTimeout(function(){
            var i = 0;
            $('i', $el).each(function(){
                i++;
                let animation = `an-show 1s linear ${(i+ 0.5)/3}s infinite alternate`
                $(this).css({
                    'animation':animation,
                    '-webkit-animation':animation
                })
            });
        }, 500)
    }, 500)
    // $('#index').remove();
}
function endNormalView(){
    if(sceneLoaded){
        return;
    }
    sceneLoaded = 1;
    var jscall = ''
    for(var i=1;i<10;i++){
        jscall+='set(hotspot["poi'+i+'2"].visible, true);';
    }
    krpano.call(jscall);
    $('#gyro').addClass('on');
    $('#night').addClass('on');
    
    if(!window.firstLoaded){
        window.firstLoaded = true;
        $('#tips_mtk').addClass("on");
        $('#tips_mtk').click(()=>{
            $('#tips_mtk').removeClass("on");
            $('.tips').addClass('show');
            setTimeout(function(){
                $('.tips').remove();
            },2500)
        })
    }
}

function onSceneLoaded(){
    if(!scene||scene == 'back'){
        $('#btns').removeClass('on');
        $('#night').addClass('on');
    }else{
        $('#btns').addClass('on');
        $('#night').removeClass('on');
    }
}