
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
