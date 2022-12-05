let predictions = []
let capture = null
let colorCapture = []
let centerValues = null

//
// SETTINGS
//

let settings = {
  resolution: {
    x: 640,
    y: 480,
  },
  faceOffset: {
    x: 150,
    y: 150,
  },
  boundaries: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
  wireframe: {
    color: 255,
    size: 1.5,
  },
}

let flags = {
  firstCapture: true,
  firstMesh: true,
}

//
// CAPTURE
//

const toCapture = (_p) => {
  _p.setup = () => {
    _p.createCanvas(settings.resolution.x, settings.resolution.y)
  }

  _p.draw = () => {
    if (predictions[0] && flags.firstCapture) {
      let mesh = predictions[0].scaledMesh

      mesh.forEach((_points, _index) => {
        const [x, y] = _points
        colorCapture[_index] = _p.get(x, y)
      })

      // flags.firstCapture = false
    }

    _p.image(capture, 0, 0)
  }
}

new p5(toCapture, 'capture')

//c
// FACE
//

const face = (_p) => {
  _p.setup = () => {
    _p.createCanvas(settings.resolution.x / 1.5, settings.resolution.y / 1.5)

    capture = _p.createCapture(_p.VIDEO)
    // capture.size(640, 480)

    const facemesh = ml5.facemesh(capture, modelLoaded)

    function modelLoaded() {
      console.log('Model Loaded!')
    }

    facemesh.on('face', (_results) => {
      predictions = _results
    })
  }

  _p.draw = () => {
    if (predictions[0]) {
      //
      // MESH
      //

      // [1] ---> Cut out the face
      let mesh = predictions[0].scaledMesh
      centerValues = {
        h: (mesh[454][0] - mesh[234][0]) / 2,
        y: (mesh[152][1] - mesh[10][1]) / 2,
      }

      _p.image(capture, 0 - mesh[234][0] - centerValues.h + settings.faceOffset.x, 0 - mesh[10][1] - centerValues.y + settings.faceOffset.y, 640, 480)

      _p.noStroke()
      _p.textSize(6)
      _p.fill(255, 255, 255)
      // drawingContext.shadowBlur = 20
      // drawingContext.shadowColor = color(settings.wireframe.color)

      _p.beginShape()

      _p.vertex(0, 480)
      _p.vertex(640, 480)
      _p.vertex(640, 0)
      _p.vertex(0, 0)
      _p.vertex(0, 480)

      settings.boundaries.forEach((_point) => {
        _p.vertex(mesh[_point][0] - mesh[234][0] - centerValues.h + settings.faceOffset.x, mesh[_point][1] - mesh[10][1] - centerValues.y + settings.faceOffset.y)
      })

      _p.vertex(mesh[10][0] - mesh[234][0] - centerValues.h + settings.faceOffset.x, mesh[10][1] - mesh[10][1] - centerValues.y + settings.faceOffset.y)

      _p.endShape()

      // [2] ---> Add wireframe

      _p.fill(settings.wireframe.color)

      mesh.forEach((_points, _index) => {
        const [x, y] = _points
        _p.ellipse(x - mesh[234][0] - centerValues.h + settings.faceOffset.x, y - mesh[10][1] - centerValues.y + settings.faceOffset.y, settings.wireframe.size, settings.wireframe.size)
      })

      if (flags.firstLoad) {
      }
    }
  }
}

new p5(face, 'face')

//
// MESH
//

const mesh = (_p) => {
  _p.setup = () => {
    _p.createCanvas(settings.resolution.x / 1.5, settings.resolution.y / 1.5, _p.WEBGL)
  }

  _p.draw = () => {
    _p.background(0)

    _p.camera()

    _p.noStroke()

    if (predictions[0] && centerValues) {
      let mesh = predictions[0].scaledMesh

      // _p.beginShape()
      _p.pop()

      mesh.forEach((_point, _index) => {
        const [x, y, z] = _point

        _p.push()

        _p.translate(x - mesh[234][0] - centerValues.h + settings.faceOffset.x - 130, y - mesh[10][1] - centerValues.y + settings.faceOffset.y - 130, z / 2)
        _p.rotateY(0.1)

        if (colorCapture) {
          const [r, g, b] = colorCapture[_index]
          _p.fill(r, g, b)
        }

        _p.box(10, 10, 10)

        _p.pop()
      })

      _p.rotateY(0.01)

      _p.push()

      // _p.endShape()

      // flags.firstLoad = false
    }
  }
}

new p5(mesh, 'mesh')
