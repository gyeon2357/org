var container = document.getElementById("timer");

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 4);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// lights
var aLight = new THREE.AmbientLight(0xffffff);
scene.add(aLight);

var dLight = new THREE.DirectionalLight(0xdddddd, 0.5);
dLight.position.set(0.9, 0.2, 1.5).multiplyScalar(2);
scene.add(dLight);

// ---------------------------------------------------------------

var wallGeo = new THREE.PlaneBufferGeometry(25, 25);
var wallMat = new THREE.MeshPhongMaterial({ color: 0xeeeeee });
var wall = new THREE.Mesh(wallGeo, wallMat);
scene.add(wall);

// ---------------------------------------------------------------

var clockGroup = new THREE.Group();
scene.add(clockGroup);

// face

var faceGeo = new THREE.CircleBufferGeometry(1, 32);
var faceMat = new THREE.MeshPhongMaterial({ color: 0xda3170 });
var face = new THREE.Mesh(faceGeo, faceMat);
face.position.z = 0.3;
clockGroup.add(face);

// border

var circle = new THREE.Shape();
circle.absarc(0, 0, 1.03, 0, Math.PI * 2);

var hole = new THREE.Path();
hole.absarc(0, 0, 1, 0, Math.PI * 2);
circle.holes.push(hole);

var tubeExtrudeSettings = {
  curveSegments: 20,
  depth: 0.4,
  steps: 1,
  bevelEnabled: false,
};
var tubeGeo = new THREE.ExtrudeGeometry(circle, tubeExtrudeSettings);
var tubeMat = new THREE.MeshPhongMaterial({ color: 0xdddddd });
var border = new THREE.Mesh(tubeGeo, tubeMat);
clockGroup.add(border);

var center = new THREE.Vector3();

var handMat = new THREE.MeshPhongMaterial({ color: 0xcccccc });

var hourTickGeo = new THREE.BoxBufferGeometry(0.02, 0.02, 0.1);
hourTickGeo.translate(0, 0, 0.05);

for (var i = 0; i < 12; i++) {
  var tickMark = new THREE.Mesh(hourTickGeo, handMat);
  var angle = (i / 12) * 2 * Math.PI;
  tickMark.position.x = Math.cos(angle) * 0.9;
  tickMark.position.y = Math.sin(angle) * 0.9;
  tickMark.lookAt(center);
  face.add(tickMark);
}

var minuteTickGeo = new THREE.BoxBufferGeometry(0.02, 0.01, 0.04);
minuteTickGeo.translate(0, 0, 0.02);

for (var i = 0; i < 60; i++) {
  var tickMark = new THREE.Mesh(minuteTickGeo, handMat);
  var angle = (i / 60) * 2 * Math.PI;
  tickMark.position.x = Math.cos(angle) * 0.9;
  tickMark.position.y = Math.sin(angle) * 0.9;
  tickMark.lookAt(center);
  face.add(tickMark);
}

// hands

var handGroup = new THREE.Group();
handGroup.position.z = 0.04;
face.add(handGroup);

var handCenterGeo = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.1, 32);
handCenterGeo.rotateX(Math.PI / 2);
var handCenter = new THREE.Mesh(handCenterGeo, handMat);
handGroup.add(handCenter);

var handGeo = new THREE.BoxBufferGeometry(0.04, 0.04, 0.04);
handGeo.translate(0, 0.02, 0.02);

// hour

var handHour = new THREE.Mesh(handGeo, handMat);
handHour.scale.y = 12;
handGroup.add(handHour);

// minute

var handMinute = handHour.clone();
handMinute.scale.y = 20;
handGroup.add(handMinute);

// second

var handSecond = handHour.clone();
handSecond.scale.set(0.5, 21, 0.5);
handGroup.add(handSecond);

// ---------------------------------------------------------------

function updateTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  // hour
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  handHour.rotation.z = -hour;

  // minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  handMinute.rotation.z = -minute;

  // second
  second = (second * Math.PI) / 30;
  handSecond.rotation.z = -second;
}

updateTime();

setInterval(updateTime, 1000);

// ---------------------------------------------------------------

// shadows

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

dLight.castShadow = true;
dLight.shadow.mapSize.width = 2048;
dLight.shadow.mapSize.height = 2048;
dLight.shadow.radius = 3;

wall.receiveShadow = true;
face.receiveShadow = true;

border.castShadow = true;
handCenter.castShadow = true;
handHour.castShadow = true;
handMinute.castShadow = true;
handSecond.castShadow = true;

// ---------------------------------------------------------------

window.addEventListener("resize", resize, false);
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

renderer.setAnimationLoop(loop);

function loop() {
  renderer.render(scene, camera);
}
