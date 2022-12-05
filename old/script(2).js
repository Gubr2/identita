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
let poses
let newPoses
let oldPoses
let p0
let p1

//
// FLAGS
//

let oldPosesFlag = true

//
// SETTINGS
//

const settings = {
  interval: 250,
  ease: 0.01,
}

//
// FUNCTIONS
//

function setup() {
  // ---> Canvas
  createCanvas(display.width, display.height)

  // ---> Webcam
  video = createCapture(VIDEO)

  // ---> PoseNet
  poseNet = ml5.poseNet(video, savePoses)
  poseNet.on('pose', gotPoses)
}

function gotPoses(_poses) {
  if (_poses.length > 0) {
    poses = _poses[0].pose.keypoints
  }
}

function savePoses() {
  setInterval(() => {
    // ---> Save Old Poses
    if (newPoses) {
      if (oldPosesFlag) {
        oldPoses = newPoses.map((_item) => {
          return _item
        })
        oldPosesFlag = false
      }
    }

    // ---> Copy New Poses
    newPoses = poses.map((_item) => {
      return _item
    })
  }, settings.interval)
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

function easeLinear(t, b, c, d) {
  return (c * t) / d + b
}

function draw() {
  noStroke()

  background('rgba(0, 0, 0, 1)')

  // image(video, 0, 0)

  if (newPoses && oldPoses) {
    newPoses.forEach((_pose, _index) => {
      oldPoses[_index].position.x = lerp(oldPoses[_index].position.x, _pose.position.x, settings.ease)
      oldPoses[_index].position.y = lerp(oldPoses[_index].position.y, _pose.position.y, settings.ease)

      // fill(255, 0, 0)
      // ellipse(_pose.position.x, _pose.position.y, 10, 10)

      fill(0, 255, 0)
      ellipse(oldPoses[_index].position.x, oldPoses[_index].position.y, 10, 10)
    })
  }
}
