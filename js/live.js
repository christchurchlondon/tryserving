/* okfocus 2013 internet legends ~ https://github.com/okfocus/okfocus.github.io */

var Loader = Loader || (function(){
  function Loader (readyCallback){
    this.assets = {};
    this.images = [];
    this.readyCallback = readyCallback;
  }

  // Register an asset as loading
  Loader.prototype.register = function(s){
    this.assets[s] = false;
  }

  // Signal that an asset has loaded
  Loader.prototype.ready = function(s){
    window.debug && console.log("ready >> " + s);

    this.assets[s] = true;
    if (this.loaded) return;
    if (! this.isReady()) return;

    this.loaded = true;
    this.readyCallback && this.readyCallback();
  }

  // (boolean) Is the loader ready?
  Loader.prototype.isReady = function(){
    for (var s in this.assets) {
      if (this.assets.hasOwnProperty(s) && this.assets[s] != true) {
        return false;
      }
    }
    return true;
  }

  // (int) Number of assets remaining
  Loader.prototype.remainingAssets = function(){
    var n = 0;
    for (var s in this.assets) {
      if (this.assets.hasOwnProperty(s) && this.assets[s] != true) {
        n++;
        console.log('remaining: ' + s);
      }
    }
    return n;
  }

  // Preload the images in config.images
  Loader.prototype.preloadImages = function(images){
    this.register("preload");
    for (var i = 0; i < images.length; i++) {
      this.preloadImage(images[i]);
    }
    this.ready("preload");
  }
  Loader.prototype.preloadImage = function(src){
    var _this = this;
    this.register(src);
    var img = new Image();  
    img.onload = function(){
      _this.ready(src);
    }
    img.src = src;
    if (img.complete) img.onload();
    _this.images.push(img);
  }

  return Loader;
})();
// tween.js - http://github.com/sole/tween.js
'use strict';var TWEEN=TWEEN||function(){var a=[];return{REVISION:"7",getAll:function(){return a},removeAll:function(){a=[]},add:function(c){a.push(c)},remove:function(c){c=a.indexOf(c);-1!==c&&a.splice(c,1)},update:function(c){if(0===a.length)return!1;for(var b=0,d=a.length,c=void 0!==c?c:Date.now();b<d;)a[b].update(c)?b++:(a.splice(b,1),d--);return!0}}}();
TWEEN.Tween=function(a){var c={},b={},d=1E3,e=0,f=null,h=TWEEN.Easing.Linear.None,r=TWEEN.Interpolation.Linear,k=[],l=null,m=!1,n=null,p=null;this.to=function(a,c){null!==c&&(d=c);b=a;return this};this.start=function(d){TWEEN.add(this);m=!1;f=void 0!==d?d:Date.now();f+=e;for(var g in b)if(null!==a[g]){if(b[g]instanceof Array){if(0===b[g].length)continue;b[g]=[a[g]].concat(b[g])}c[g]=a[g]}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(a){e=a;return this};this.easing=
function(a){h=a;return this};this.interpolation=function(a){r=a;return this};this.chain=function(){k=arguments;return this};this.onStart=function(a){l=a;return this};this.onUpdate=function(a){n=a;return this};this.onComplete=function(a){p=a;return this};this.update=function(e){if(e<f)return!0;!1===m&&(null!==l&&l.call(a),m=!0);var g=(e-f)/d,g=1<g?1:g,i=h(g),j;for(j in c){var s=c[j],q=b[j];a[j]=q instanceof Array?r(q,i):s+(q-s)*i}null!==n&&n.call(a,i);if(1==g){null!==p&&p.call(a);g=0;for(i=k.length;g<
i;g++)k[g].start(e);return!1}return!0}};
TWEEN.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return 1>(a*=2)?0.5*a*a:-0.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a:0.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a:-0.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*
a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a*a:0.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return 0.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:1>(a*=2)?0.5*Math.pow(1024,a-1):0.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-
Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return-(b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4))},Out:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return b*Math.pow(2,-10*a)*Math.sin((a-c)*
2*Math.PI/0.4)+1},InOut:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return 1>(a*=2)?-0.5*b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4):0.5*b*Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4)+1}},Back:{In:function(a){return a*a*(2.70158*a-1.70158)},Out:function(a){return--a*a*(2.70158*a+1.70158)+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*(3.5949095*a-2.5949095):0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)}},Bounce:{In:function(a){return 1-
TWEEN.Easing.Bounce.Out(1-a)},Out:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},InOut:function(a){return 0.5>a?0.5*TWEEN.Easing.Bounce.In(2*a):0.5*TWEEN.Easing.Bounce.Out(2*a-1)+0.5}}};
TWEEN.Interpolation={Linear:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),f=TWEEN.Interpolation.Utils.Linear;return 0>c?f(a[0],a[1],d):1<c?f(a[b],a[b-1],b-d):f(a[e],a[e+1>b?b:e+1],d-e)},Bezier:function(a,c){var b=0,d=a.length-1,e=Math.pow,f=TWEEN.Interpolation.Utils.Bernstein,h;for(h=0;h<=d;h++)b+=e(1-c,d-h)*e(c,h)*a[h]*f(d,h);return b},CatmullRom:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),f=TWEEN.Interpolation.Utils.CatmullRom;return a[0]===a[b]?(0>c&&(e=Math.floor(d=b*(1+c))),f(a[(e-
1+b)%b],a[e],a[(e+1)%b],a[(e+2)%b],d-e)):0>c?a[0]-(f(a[0],a[0],a[1],a[1],-d)-a[0]):1<c?a[b]-(f(a[b],a[b],a[b-1],a[b-1],d-b)-a[b]):f(a[e?e-1:0],a[e],a[b<e+1?b:e+1],a[b<e+2?b:e+2],d-e)},Utils:{Linear:function(a,c,b){return(c-a)*b+a},Bernstein:function(a,c){var b=TWEEN.Interpolation.Utils.Factorial;return b(a)/b(c)/b(a-c)},Factorial:function(){var a=[1];return function(c){var b=1,d;if(a[c])return a[c];for(d=c;1<d;d--)b*=d;return a[c]=b}}(),CatmullRom:function(a,c,b,d,e){var a=0.5*(b-a),d=0.5*(d-c),f=
e*e;return(2*c-2*b+a+d)*e*f+(-3*c+3*b-2*a-d)*f+a*e+c}}};
(function($) {
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap
 
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
    return this;
  };
})(jQuery);//fgnass.github.com/spin.js#v1.3.2

