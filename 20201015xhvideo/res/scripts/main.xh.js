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
    "s1_1":{
        mp4:'https://h5.zhongguowangshi.com/h5/m1/allVideo/video5/video5.mp4',
        cover:'http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5756e35285890807743979838/coverBySnapshot/coverBySnapshot_10_0.jpg'
    },
    "s1_2":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video6/video6.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a5757205285890807743979853/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s1_3":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video7/video7.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db0d65285890807749653164/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },

    "s2_1":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video8/video8.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575abd5285890807743979904/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s2_2":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video10/video10.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575ae05285890807743979916/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s2_3":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video9/video9.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a575b425285890807743979945/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    

    "s3_1":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video11/video11.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db5185285890807749653265/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s3_2":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video12/video12.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db57e5285890807749653298/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },

    "s3_4":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video14/video14.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010db8f35285890807749653332/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s3_5":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video4/video4.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a645e545285890807743980066/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    
    "s4_1":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video15/video15.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbcd65285890807749653407/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s4_2":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video11/video11.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a64620c5285890807743980121/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s4_3":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video16/video16.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/010dbd955285890807749653460/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s5_1":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video1/video1.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/3a6466105285890807743980206/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s5_2":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video2/video2.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd685285890807750507412/coverBySnapshot/coverBySnapshot_10_0.jpg"
    },
    "s5_3":{
        mp4:"https://h5.zhongguowangshi.com/h5/m1/allVideo/video3/video3.mp4",
        cover:"http://1254086875.vod2.myqcloud.com/b7d25818vodtranscq1254086875/35d5fd8c5285890807750507425/coverBySnapshot/coverBySnapshot_10_0.jpg"
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

    var imgs = [
        'res/images/light_1.png',
        'res/images/light_2.png',
        'res/images/subtitle.png',
        'res/images/title.png'
    ]

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
    var v = videos[s];
    var a = vkrpo.get('plugin[video]');
    a.pause();
    $('#renwu').html('');
    $('#zimu').html("");
    $('#btns').removeClass('on')
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
            's3_2':[-2.29,-4.35,100],
            's3_3':[0,0,130],
            's3_4':[-10.8,4.8,130],
            's3_5':[0,0,130],
            's4_1':[0,0,130, ['s4_1','s4_1_2']],
            's4_3':[23,9.8,130],
            's5_1':[31.7,22,130, ['s5_1','s5_1_2']],
            's5_2':[0,0,130],
            's5_3':[0,0,130]
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
    for(var i=1;i<9;i++){
        jscall+='set(hotspot["poi'+i+'"].visible, true);';
        jscall+='set(hotspot["poi'+i+'2"].visible, true);';
    }
    krpano.call(jscall);
    $('#gyro').addClass('on')
}

function onSceneLoaded(){
    if(!scene||scene == 'back'){
        $('#btns').removeClass('on');
    }else{
        $('#btns').addClass('on');
    }
}