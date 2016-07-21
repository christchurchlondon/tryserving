var scene, cam, skybox, controls, spinner;

var mobile = 'DeviceOrientationEvent' in window && 'ontouchstart' in window && window.screen.width <= 1024
var is_portrait = window.innerWidth < window.innerHeight
var is_ios6 = (navigator.userAgent.match(/iPhone OS 6/i))
var is_android = (navigator.userAgent.match(/Android/i))
var is_ipad = (navigator.userAgent.match(/iPad/i))

function clamp(n,a,b) { return Math.min(Math.max(n,a),b) }

var firstTime = true

var index = 0;
var order = "desktop".split(" ")
var url_prefix = 'http://s3.amazonaws.com/okfocus/pano/officee/'
// if (mobile) url_prefix += '';
var cubes = {
  'desktop': {
    title: "OKFocus",
    prefix: url_prefix,
    texture: [
//       'panotest3cubic0004.jpg',
//       'panotest3cubic0005.jpg',
//       'panotest3cubic0003.jpg',
//       'panotest3cubic0001.jpg',
//       'panotest3cubic0000.jpg',
//       'panotest3cubic0002.jpg',
//       'panotest4cubic0004.jpg',
//       'panotest4cubic0005.jpg',
//       'panotest4cubic0001.jpg',
//       'panotest4cubic0003.jpg',
//       'panotest4cubic0000.jpg',
//       'panotest4cubic0002.jpg',

//       'windows0004.jpg',
//       'windows0005.jpg',
//       'windows0003.jpg',
//       'windows0001.jpg',
//       'windows0000.jpg',
//       'windows0002.jpg',

//       'windows0004.jpg',
//       'windows0005.jpg',
//       'windows0003.jpg',
//       'windows0001.jpg',
//       'windows0000.jpg',
//       'windows0002.jpg',

//       'windows20004.jpg',
//       'windows20005.jpg',
//       'windows20003.jpg',
//       'windows20001.jpg',
//       'windows20000.jpg',
//       'windows20002.jpg'

//      'officebg0004.png',
//      'officebg0005.png',
//      'officebg0001.png',
//      'officebg0003.png',
//      'officebg0000.png',
//      'officebg0002.png',

      'office4.png',
      'office5.png',
      'office1.png',
      'office3.png',
      'office0.png',
      'office2.png',

    ],
    textTexture: [
      'blank.png',
      'officetextleft0005.png',
      'officetextleft0001.png',
      'officetextleft0003.png',
      'officetextleft0000.png',
      'officetextleft0002.png'
    ],
    text2Texture: [
      'blank.png',
      'blank.png',
      // use this order if you build the pano, then flip the faces
//      'officetextright0001.png',
//      'officetextright0003.png',
//      'officetextright0000.png',
//      'officetextright0002.png'

      // use this order if you flip the pano, then build the faces
      'newtext-2014b0003.png',
      'newtext-2014b0001.png',
      'newtext-2014b0000.png',
      'newtext-2014b0002.png',
    ],
    rotationX: 3,
    rotationY: -40,
    lowerBoundX: -60,
    upperBoundX: 60,
    perspective: 550,
    artist: false
  },

  'mobile': {
    title: "OKFocus",
    prefix: url_prefix,
    texture: [
      'windows0004.png',
      'windows0005.png',
      'windows0003.png',
      'windows0001.png',
      'windows0000.png',
      'windows0002.png'
    ],
    rotationX: 3,
    rotationY: -40,
    lowerBoundX: -60,
    upperBoundX: 60,
    perspective: 550,
    artist: false
  }

}

function init () {
  if (mobile) {
    $("html").addClass("mobile");
  }
  else {
    $("html").addClass("desktop");
  }
  
//   document.body.className = "pano";
  $("body,html").nodoubletapzoom()
  scene = new MX.Scene().addTo('#pano-rapper')
  scene.width = window.innerWidth
  scene.height = window.innerHeight
  scene.perspective = 750
  window.onresize = function () {
    scene.width = window.innerWidth
    scene.height = window.innerHeight
  }
  bind()
  if (mobile || $.browser.mozilla) {
    load('mobile')
  }
  else {
    load('desktop')
  }
  animate()
  // spin()
}