/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));
/**
 * Copyright (C) 2013 by Evan You
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MX = MX || (function (undefined) {

    var MX = {
        version: '0.1.0',
        prefix: undefined,
        rotationUnit: 'rad'
    }

    var floatPrecision = 5

    // ========================================================================
    //  Setup & Compatibility
    // ========================================================================

    var transformProp,
        transitionProp,
        transformOriginProp,
        transformStyleProp,
        perspectiveProp,
        transitionEndEvent

    var positionAtCenter = true, // whether to auto center objects
        centeringCSS // styles to inject for center positioning

    document.addEventListener('DOMContentLoaded', setup)

    function setup () {

        // sniff prefix

        var s = document.body.style

        MX.prefix =
            'webkitTransform' in s ? 'webkit' :
            'mozTransform' in s ? 'moz' :
            'msTransform' in s ? 'ms' : ''
            
        transformProp       = MX.transformProp       = addPrefix('transform')
        transitionProp      = MX.transitionProp      = addPrefix('transition')
        transformOriginProp = MX.transformOriginProp = addPrefix('transformOrigin')
        transformStyleProp  = MX.transformStyleProp  = addPrefix('transformStyle')
        perspectiveProp     = MX.perspectiveProp     = addPrefix('perspective')
        transitionEndEvent  = MX.transitionEndEvent  = MX.prefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend'

        // shiv rAF

        var vendors = ['webkit', 'moz', 'ms']
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
            window.cancelAnimationFrame =
              window[vendors[x]+'CancelAnimationFrame'] ||
              window[vendors[x]+'CancelRequestAnimationFrame']
        }

        // inject centering css

        centeringCSS = document.createElement('style')
        centeringCSS.type = 'text/css'
        centeringCSS.innerHTML =
            '.mx-object3d {'
            + 'position: absolute;'
            + 'top: 50%;'
            + 'left: 50%;}'
        injectCenteringCSS()
    }

    function injectCenteringCSS () {
        document.head.appendChild(centeringCSS)
    }

    function removeCenteringCSS () {
        document.head.removeChild(centeringCSS)
    }

    // ========================================================================
    //  Utils
    // ========================================================================

    function toDeg (rad) {
        return rad / Math.PI * 180
    }

    function toRad (deg) {
        return deg / 180 * Math.PI
    }

    function buildRotationTranslation (obj) {

        // used when rotationOrigin is set

        var origin = obj.rotationOrigin
        if (!origin) {
            return
        } else {
            var dx = origin.x - obj.x,
                dy = -(origin.y - obj.y),
                dz = -(origin.z - obj.z)
            return {
                before: 'translate3d(' + dx +'px,' + dy + 'px,' + dz + 'px) ',
                after: 'translate3d(' + (-dx) + 'px,' + (-dy) + 'px,' + (-dz) + 'px) '
            }
        }
    }

    function addPrefix (string) {
        if (MX.prefix) {
            string = MX.prefix + string.charAt(0).toUpperCase() + string.slice(1)
        }
        return string
    }

    // ========================================================================
    //  Base Object3D
    // ========================================================================

    function Object3D (el) {

        this.setupDomElement(el)
        this.setCSSTransformStyle('preserve-3d')
        this.el.classList.add('mx-object3d')

        this.parent         = undefined
        this.children       = []
        this.updateChildren = true

        this.inverseLookAt  = false

        this.reset()

        var width, height,
            self = this

        Object.defineProperty(this, 'width', {
            get: function () {
                return width
                    || parseInt(self.el.style.width, 10)
                    || 0
            },
            set: function (val) {
                width = val
                this.el.style.width = width + 'px'
            }
        })

        Object.defineProperty(this, 'height', {
            get: function () {
                return height
                    || parseInt(self.el.style.height, 10)
                    || 0
            },
            set: function (val) {
                height = val
                this.el.style.height = height + 'px'
            }
        })
    }

    Object3D.prototype = {

        constructor: Object3D,

        reset: function () {
            this.x = this.__x                       = 0
            this.y = this.__y                       = 0
            this.z = this.__z                       = 0
            this.rotationX = this.__rotationX       = 0
            this.rotationY = this.__rotationY       = 0
            this.rotationZ = this.__rotationZ       = 0
            this.scaleX = this.__scaleX             = 1
            this.scaleY = this.__scaleY             = 1
            this.scaleZ = this.__scaleZ             = 1
            this.scale = this.__scale               = 1
            this.perspective = this.__perspective   = 0
            this.rotationOrigin                     = undefined
            this.followTarget                       = undefined
            this.dirty                              = true
            this.update()
        },

        setupDomElement: function (el) {
            this.el = undefined
            if (el instanceof HTMLElement) {
                this.el = el
            } else if (typeof el === 'string') {
                var tag     = el.match(/^[^.#\s]*/)[1],
                    id      = el.match(/#[^.#\s]*/),
                    classes = el.match(/\.[^.#\s]*/g)
                this.el = document.createElement(tag || 'div')
                if (id) {
                    this.el.id = id[0].slice(1)
                }
                if (classes) {
                    var i = classes.length
                    while (i--) {
                        this.el.classList.add(classes[i].slice(1))
                    }
                }
            } else {
                this.el = document.createElement('div')
            }
        },

        update: function () {

            if (this.updateChildren) {
                var i = this.children.length
                while (i--) {
                    this.children[i].update()
                }
            }

            if (this.followTarget) {
                this.lookAt(this.followTarget, false)
            }

            if (this.scaleX !== this.__scaleX ||
                this.scaleY !== this.__scaleY ||
                this.scaleZ !== this.__scaleZ) {
                    this.__scaleX = this.scaleX
                    this.__scaleY = this.scaleY
                    this.__scaleZ = this.scaleZ
                    this.dirty = true
            }

            if (this.scale !== this.__scale) {
                this.scaleX =
                this.scaleY =
                this.scaleZ =
                this.__scaleX =
                this.__scaleY =
                this.__scaleZ =
                this.__scale =
                    this.scale
                this.dirty = true
            }

            if (this.rotationX !== this.__rotationX ||
                this.rotationY !== this.__rotationY ||
                this.rotationZ !== this.__rotationZ) {
                    this.__rotationX = this.rotationX
                    this.__rotationY = this.rotationY
                    this.__rotationZ = this.rotationZ
                    this.dirty = true
            }

            if (this.x !== this.__x ||
                this.y !== this.__y ||
                this.z !== this.__z) {
                this.__x = this.x
                this.__y = this.y
                this.__z = this.z
                this.dirty = true
            }

            if (this.perspective !== this.__perspective) {
                this.__perspective = this.perspective
                this.dirty = true
            }

            if (this.dirty && this.el) {

                var rotationTranslation = buildRotationTranslation(this),
                    rotation = 'rotateX(' + this.rotationX.toFixed(floatPrecision) + MX.rotationUnit + ') '
                        + 'rotateY(' + this.rotationY.toFixed(floatPrecision) + MX.rotationUnit + ') '
                        + 'rotateZ(' + this.rotationZ.toFixed(floatPrecision) + MX.rotationUnit + ') '

                var transformString =
                    (MX.positionAtCenter ? 'translate3d(-50%, -50%, 0) ' : '')
                    + (this.perspective ? 'perspective(' + this.perspective + 'px) ' : '')
                    + 'translate3d('
                        + this.x.toFixed(floatPrecision) + 'px,'
                        + (-this.y).toFixed(floatPrecision) + 'px,'
                        + (-this.z).toFixed(floatPrecision) + 'px) '
                    + 'scale3d('
                        + this.scaleX.toFixed(floatPrecision) + ','
                        + this.scaleY.toFixed(floatPrecision) + ','
                        + this.scaleZ.toFixed(floatPrecision) + ') '

                if (rotationTranslation) {
                    transformString += rotationTranslation.before
                        + rotation
                        + rotationTranslation.after

                } else {
                    transformString += rotation
                }
                    
                this.el.style[transformProp] = transformString
                this.dirty = false
            }

            return this

        },

        lookAt: function (target, update) {
            var r = this.getLookAtEuler(target)
            this.setRotation(r)
            if (update !== false) this.update()
            return this
        },

        getLookAtEuler: function (target) {
            // euler order XYZ
            var r = {},
                dx = target.x - this.x,
                dy = target.y - this.y,
                dz = target.z - this.z
            if (this.inverseLookAt) {
                dx = -dx
                dy = -dy
                dz = -dz
            }
            if (dz === 0) dz = 0.001
            r.x = -Math.atan2(dy, dz)
            var flip = dz > 0 ? 1 : -1
            r.y = flip * Math.atan2(dx * Math.cos(r.x), dz * -flip)
            r.z = Math.atan2(Math.cos(r.x), Math.sin(r.x) * Math.sin(r.y)) - Math.PI / 2
            if (MX.rotationUnit === 'deg') {
                r.x = toDeg(r.x)
                r.y = toDeg(r.y)
                r.z = toDeg(r.z)
            }
            return r
        },

        add: function () {
            if (!this.el) return
            var parent = this
            Array.prototype.forEach.call(arguments, function (child) {
                if (!child instanceof Object3D) return
                parent.el.appendChild(child.el)
                if (!parent.children) parent.children = []
                parent.children.push(child)
                child.parent = parent
            })
            return this
        },

        remove: function () {
            var parent = this
            Array.prototype.forEach.call(arguments, function (child) {
                var index = parent.children.indexOf(child)
                if (index !== -1) {
                    parent.children.splice(index, 1)
                    child.parent = undefined
                }
            })
            return this
        },

        addTo: function (target) {
            if (typeof target === 'string') {
                target = document.querySelector(target)
            }
            if (target instanceof HTMLElement && target.appendChild) {
                target.appendChild(this.el)
            } else if (target instanceof Object3D || target instanceof Scene) {
                target.add(this)
            }
            return this
        },

        removeElement: function () {
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el)
            }
        },

        setPosition: function (tar) {
            this.x = (tar.x || tar.x === 0) ? tar.x : this.x
            this.y = (tar.y || tar.y === 0) ? tar.y : this.y
            this.z = (tar.z || tar.z === 0) ? tar.z : this.z
        },

        setRotation: function (tar) {
            this.rotationX = (tar.x || tar.x === 0) ? tar.x : this.rotationX
            this.rotationY = (tar.y || tar.y === 0) ? tar.y : this.rotationY
            this.rotationZ = (tar.z || tar.z === 0) ? tar.z : this.rotationZ
        },

        setScale: function (tar) {
            this.scaleX = (tar.x || tar.x === 0) ? tar.x : this.scaleX
            this.scaleY = (tar.y || tar.y === 0) ? tar.y : this.scaleY
            this.scaleZ = (tar.z || tar.z === 0) ? tar.z : this.scaleZ
        },

        setCSSTransformOrigin: function (origin) {
            this.el && (this.el.style[transformOriginProp] = origin)
            return this
        },

        setCSSTransformStyle: function (style) {
            this.el && (this.el.style[transformStyleProp] = style)
            return this
        },

        setCSSTransition: function (trans) {
            this.el && (this.el.style[transitionProp] = trans)
            return this
        },

        setCSSPerspective: function (pers) {
            this.el && (this.el.style[perspectiveProp] = pers)
            return this
        },

        onTransitionEnd: function (callback) {
            this.cancelTransitionEnd()
            var el = this.el
            el.addEventListener(transitionEndEvent, onEnd)
            function onEnd () {
                el.removeEventListener(transitionEndEvent, onEnd)
                callback()
            }
        },

        cancelTransitionEnd: function () {
            this.el.removeEventListener(transitionEndEvent)
        }

    }

    // ========================================================================
    //  Inheritance
    // ========================================================================

    Object3D.extend = extend.bind(Object3D)

    function extend (props) {
        var Super = this
        var ExtendedObject3D = function () {
                Super.call(this)
                props.init && props.init.apply(this, arguments)
            }
        ExtendedObject3D.prototype = Object.create(Super.prototype)
        for (var prop in props) {
            if (props.hasOwnProperty(prop) && prop !== 'init') {
                ExtendedObject3D.prototype[prop] = props[prop]
            }
        }
        ExtendedObject3D.extend = extend.bind(ExtendedObject3D)
        return ExtendedObject3D
    }

    // ========================================================================
    //  Expose API
    // ========================================================================

    MX.Object3D = Object3D
    MX.toRad = toRad
    MX.toDeg = toDeg

    // center positioning getter setter
    Object.defineProperty(MX, 'positionAtCenter', {
        get: function () {
            return positionAtCenter
        },
        set: function (val) {
            if (typeof val !== 'boolean') return
            positionAtCenter = val
            if (positionAtCenter) {
                injectCenteringCSS()
            } else {
                removeCenteringCSS()
            }
        }
    })

    return MX

})()

