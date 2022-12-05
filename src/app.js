//
// IMPORTS
//

import './styles/index.scss'

import p5 from 'p5'
import gsap from 'gsap'
import ml5 from 'ml5'

import Data from './modules/data'
import UI from './modules/ui'

const data = new Data()
const ui = new UI()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// SETTINGS
//

const settings = {
  resolution: {
    width: 1920,
    height: 1440,
    mesh: {
      rescale: 3,
    },
    boundingBox: {
      offset: 150,
    },
  },
  toggle: {
    ml: true,
    webcam: true,
  },
}

//
// VARIABLES
//

let facemeshResult = []
let btn = {
  left: document.querySelector('.ui__btn--left'),
  right: document.querySelector('.ui__btn--right'),
  deepLearning: {
    container: document.querySelector('.ui__extra'),
    stepFirst: document.querySelector('.ui__extra__btn--1'),
    stepSecond: document.querySelector('.ui__extra__btn--2'),
    stepThird: document.querySelector('.ui__extra__btn--3'),
    texts: [...document.querySelectorAll('.ui__extra__text__content')],
  },
}
let version = {
  value: 1,
  amount: 5,
  type: {
    randTablet: {
      face: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
      eyebrow: {
        left: [70, 63, 105, 66, 107, 55, 65, 52, 53, 46],
        right: [300, 293, 334, 296, 336, 285, 295, 282, 283, 276],
      },
      eye: {
        inner: {
          left: [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7],
          right: [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382],
        },
        outer: {
          left: [130, 247, 30, 29, 27, 28, 56, 190, 243, 112, 26, 22, 23, 24, 110, 25],
          right: [359, 255, 339, 254, 253, 252, 256, 341, 463, 414, 286, 258, 257, 259, 260, 467],
        },
      },
      nose: {
        base: [174, 236, 198, 209, 129, 98, 97, 2, 326, 327, 358, 429, 456, 399],
        left: [166, 79, 239, 238, 20, 60, 75, 59],
        right: [458, 459, 309, 392, 289, 305, 290, 250],
      },
      mouth: {
        inner: [57, 185, 40, 39, 37, 0, 267, 269, 270, 409, 287, 375, 321, 405, 314, 17, 84, 181, 91, 146],
        outer: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95],
      },
    },
    facialMarkers: {
      selection: [93, 70, 52, 55, 33, 133, 129, 61, 9, 1, 0, 17, 152, 285, 282, 300, 362, 263, 358, 291, 323],
      textOffset: 15,
    },
    deepLearning: {
      value: 0,
    },
  },
}

let video = {
  capture: null,
  selector: null,
}

let canvas = {
  selector: null,
}

//
// FLAGS
//

