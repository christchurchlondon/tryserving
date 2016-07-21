var scene, cam, skybox, controls, spinner;

var mobile = 'DeviceOrientationEvent' in window && 'ontouchstart' in window && window.screen.width <= 1024
var is_portrait = window.innerWidth < window.innerHeight
var is_ios6 = (navigator.userAgent.match(/iPhone OS 6/i))
var is_android = (navigator.userAgent.match(/Android/i))
var is_ipad = (navigator.userAgent.match(/iPad/i))

function clamp(n,a,b) { return Math.min(Math.max(n,a),b) }

var firstTime = true

var index = 0;
var order = "panotest3cubic".split(" ")
var url_prefix = 'https://s3.amazonaws.com/okfocus/pano/office/'
// if (mobile) url_prefix += '';
var box1_speed = 7/720 
var box2_speed = -11/720 / 4
var cubes = {
  'panotest3cubic': {
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

      "http://okfoc.us/office/pano/img/dust750.gif",
      "http://okfoc.us/office/pano/img/dust750.gif",
      "http://okfoc.us/office/pano/img/dust750.gif",
      "http://okfoc.us/office/pano/img/dust750.gif",
      "http://okfoc.us/office/pano/img/dust750.gif",
      "http://okfoc.us/office/pano/img/dust750.gif",
    ],
    textTexture: [
      "http://csh.bz/canvas/01/27.html",
      "http://csh.bz/canvas/01/27.html",
      "http://csh.bz/canvas/01/27.html",
      "http://csh.bz/canvas/01/27.html",
      "http://csh.bz/canvas/01/27.html",
      "http://csh.bz/canvas/01/27.html"
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
	$('body').click(function(){
		$('.message').fadeOut('slow');
  });

  if(mobile) {
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
  load(order[0])
  animate()
  // spin()
}

function load (name) {
  cube = cubes[name]
  if (spinner) spinner.stop()
//   spinner = new Spinner(spinOpts).spin(scene.el);
  var overlap = 0 // mobile ? 1 : 3 // overlap 1px to eliminate seams
//  var side = (mobile ? 1000 : 2000) - overlap;
  var side = 1000 - overlap;
  var textSide = 750;
  if (skybox) {
    scene.remove(skybox);
    skybox.cancel()
    skybox.removeElement();
  }
  skybox = new MX.IframeBox({
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

        if (mobile) {
          setTimeout(function(){
            $('.message').fadeOut('slow');
          }, 1200);
        }

      }, 0)
    }
  })

  textbox = new MX.IframeBox({
    width: textSide,
    height: textSide,
    depth: textSide,
    classname: 'cubeface',
    texture: cube.textTexture,
    prefix: '',
    overlap: overlap,
  })

//   textbox2 = new MX.IframeBox({
//     width: 2000,
//     height: 2000,
//     depth: 2000,
//     classname: 'cubeface',
//     texture: cube.textTexture,
//     prefix: '',
//     overlap: overlap,
//   })
//   textbox2.rotationY = 40
  
  cube.prefix = ""
//   skybox.el.style.opacity = 0.0
//   scene.add(skybox)
  scene.add(textbox)
//   scene.add(textbox2)

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
  textbox.rotationY += MX.toRad(box1_speed);
//   textbox2.rotationY += MX.toRad(box2_speed);

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
document.body.style.background = "#000"
return

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

var zoomed = false, zooming = false, zoom_perspective = 1200;
function zoom () {
  zoomed = true;
  zooming = true;
  var from = {}
  var trans = {};
  from[ MX.perspectiveProp ] = scene.perspective;
  trans[ MX.perspectiveProp ] = zoom_perspective;
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
  from[ MX.perspectiveProp ] = zoom_perspective;
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