MX.GyroRotationControl = function () {

  var locked = false,
      lastAlpha

  return {
    rotationX: 0,
    rotationY: 0,

    init: function () {

      window.addEventListener('orientationchange', checkMode)

      var rotationSum = 0;
      var rotationMedian = 0;
      var orientationMax = 0;
      var samples = 0;
      var sampleThreshold = 120;

      window.addEventListener("devicemotion", function(e) {
        if (! is_portrait) return;          
        var rotationBeta = e.rotationRate.alpha; // weird!
        rotationSum += rotationBeta;
        samples += 1;
      }, false);

      window.addEventListener('deviceorientation', function (e) {
        if (!lastAlpha) {
          lastAlpha = e.alpha
        }

        var dx = 0, dy = 0;
        
        if (is_portrait) {
        
          // compass gives most accurate orientation in portrait mode
          var alpha;
          if (e.webkitCompassHeading) {
            alpha = 180 - e.webkitCompassHeading;
          }
          else {
            alpha = 180 - e.alpha;
          }
          
          // android rotates in reverse
          if (is_android) {
            alpha = 360 - alpha
          }
          
          // use rotationRate to gauge if we've tilted the screen past vertical
          // for looking at ceiling
          if (e.beta > orientationMax) {
            orientationMax = e.beta
            rotationMedian = rotationSum
          }
          
          // this number was only going to 83 max.. not 90.. weird
          var beta = e.beta + 7;
          
          // if we've got enough motion data, we should be able to determine
          // if we've tilted backwards. otherwise, lock to the horizon.
          if (!is_android && samples > sampleThreshold) {
            dx = rotationSum > rotationMedian ? e.beta - 90 : 90 - e.beta;
          }
          else {
            dx = 0;
          }
          
          // avoid jumping around in a circle
          if (Math.abs(alpha - lastAlpha) < 100 || Math.abs(alpha - lastAlpha) > 300) {
            dy = alpha - lastAlpha
            lastAlpha = alpha
          }

          // avoid jumping around in a circle #2
          if (dy > 300) {
            dy -= 360
          } else if (dy < -300) {
            dy += 360
          }

          controls.rotationX = clamp( MX.toRad(dx), controls.lowerBoundX, controls.upperBoundX )
          controls.rotationY += MX.toRad(dy)
        }
        else {
          dx = e.gamma > 0 ? 90 - e.gamma : 90 + e.gamma
          dy = e.alpha - lastAlpha
          lastAlpha = e.alpha

          // avoid the sudden jump from 0 to -360
          if (dy > 300) {
            dy -= 360
          } else if (dy < -300) {
            dy += 360
          }

          controls.rotationX = clamp( MX.toRad(dx), controls.lowerBoundX, controls.upperBoundX ),
          controls.rotationY += MX.toRad(dy)

        }

        //controls.rotationX += MX.toRad(-dx)
        //log(e.gamma.toFixed(0), e.beta.toFixed(0), e.alpha.toFixed(0))
      })
      document.addEventListener('touchmove', function (e) {
        e.preventDefault()
      })
    },

    update: function () {
      if (locked) return
      var c = scene.camera
      c.rotationX += (this.rotationX - c.rotationX) / 6
      c.rotationY += (this.rotationY - c.rotationY) / 6
    },

    lock: function () {
      locked = true
    },

    unlock: function () {
      locked = false
    }
  }

}
// Usage:
//
//   var control = new MX.RotationControl()
//   control.init( object{MX.Object3D} [, listener{HTMLElement}] )
//
// In animation loop:
//
//   control.update() 
//
// The above code will register handler functions on `listener`
// and will be updating `object`s rotationX and rotationY
// If no `listener` is provided, will default to `object`s el.