let flags = {
  end: false,
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//
// FUNCTIONS
//

// ***********************************************
// ---> P5

const init = (_p5) => {
  _p5.setup = () => {
    _p5.createCanvas(settings.resolution.width, settings.resolution.height)

    // ---> Webcam
    video.capture = _p5.createCapture(_p5.VIDEO)
    video.capture.size(settings.resolution.width, settings.resolution.height)

    // ---> Facemesh
    if (settings.toggle.ml) {
      facemesh = ml5.facemesh(video.capture, afterModelLoaded)
      facemesh.on('face', (_results) => {
        facemeshResult = _results
      })
    } else {
      afterModelLoaded()
    }
  }

  _p5.draw = () => {
    _p5.clear()

    // ////////// //
    // FIRST TEST //
    // ////////// //

    if (facemeshResult.length) {
      ////////////////////////////////////////////
      //
      // ---> V E R S I O N  1
      //

      if (version.value == 1) {
        _p5.fill('#DFDDD4')
        _p5.stroke('black')
        _p5.strokeWeight(2)

        // [][][][][][][][][][][][][][][][][][]
        // [] FACE
        // [][][][][][][][][][][][][][][][][][]
        _p5.beginShape()

        version.type.randTablet.face.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // [][][][][][][][][][][][][][][][][][]
        // [] EYEBROW
        // [][][][][][][][][][][][][][][][][][]

        // ---> Left
        _p5.beginShape()

        version.type.randTablet.eyebrow.left.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---> Right
        _p5.beginShape()

        version.type.randTablet.eyebrow.right.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // [][][][][][][][][][][][][][][][][][]
        // [] EYE
        // [][][][][][][][][][][][][][][][][][]

        // ---> Outer
        // ---------------> Left
        _p5.beginShape()

        version.type.randTablet.eye.outer.left.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---------------> Right
        _p5.beginShape()

        version.type.randTablet.eye.outer.right.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---> Inner
        // ---------------> Left
        _p5.beginShape()

        version.type.randTablet.eye.inner.left.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---------------> Right
        _p5.beginShape()

        version.type.randTablet.eye.inner.right.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // [][][][][][][][][][][][][][][][][][]
        // [] NOSE
        // [][][][][][][][][][][][][][][][][][]

        // ---> Base
        _p5.beginShape()

        version.type.randTablet.nose.base.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape()

        // ---> Left
        _p5.beginShape()

        version.type.randTablet.nose.left.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---> Right
        _p5.beginShape()

        version.type.randTablet.nose.right.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // [][][][][][][][][][][][][][][][][][]
        // [] MOUTH
        // [][][][][][][][][][][][][][][][][][]

        // ---> INNER
        _p5.beginShape()

        version.type.randTablet.mouth.inner.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)

        // ---> Outer
        _p5.beginShape()

        version.type.randTablet.mouth.outer.forEach((_point) => {
          _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
        })

        _p5.endShape(_p5.CLOSE)
      }

      ////////////////////////////////////////////
      //
      // ---> V E R S I O N  2
      //

      if (version.value == 2) {
        _p5.fill('black')
        _p5.textSize(20)

        let number = 1

        facemeshResult[0].scaledMesh.forEach((_point, _index) => {
          version.type.facialMarkers.selection.forEach((_value) => {
            if (_index == _value) {
              // _p5.stroke('white')
              // _p5.strokeWeight(2)
              _p5.noStroke()
              _p5.text(number, _point[0] * settings.resolution.mesh.rescale + version.type.facialMarkers.textOffset, _point[1] * settings.resolution.mesh.rescale + version.type.facialMarkers.textOffset)
              _p5.ellipse(_point[0] * settings.resolution.mesh.rescale, _point[1] * settings.resolution.mesh.rescale, 20, 20)

              number += 1
            }
          })
        })
      }

      //
      // ---> V E R S I O N  3
      //

      if (version.value == 3) {
      }

      //
      // ---> V E R S I O N  4
      //

      if (version.value == 4) {
        _p5.noFill()
        _p5.stroke('#A08EE8')
        _p5.strokeWeight(5)
        _p5.rect(facemeshResult[0].boundingBox.topLeft[0][0] * settings.resolution.mesh.rescale, facemeshResult[0].boundingBox.topLeft[0][1] * settings.resolution.mesh.rescale, (facemeshResult[0].boundingBox.bottomRight[0][0] - facemeshResult[0].boundingBox.topLeft[0][0]) * settings.resolution.mesh.rescale, (facemeshResult[0].boundingBox.bottomRight[0][1] - facemeshResult[0].boundingBox.topLeft[0][1]) * settings.resolution.mesh.rescale)
        _p5.fill('#A08EE8')
        _p5.rect(facemeshResult[0].boundingBox.topLeft[0][0] * settings.resolution.mesh.rescale, facemeshResult[0].boundingBox.bottomRight[0][1] * settings.resolution.mesh.rescale - 40, 80, 40)
        _p5.fill('black')
        _p5.textSize(25)
        _p5.text(facemeshResult[0].faceInViewConfidence.toFixed(2), facemeshResult[0].boundingBox.topLeft[0][0] * settings.resolution.mesh.rescale + 15, facemeshResult[0].boundingBox.bottomRight[0][1] * settings.resolution.mesh.rescale - 12)
      }

      //
      // ---> V E R S I O N  5
      //

      if (version.value == 5) {
        // ---> Step 1
        if (version.type.deepLearning.value == 0) {
          facemeshResult[0].scaledMesh.forEach((_point, _index) => {
            _p5.fill('#A08EE8')
            _p5.noStroke()
            _p5.ellipse(_point[0] * settings.resolution.mesh.rescale, _point[1] * settings.resolution.mesh.rescale, 6, 6)
          })

          // ---> Step 2
        } else if (version.type.deepLearning.value == 1) {
          _p5.fill('#CACD4D')

          _p5.beginShape()

          version.type.randTablet.face.forEach((_point) => {
            _p5.vertex(facemeshResult[0].scaledMesh[_point][0] * settings.resolution.mesh.rescale, facemeshResult[0].scaledMesh[_point][1] * settings.resolution.mesh.rescale)
          })

          _p5.endShape(_p5.CLOSE)

          // ---> Step 3
        } else {
          let iteration = 0
          for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 20; j++) {
              iteration++

              _p5.fill(31, 33, 49, facemeshResult[0].mesh[iteration][0] * 2)
              _p5.rect(96 * j, 96 * i, 96, 96)

              _p5.fill('white')
              _p5.textSize(12)
              _p5.text(facemeshResult[0].mesh[iteration][0].toFixed(2), 96 * j + 10, 96 * i + 10, 96, 96)
            }
          }
        }
      }
    }
  }
}

