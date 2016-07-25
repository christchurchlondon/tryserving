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

MX.IframeBox = MX.Object3D.extend({

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
              c.el.innerHTML = "<iframe src='" + ops.texture[i] + "' width='100%' height='100%' style='pointer-events: none;'>"
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

