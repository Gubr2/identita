//
// VARIABLES
//

let facemeshResult

//
// FUNCTIONS
//

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  // ---> Webcam
  video = createCapture(VIDEO)
  video.size(1280, 960)

  // ---> Facemesh
  facemesh = ml5.facemesh(video, modelLoaded)
  facemesh.on('face', (_results) => {
    facemeshResult = _results
  })
}

function modelLoaded() {
  console.log('Model Loaded!')
}

function draw() {
  image(video, 0, 0, 1280, 960)

  textSize(7)
  fill('white')

  // ---> Test, if results are loaded
  if (facemeshResult) {
    facemeshResult[0].scaledMesh.forEach((_point, _index) => {
      text(_index, _point[0] * 2, _point[1] * 2)
      // ellipse(_point[0] * 2, _point[1] * 2, 5, 5)
    })
  }
}
