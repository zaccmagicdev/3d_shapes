import * as THREE from "three";
import cube from "./shapes/Cube";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
const SIZE = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating a cube :0
const test = new cube(scene, camera, renderer, 0xff00db);
test.renderCube();

const test2 = new cube(scene, camera, renderer, 0x00efff)
test2.renderCube();
//rendering the scene
/*function animate() {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}*/

//renderer.setAnimationLoop(animate);
