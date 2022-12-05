//
// VARIABLES
//

let display = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// ---> Empty
let video
let poseNet

// [] Poses
let newPoses
let oldPoses
let currentPoses = {
  x: [],
  y: [],
}
let difference = {
  x: [],
  y: [],
}

let test = 2

//
// SETTINGS
//

const differenceOffset = 250
const ease = 0.001

//
// FUNCTIONS
//

function setup() {
  // ---> Canvas
  createCanvas(display.width, display.height)

  // ---> Webcam
  video = createCapture(VIDEO)

  // ---> PoseNet
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses)
}

function gotPoses(_poses) {
  if (_poses) {
    oldPoses = _poses[0].pose.keypoints
    setTimeout(() => {
      oldPoses = _poses[0].pose.keypoints
    }, differenceOffset)
    newPoses = _poses[0].pose.keypoints
  }
}

function modelLoaded() {
  console.log('ready')
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

function draw() {
  fill(255, 0, 0)
  noStroke()

  background('rgba(0, 0, 0, 1)')

  // image(video, 0, 0)
  if (newPoses) {
    newPoses.forEach((_pose, _index) => {
      // difference.x[_index] = _pose.position.x - oldPoses[_index].position.x
      // difference.y[_index] = _pose.position.y - oldPoses[_index].position.y

      currentPoses.x[_index] = lerp(oldPoses[_index].position.x, newPoses[_index].position.x, ease)
      currentPoses.y[_index] = lerp(oldPoses[_index].position.y, newPoses[_index].position.y, ease)

      ellipse(currentPoses.x[_index], currentPoses.y[_index], 10, 10)
    })
  }
}
