var resizeCallback = [];
$(function(){
    var screenchange = {
      width: 1280,//设计稿宽度
      height: 870,//设计稿高度
      resize: function () {
        var html = document.documentElement;
        var w = html.clientWidth, h = html.clientHeight;
        if (this.w != w || this.h != h) {
          var fz = '';
          if (h < w) {//横屏c
            console.log(w/h, this.width/ this.height)
            if (w / h > this.width / this.height) {
              console.log('1:', w / this.width * 100);
              fz = h / this.height * 100 ;
            } else {
              console.log('2:', w / this.width * 100);
              fz = w / this.width * 100
            }
            $("#body").removeClass('sscene').addClass('hscene')
            $('.wrap').css({
              "width": w,
              "height": h,
              "transform": "none",
            });
          } else {//竖屏
            console.log(w/h, this.width/ this.height)
            if (h / w > this.width / this.height) {
              console.log('3:', w / this.width * 100);
              fz = w / this.height * 100
            } else {
              console.log('4:', w / this.width * 100);
              fz = h / this.width * 100
            }
            $("#body").removeClass('hscene').addClass('sscene')
            $('.wrap').css({
              "width": h,
              "height": w,
              "transform": "rotate(90deg) translate(0,-" + w + "px)",
            });
          }
          document.documentElement.style.fontSize = fz+'px';
          this.w = w;
          this.h = h;
        }
      },
      set: null,
      fn: function () {
        var self = screenchange;
        clearTimeout(self.set);
        self.resize();
        self.set = setTimeout(function () {
          resizeCallback.map(function (f) {
            f();
          });
          self.resize();
        }, 300);
      },
      init: function () {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.fn, false);
        this.fn();
      }
    }
    screenchange.init();
})