MX.RotationControl = function () {

    var object,
        locked      = false

    var down        = false,
        active      = false,
        lastX,
        lastY

    var pointerLockPrefix =
            'pointerLockElement' in document ? '' :
            'mozPointerLockElement' in document ? 'moz' :
            'webkitPointerLockElement' in document ? 'webkit' : null,
        hasPointerLock = !(pointerLockPrefix === null)
        pointerLockEnabled = false

    var pub = {

        sensitivity : .5,
        ease        : 10,
        drag        : true,

        inverseX    : false,
        inverseY    : false,

        disableX    : false,
        disableY    : false,

        rotationX   : 0,
        rotationY   : 0,

        upperBoundX : undefined,
        lowerBoundX : undefined,
        
        upperBoundY : undefined,
        lowerBoundY : undefined,

        usePreset: function (name) {
            var ops = presets[name]
            if (ops) {
                if (currentPreset && presets[currentPreset].teardown) {
                    presets[currentPreset].teardown()
                }
                for (var op in ops) {
                    if (op !== 'setup' && op !== 'teardown') {
                        pub[op] = ops[op]
                    }
                }
                if (op.setup) ops.setup()
            }
        }
    }

    var currentPreset
    var presets = {
        firstPerson: {
            drag: false,
            ease: 2,
            sensitivity: .18,
            inverseX: true,
            inverseY: true,
            upperBoundX: MX.rotationUnit === 'deg' ? 90 : Math.PI / 2,
            lowerBoundX: MX.rotationUnit === 'deg' ? -90 : -Math.PI / 2
        },
        skybox: {
            sensitivity: .18,
            inverseX: true,
            inverseY: true,
            upperBoundX: MX.rotationUnit === 'deg' ? 90 : Math.PI / 2,
            lowerBoundX: MX.rotationUnit === 'deg' ? -90 : -Math.PI / 2
        }
    }

    function init (obj, lis) {
        if (active) return

        object = obj
        pub.rotationX = object.rotationX
        pub.rotationY = object.rotationY

        if (lis instanceof HTMLElement) {
            listener = lis
        } else if (lis instanceof MX.Object3D) {
            listener = lis.el
        } else {
            listener = window.document
        }

        listener.addEventListener('mousedown', onDown)
        listener.addEventListener('mousemove', onMove)
        listener.addEventListener('mouseup', onUp)
        listener.addEventListener('touchstart', onDown)
        listener.addEventListener('touchmove', onMove)
        listener.addEventListener('touchend', onUp)

        active = true
    }

    function changeObject (obj) {
        object = obj
        pub.rotationX = object.rotationX
        pub.rotationY = object.rotationY
    }

    function changeListener (lis) {
        remove()
        active = false
        init(object, lis)
        if (pointerLockEnabled) {
            initPointerLock()
        }
    }

    function remove () {
        if (!active) return
        listener.removeEventListener('mousedown', onDown)
        listener.removeEventListener('mousemove', onMove)
        listener.removeEventListener('mouseup', onUp)
        listener.removeEventListener('touchstart', onDown)
        listener.removeEventListener('touchmove', onMove)
        listener.removeEventListener('touchend', onUp)

        if (hasPointerLock) {
            document.removeEventListener(pointerLockPrefix + 'pointerlockchange', onPointerLockChange)
            document.removeEventListener('mousemove', onPointerLockMove)
            document.body[pointerLockPrefix + (pointerLockPrefix ? 'E' : 'e') + 'xitPointerLock']()
        }
        active = false
    }

    function onDown (e) {
        e = normalizeEvent(e)
        if (!e) return
        e.preventDefault()
        down = true
        lastX = e.pageX
        lastY = e.pageY
    }

    function onMove (e) {
        e.preventDefault()
//         if (e.type = 'touchmove') {
//         }
        if (pub.drag && !down) return
        e = normalizeEvent(e)
        if (!e) return
        lastX = lastX || e.pageX
        lastY = lastY || e.pageY
        var dx = e.pageX - lastX,
            dy = e.pageY - lastY
        lastX = e.pageX
        lastY = e.pageY
        updateTarget(dx, dy)
    }

    function onUp (e) {
        e.preventDefault()
        down = false
    }

    function initPointerLock () {

        if (pointerLockEnabled) return

        document.addEventListener(pointerLockPrefix + 'pointerlockchange', onPointerLockChange)
        document.addEventListener('mousemove', onPointerLockMove)

        document.body[pointerLockPrefix + (pointerLockPrefix ? 'R' : 'r') + 'equestPointerLock']()
    }

    function onPointerLockChange () {
        var el = document.body
        if (document[pointerLockPrefix + (pointerLockPrefix ? 'P' : 'p') + 'ointerLockElement'] === el) {
            pointerLockEnabled = true
        } else {
            pointerLockEnabled = false
        }
    }

    function onPointerLockMove (e) {
        if (!pointerLockEnabled) return
        var dx = e[pointerLockPrefix + (pointerLockPrefix ? 'M' : 'm') + 'ovementX'],
            dy = e[pointerLockPrefix + (pointerLockPrefix ? 'M' : 'm') + 'ovementY']
        updateTarget(dx, dy)
    }

    function normalizeEvent (e) {
        if (e.touches) {
            return e.touches.length > 1 ? false : e.touches[0]
        } else {
            return e
        }
    }

    function updateTarget (dx, dy) {
        if (pub.inverseX) dx = -dx
        if (pub.inverseY) dy = -dy
        if (MX.rotationUnit !== 'deg') {
            dx = MX.toRad(dx)
            dy = MX.toRad(dy)
        }

        if (!pub.disableX) {
            pub.rotationX -= dy * pub.sensitivity
            if (pub.upperBoundX) pub.rotationX = Math.min(pub.rotationX, pub.upperBoundX)
            if (pub.lowerBoundX) pub.rotationX = Math.max(pub.rotationX, pub.lowerBoundX)
        }

        if (!pub.disableY) {
            pub.rotationY += dx * pub.sensitivity
            if (pub.upperBoundY) pub.rotationY = Math.min(pub.rotationY, pub.upperBoundY)
            if (pub.lowerBoundY) pub.rotationY = Math.max(pub.rotationY, pub.lowerBoundY)
        }
    }

    function update () {
        if (!object || locked) return
        var dx = pub.rotationX - object.rotationX,
            dy = pub.rotationY - object.rotationY
        if (Math.abs(dx) < 0.0001) {
            object.rotationX = pub.rotationX
        } else {
            object.rotationX += dx / pub.ease
        }
        if (Math.abs(dy) < 0.0001) {
            object.rotationY = pub.rotationY
        } else {
            object.rotationY += dy / pub.ease
        }
    }

    function lock () {
        locked = true
    }

    function unlock () {
        pub.rotationX = object.rotationX
        pub.rotationY = object.rotationY
        locked = false
    }

    pub.init            = init
    pub.remove          = remove
    pub.update          = update
    pub.lock            = lock
    pub.unlock          = unlock
    pub.initPointerLock = initPointerLock
    pub.changeObject    = changeObject
    pub.changeListener  = changeListener

    return pub

}
// Creates a box using a given texture image.
// Uses a texture image like this:
//
//             ---------- ----------
//            |          |          |
//            |   top    |  bottom  |
//            |          |          |
//  ---------- ---------- ---------- ----------
// |          |          |          |          |
// |   left   |  front   |  right   |   back   |
// |          |          |          |          |
//  ---------- ---------- ---------- ----------
//
// See `examples/images/skins/` for some minecraft skin examples.