new p5(init, 'capture')

// ***********************************************
// ---> After Model Loaded
function afterModelLoaded() {
  console.log('loaded')

  video = {
    capture: null,
    selector: document.querySelector('video'),
  }

  canvas = {
    selector: document.querySelector('main'),
  }

  buttonHandler()
  handleExtraButtons()
  handleStyle(1)
  handleCanvasFilter(1)

  // [] ---> Turn off webcam

  if (!settings.toggle.webcam) {
    video.selector.style.visibility = 'hidden'
  }
}

// ***********************************************
// ---> Handlers

function buttonHandler() {
  // ---> Left
  btn.left.addEventListener('click', () => {
    if (ui.flags.buttons) {
      // [] ---> Block on End
      if (version.value > 1) {
        version.value -= 1

        handleDiv(version.value, version.value + 1)
      }

      // [] ---> Handle Styles
      handleStyle(version.value)
      handleCanvasFilter(version.value)
      ui.handleToggle(version.value - 1)

      // [] ---> Hide extra buttons on last version
      if (version.value == version.amount - 1) {
        ui.animateExtraButtons(false).then(() => {
          btn.deepLearning.container.style.display = 'none'
        })

        document.querySelector('.ui__extra__text__content--active').classList.remove('ui__extra__text__content--active')
      }

      // [] ---> Animate names
      ui.handleNames(-77.5 * (version.value - 1), version.value - 1)

      // [] ---> Animate years
      ui.handleYears(-30 * (version.value - 1), version.value - 1)

      // [] ---> Set end flag
      flags.end = false
    }
  })

  // ---> Right
  btn.right.addEventListener('click', () => {
    if (ui.flags.buttons) {
      // [] ---> Block on End
      if (version.value < version.amount) {
        version.value += 1

        handleDiv(-version.value, version.value - 1)
      }

      // [] ---> Handle Styles
      handleStyle(version.value)
      handleCanvasFilter(version.value)
      ui.handleToggle(version.value - 1)

      // [] ---> Show extra buttons on last version
      if (version.value == version.amount) {
        btn.deepLearning.container.style.display = 'flex'
        version.type.deepLearning.value = 0

        ui.handleExtraButtons(btn.deepLearning.stepFirst)

        if (!flags.end) {
          ui.animateExtraButtons(true)
          ui.handleExtraTexts(btn.deepLearning.texts[0])

          flags.end = true
        }
      }

      // [] ---> Animate names
      ui.handleNames(-77.5 * (version.value - 1), version.value - 1)

      // [] ---> Animate years
      ui.handleYears(-30 * (version.value - 1), version.value - 1)
    }
  })
}

function handleExtraButtons() {
  btn.deepLearning.stepFirst.addEventListener('click', () => {
    version.type.deepLearning.value = 0

    canvas.selector.style.mixBlendMode = 'unset'
    canvas.selector.style.backgroundColor = 'initial'

    ui.handleExtraButtons(btn.deepLearning.stepFirst)
    ui.handleExtraTexts(btn.deepLearning.texts[0])
  })
  btn.deepLearning.stepSecond.addEventListener('click', () => {
    version.type.deepLearning.value = 1

    canvas.selector.style.mixBlendMode = 'difference'
    canvas.selector.style.backgroundColor = 'initial'

    ui.handleExtraButtons(btn.deepLearning.stepSecond)
    ui.handleExtraTexts(btn.deepLearning.texts[1])
  })
  btn.deepLearning.stepThird.addEventListener('click', () => {
    version.type.deepLearning.value = 2

    canvas.selector.style.mixBlendMode = 'unset'
    canvas.selector.style.backgroundColor = '#705AC9'

    ui.handleExtraButtons(btn.deepLearning.stepThird)
    ui.handleExtraTexts(btn.deepLearning.texts[2])
  })
}

function handleStyle(_version) {
  // ---> Resetting & Setting Class for Video
  video.selector.removeAttribute('class')
  video.selector.classList.add(`filter--${_version}`)
  canvas.selector.removeAttribute('style')
}

function handleDiv(_current, _previous) {
  let current = document.querySelector(`.filter--${_current}__container`)
  let previous = document.querySelector(`.filter--${_previous}__container`)

  if (current) {
    current.style.display = 'block'
  }

  if (previous) {
    previous.style.display = 'none'
  }
}

function handleCanvasFilter(_version) {
  canvas.selector.removeAttribute('class')
  canvas.selector.classList.add(`filter--${_version}__canvas`)
}