function load (name) {
  cube = cubes[name]
  if (spinner) spinner.stop()
  spinner = new Spinner(spinOpts).spin(scene.el);
  var overlap = mobile ? 0 : 3 // overlap 1px to eliminate seams
  var side = 1500 - overlap;
  var textSide = 750 - overlap;

  if (skybox) {
    scene.remove(skybox);
    skybox.cancel()
    skybox.removeElement();
  }

  if (mobile || $.browser.mozilla) {
    skybox = new MX.TexturedBox({
      width: side,
      height: side,
      depth: side,
      classname: 'cubeface',
      texture: cube.texture,
      prefix: cube.prefix,
      overlap: overlap,
      onLoad: function(){
        spinner.stop()
        setTimeout(function(){
          focus(cube)
          fadein()
        }, 0)
      }
    })

  }
  else {
    skybox = new MX.TexturedBox({
      width: side,
      height: side,
      depth: side,
      classname: 'cubeface',
      texture: cube.texture,
      prefix: cube.prefix,
      overlap: overlap,
      onLoad: function(){
        spinner.stop()
        setTimeout(function(){
          focus(cube)
          fadein()
        }, 0)
      }
    })
    skybox.rotationY = 90

    textbox = new MX.TexturedBox({
      width: textSide,
      height: textSide,
      depth: textSide,
      classname: 'cubeface',
      texture: cube.textTexture,
      prefix: cube.prefix,
      overlap: 0,
    })
  
    textbox2 = new MX.TexturedBox({
      width: textSide-10,
      height: textSide-10,
      depth: textSide-10,
      classname: 'cubeface',
      texture: cube.text2Texture,
      prefix: cube.prefix,
      overlap: 0,
    })
    scene.add(textbox)
    scene.add(textbox2)
  }
  
  cube.prefix = ""
  skybox.el.style.opacity = 0.0
  scene.add(skybox)

  if (mobile && is_portrait) {
    if (is_ipad) {
      scene.perspective = cube.perspective;
    }
    else {
      scene.perspective = cube.perspective; // * 1/2;
    }
  }
  else if (mobile && is_ipad) {
    scene.perspective = cube.perspective * 1.4;
    // controls.upperBoundX = MX.toRad(cube.upperBoundX + 20) || 0.0001
    // controls.lowerBoundX = MX.toRad(cube.lowerBoundX - 20) || 0.0001
  }
  else if (mobile) {
    scene.perspective = cube.perspective;
    // controls.upperBoundX = MX.toRad(cube.upperBoundX + 20) || 0.0001
    // controls.lowerBoundX = MX.toRad(cube.lowerBoundX - 20) || 0.0001
  }
  else {
    scene.perspective = cube.perspective;
    // controls.upperBoundX = MX.toRad(cube.upperBoundX) || 0.0001
    // controls.lowerBoundX = MX.toRad(cube.lowerBoundX) || 0.0001
  }
  controls.upperBoundX = MX.toRad(cube.upperBoundX) || 0.0001
  controls.lowerBoundX = MX.toRad(cube.lowerBoundX) || 0.0001
  // document.getElementById("pano-title").innerHTML = cube.title
}

function bind () {
  if (mobile) {
    controls = bind_mobile()
  }
  else {
    controls = bind_desktop()
  }
  var click_event = mobile ? "tap" : "click";
}

function bind_mobile () {
  controls = new MX.GyroRotationControl()
  controls.init()
  return controls
}

function bind_desktop () {
  controls = new MX.RotationControl()
  controls.sensitivity = .15
  controls.ease = 12
  controls.upperBoundX = 0.001 // Math.PI / 4
  controls.lowerBoundX = 0.001 // -Math.PI / 4
  controls.init(scene.camera)
  return controls
}

function animate () {
  requestAnimationFrame(animate)
  TWEEN.update()
  if (! (mobile || $.browser.mozilla) ) {
    textbox.rotationY += MX.toRad(1/60);
    textbox2.rotationY -= MX.toRad(1/60);
  }
  skybox.rotationY += MX.toRad(1/120);
  controls.update()
  scene.update()
}