// Options:
//
//   - {number} `width`
//   - {number} `height`
//   - {number} `depth`
//   - {string} `texture` path to texture image
//   - {string} `classname` class to be added to dom element

MX.TexturedBox = MX.Object3D.extend({

    init: function (ops) {

        if (!ops.width || !ops.height || !ops.depth || (!ops.texture && !ops.classname)) {
            console.warn('TextureBox: missing arguments')
            return
        }

        // faces
        var angle = MX.rotationUnit === 'deg' ? 90 : (Math.PI / 2),
            offsetX = ops.offset ? (ops.offset.x || 0) : 0,
            offsetY = ops.offset ? (ops.offset.y || 0) : 0,
            overlap = ops.overlap ? ops.overlap : 0
        var multiTexture = typeof ops.texture == "object";
        if (ops.prefix && multiTexture) {
          for (var i in ops.texture) {
            ops.texture[i] = ops.prefix + ops.texture[i]
          }
        }
        else if (ops.prefix) {
          ops.texture = ops.prefix + ops.texture
        }
        
        if (ops.onLoad) {
          this.loader = new Loader (ops.onLoad)
          this.loader.preloadImages( ops.texture )
        }

        var top = this.top = new MX.Object3D()
        top.width = ops.width
        top.height = ops.depth
        top.rotationX = angle
        top.y = ops.height / 2 - overlap
        if (!multiTexture)
          top.el.style.backgroundPosition =
              (-(offsetX + ops.depth) + 'px ') +
              (-offsetY + 'px')

        var bottom = this.bottom = new MX.Object3D()
        bottom.width = ops.width
        bottom.height = ops.depth
        bottom.rotationX = -angle
        bottom.y = -ops.height / 2 + overlap
        if (!multiTexture)
        bottom.el.style.backgroundPosition =
            (-(offsetX + ops.depth + ops.width) + 'px ') +
            (-offsetY + 'px')

        var left = this.left = new MX.Object3D()
        left.width = ops.depth
        left.height = ops.height
        left.rotationY = -angle
        left.x = -ops.width / 2 + overlap
        if (!multiTexture)
        left.el.style.backgroundPosition =
            (-offsetX + 'px ') +
            (-(offsetY + ops.depth) + 'px')

        var right = this.right = new MX.Object3D()
        right.width = ops.depth
        right.height = ops.height
        right.rotationY = angle
        right.x = ops.width / 2 - overlap
        if (!multiTexture)
        right.el.style.backgroundPosition =
            (-(offsetX + ops.depth + ops.width) + 'px ') +
            (-(offsetY + ops.depth) + 'px')

        var front = this.front = new MX.Object3D()
        front.width = ops.width
        front.height = ops.height
        front.z = -ops.depth / 2 + overlap
        if (!multiTexture)
        front.el.style.backgroundPosition =
            (-(offsetX + ops.depth) + 'px ') +
            (-(offsetY + ops.depth) + 'px')

        var back = this.back = new MX.Object3D()
        back.width = ops.width
        back.height = ops.height
        back.rotationY = angle * 2
        back.z = ops.depth / 2 - overlap
        if (!multiTexture)
        back.el.style.backgroundPosition =
            (-(offsetX + ops.depth * 2 + ops.width) + 'px ') +
            (-(offsetY + ops.depth) + 'px')

        this.add(top, bottom, left, right, front, back)

        this.children.forEach(function (c,i) {
            if (multiTexture) {
//                 c.el.style.backgroundImage = 'url(' + ops.texture[i] + ')'
              c.el.innerHTML = "<img src='" + ops.texture[i] + "' width='100%' height='100%'>"
            }
            else if (ops.texture) {
                c.el.style.backgroundImage = 'url(' + ops.texture + ')'
            }
            if (ops.classname) {
                c.el.classList.add(ops.classname)
            }
            c.el.style.backgroundRepeat = 'no-repeat'
        })

        this.update()
        this.updateChildren = false
    },
    
    cancel: function(){
      if (this.loader) this.loader.readyCallback = function(){}
    }

})
// NOTE
//
// This is not a fully functional 3d scene as you might expect.
// The camera can only do pitch (rotationX) and yaw (rotationY), but no roll (rotationZ)
// because I haven't implemented alternative euler orders or quaternions.
//
// For serious 3D scenes with more functionalities you should use
// THREE.js with CSS3D Renderer.

