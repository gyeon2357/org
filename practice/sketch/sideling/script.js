import * as THREE from "https://cdn.skypack.dev/three@v0.130.1";
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1/examples/jsm/controls/OrbitControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

var scene = new THREE.Scene();

var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight;
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
$("#canvas").append(renderer.domElement);

var VIEW_ANGLE = 45,
  ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
  NEAR = 0.1,
  FAR = 1000;
var camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5.41, 15); //SET CAMERA POITION
scene.add(camera);

//HANDLE WINDOW RESIZE
window.addEventListener(
  "resize",
  function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  },
  false
);

//GROUND
const geometry = new THREE.BoxGeometry(45, 6, 2);
var material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const ground = new THREE.Mesh(geometry, material);
ground.position.y -= 2.3;
ground.rotation.z += 0.29;
ground.receiveShadow = true;
scene.add(ground);

//ADD AMBIENT LIGHT
var ambientLight = new THREE.AmbientLight(0xdddddd);
scene.add(ambientLight);

const targetObject = new THREE.Object3D();
targetObject.position.set(5, -5, -5);
scene.add(targetObject);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.target = targetObject;
scene.add(directionalLight);

var world = new p2.World();
world.sleepMode = p2.World.BODY_SLEEPING;

addBackground();

update();

function addBackground() {
  //CREATE P2 PHYSICS GROUND PLANE
  var planeShape = new p2.Plane();
  var planeBody = new p2.Body({
    position: [0, 1],
  });
  planeBody.name = "ground";
  planeBody.addShape(planeShape);
  planeBody.angle = 0.3;
  planeBody.data = ground;
  world.addBody(planeBody);
}

$("body").click(function () {
  addBox();
});
//ADD A NEW BOX FUNCTION
function addBox() {
  //CREATE RANDOM WIDTH AND HEIGHT SIZE
  var w = 0.3 + Math.random();
  var h = 0.1 + Math.random();

  //ADD ELEMENT AT RANDOM X POSITION
  var x = Math.random() * 20 - 10;
  var y = 20;

  //CREATE NEW MATERIAL WITH RANDOM COLOR
  var material = new THREE.MeshLambertMaterial({
    color: getRandomColor(),
  });

  //CREATE SPHERE WITH RANDOM WIDTH AND HEIGHT
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(w, 32, 32), material);
  sphere.position.set(x, y, 0);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.name = "sphere";
  scene.add(sphere);

  //CREATE P2 PHYSICS BOX AT RANDOM POSITION
  var boxShape = new p2.Circle(w);
  var boxBody = new p2.Body({
    mass: 1,
    position: [x, y],
    angularVelocity: 1,
  });
  boxBody.allowSleep = false;
  boxBody.sleepSpeedLimit = 2;
  boxBody.sleepTimeLimit = 2;
  boxBody.data = sphere;
  sphere.data = boxBody;
  boxBody.name = "box";
  boxBody.addShape(boxShape);
  world.addBody(boxBody);
}

//SELECTS A RANDOM COLOR
function getRandomColor() {
  var colors = ["#da3170", "#ffffff", "#da3170", "#da3170", "#da3170"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove, false);

var down = false;
$(document)
  .mousedown(function () {
    down = true;
  })
  .mouseup(function () {
    down = false;
  });

$(window).on("wheel", function (e) {
  if (e.originalEvent.deltaY > 0 && ground.rotation.z < 0.3) {
    ground.rotation.z += 0.01;
  } else if (e.originalEvent.deltaY < 0 && ground.rotation.z > -0.3) {
    ground.rotation.z -= 0.01;
  }
  world.bodies[0].angle = world.bodies[0].data.rotation.z;
});

//UPDATE FUNCTION
function update() {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    if (down && intersects[i].object.name == "sphere") {
      intersects[i].object.geometry.dispose();
      intersects[i].object.material.dispose();
      const result = world.bodies.find(
        ({ id }) => id === parseInt(intersects[i].object.data.id)
      );
      result.wakeUp();
      world.removeBody(result);
      scene.remove(intersects[i].object);
      intersects[i].object.material.color.set(0xff0000);
    }
  }

  renderer.render(scene, camera);

  //KEEP RENDERING
  requestAnimationFrame(update);

  //UPDATE PHYSICS
  world.step(1 / 60);

  //FOR EACH OBJECT IN P2 PHYSICS WORLD
  for (var i = 0; i < world.bodies.length; i++) {
    //IF IT IS A BOX -> UPDATE POSITION AND ROTATION ACCORDINGLY
    if (world.bodies[i].name == "box") {
      world.bodies[i].data.position.set(
        world.bodies[i].position[0],
        world.bodies[i].position[1],
        0
      );

      if (
        world.bodies[i].data.position.x > 15 ||
        world.bodies[i].data.position.x < -15
      ) {
        scene.remove(world.bodies[i].data);

        world.bodies[i].data.rotation.z = world.bodies[i].angle;

        world.removeBody(world.bodies[i]);
      }
    }
  }

  //UPDATE 3D SCENE
  renderer.render(scene, camera);
}
