import * as THREE from "three";
import cube from "./shapes/Cube";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0d97ff");

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  1,
  2000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 10, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x228B22,
    side: THREE.DoubleSide,
  })
);

ground.rotateX(Math.PI / 1.72);
ground.rotateZ(Math.PI / 2);

scene.add(ground);
renderer.setAnimationLoop(() => renderer.render(scene, camera));
camera.position.z = 4;

//first object
const cube1 = new cube(scene, camera, renderer, 1, 1, 0, 0.6, 0xD2122E, false);
cube1.renderCube();