MX.Scene = (function () {

    var add = MX.Object3D.prototype.add,
        remove = MX.Object3D.prototype.remove

    function Scene () {

        this.el = document.createElement('div')
        this.el.classList.add('mx-scene')

        var s = this.el.style

        s[MX.transformProp] = 'preserve-3d'

        s.webkitPerspectiveOrigin = '50% 50%'
        s.mozPerspectiveOrigin = '50% 50%'
        s.perspectiveOrigin = '50% 50%'

        s.webkitUserSelect = 'none'
        s.mozUserSelect = 'none'
        s.userSelect = 'none'

        s.overflow = 'hidden'

        this.inner = new MX.Object3D().addTo(this.el)
        this.inner.el.style.width = '0'
        this.inner.el.style.height = '0'

        var self = this
        var width, height, perspective

        Object.defineProperty(this, 'width', {
            get: function () {
                return width
            },
            set: function (val) {
                width = val
                self.el.style.width = val + 'px'
            }
        })

        Object.defineProperty(this, 'height', {
            get: function () {
                return height
            },
            set: function (val) {
                height = val
                self.el.style.height = val + 'px'
            }
        })

        Object.defineProperty(this, 'perspective', {
            get: function () {
                return perspective
            },
            set: function (val) {
                perspective = val
                self.el.style[MX.perspectiveProp] = val + 'px'
                self.inner.z = -val - self.camera.z
                self.inner.rotationOrigin.z = -val
            }
        })

        var cam = this.camera = new MX.Object3D()
        cam.el = null

        // cam's lookAt is a bit different
        // ignoring rotationZ
        cam.getLookAtEuler = getCameraEuler.bind(cam)

        this.inner.rotationOrigin = { x:0, y:0, z:0 }

        this.perspective = 0
    }

    Scene.prototype = {

        constructor: Scene,

        add: function () {
            add.apply(this.inner, arguments)
            return this
        },

        remove: function () {
            remove.apply(this.inner, arguments)
            return this
        },

        addTo: function (target) {
            if (typeof target === 'string') {
                target = document.querySelector(target)
            }
            if (target instanceof HTMLElement && target.appendChild) {
                target.appendChild(this.el)
            } else {
                console.warn('You can only add a Scene to an HTML element.')
            }
            return this
        },

        update: function () {
            // update inner based on camera

            var i = this.inner,
                c = this.camera

            c.update()

            i.z = -this.perspective - c.z
            i.x = -c.x
            i.y = -c.y

            i.rotationX = -c.rotationX
            i.rotationY = -c.rotationY
            //i.rotationZ = -c.rotationZ

            i.update()
            return this
        }

    }

    function getCameraEuler (target) {
        var dx = target.x - this.x,
            dy = target.y - this.y,
            dz = target.z - this.z
            r = {}
        r.y = Math.atan2(-dx, dz)
        r.x = Math.atan2(-dy, Math.sqrt(dx*dx + dz*dz))
        r.z = 0
        if (MX.rotationUnit === 'deg') {
            r.x = MX.toDeg(r.x)
            r.y = MX.toDeg(r.y)
        }
        return r
    }

    return Scene

})()
var spinOpts = {
  lines: 7, // The number of lines to draw
  length: 10, // The length of each line
  width: 4, // The line thickness
  radius: 10, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1.2, // Rounds per second
  trail: 58, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};
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
var url_prefix = 'http://s3.amazonaws.com/okfocus/pano/office/'
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
//      'officetextright0001.png',
//      'officetextright0003.png',
//      'officetextright0000.png',
//      'officetextright0002.png'

      'newtext0001.png',
      'newtext0003.png',
      'newtext0000.png',
      'newtext0002.png'
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