function focus (cube) {
  scene.camera.rotationX = 0
  scene.camera.rotationY = 0

  if (!firstTime) {
    scene.camera.rotationX = controls.rotationX = MX.toRad(cube.rotationX)
    scene.camera.rotationY = controls.rotationY = MX.toRad(cube.rotationY)
    return;
  }

  firstTime = true

  controls.lock()
  scene.camera.rotationY = MX.toRad(cube.rotationY + 270)
  scene.update()
  new TWEEN.Tween(scene.camera)
    .to({
      rotationX: MX.toRad(cube.rotationX),
      rotationY: MX.toRad(cube.rotationY)
    }, 1500)
    .easing(TWEEN.Easing.Exponential.Out)
    .onComplete(function () {
      scene.camera.rotationX = controls.rotationX = MX.toRad(cube.rotationX)
      scene.camera.rotationY = controls.rotationY = MX.toRad(cube.rotationY)
      controls.unlock()
      if (mobile) checkMode()
    })
    .start()
}
function fadein () {
  new TWEEN.Tween(skybox.el.style)
    .to({
      opacity: 1.0
    }, 800)
    .easing(TWEEN.Easing.Linear.None)
    .start()
}

function spin (cube) {
  controls.lock()
  new TWEEN.Tween(skybox)
    .to({
      rotationY: Math.PI * 2 * 2.6
    }, 3000)
    .easing(TWEEN.Easing.Exponential.InOut)
    .onComplete(function () {
      controls.unlock()
      if (mobile) checkMode()
    })
    .start()
}
var zoomed = false, zooming = false;
function zoom () {
  zoomed = true;
  zooming = true;
  var from = {}
  var trans = {};
  from[ MX.perspectiveProp ] = scene.perspective;
  trans[ MX.perspectiveProp ] = 1280;
  new TWEEN.Tween(from)
    .to(trans, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function(){
      scene.el.style[MX.perspectiveProp] = from[MX.perspectiveProp] + "px"
    })
    .onComplete(function(){
      zooming = false;
    })
    .start()
}
function unzoom () {
  zoomed = false;
  zooming = true;
  var from = {}
  var trans = {};
  from[ MX.perspectiveProp ] = 1280;
  trans[ MX.perspectiveProp ] = scene.perspective;
  new TWEEN.Tween(from)
    .to(trans, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function(){
      scene.el.style[MX.perspectiveProp] = from[MX.perspectiveProp] + "px"
    })
    .onComplete(function(){
      zooming = false;
    })
    .start()
}
$(window).keydown(function(e){
  if (e.keyCode == 32) { // SPACE
    if (zooming) return;
    if (zoomed) unzoom();
    else zoom();
  }
})

function log () {
  var str = '',
    l = arguments.length
  for (var i = 0; i < l; i++) {
    str += arguments[i] + ((i === l - 1) ? '' : ', ')
  }
  document.getElementById('log').textContent = str
}

function checkMode () {
  is_portrait = window.innerWidth < window.innerHeight
  if (is_portrait) {
    lastAlpha = 0
    // alert('please use landscape mode')
    // controls.lock()
  } else {
    // controls.unlock()
  }
}



/*
window.addEventListener("load",function() {
  if (! document.getElementById("pano-rapper")) return;
  init()

//   setTimeout(function(){
//     window.scrollTo(0, 0);
//   }, 0);
}, false);
*/

$.browser = (function( ua ) {
  ua = ua.toLowerCase();
  var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
    [];
  var matched = {
    browser: match[ 1 ] || "",
    version: match[ 2 ] || "0"
  };
  browser = {};
  if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
  }
  // Chrome is Webkit, but Webkit is also Safari.
  if ( browser.chrome ) {
    browser.webkit = true;
  } else if ( browser.webkit ) {
    browser.safari = true;
  }
  $.browser = browser;
  return browser;
})( navigator.userAgent );

$(function(){
  $('.top.nav a').okhover({
    fadeIn: true,
    fadeOut: true,
    fadeInDuration: 200,
    el: '#backgroundz'
  });
});
