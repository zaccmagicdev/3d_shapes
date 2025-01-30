import * as THREE from "three";
import cube from "./shapes/Cube";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0d97ff");

const camera = new THREE.PerspectiveCamera(
  110,
  window.innerWidth / window.innerHeight,
  0.2,
  2000
);

camera.position.set(0, 2, 0);

const renderer = new THREE.WebGLRenderer();

//adding and enabling lighting :>
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.98);
scene.add(ambientLight);

const light = new THREE.DirectionalLight( 0xff0000, 1 );
light.position.set( 0, 5, 5 );
light.castShadow = true;
scene.add( light );

console.log(light);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 32, 32),
  new THREE.MeshPhongMaterial({
    color: 0x228B22,
    side: THREE.DoubleSide,
  })
);

ground.rotateX(Math.PI / 2);
//ground.rotateZ(Math.PI / 2);

ground.receiveShadow = true;

scene.add(ground);
renderer.setAnimationLoop(() => renderer.render(scene, camera));
camera.position.z = 4;

//first object
const cube1 = new cube(scene, camera, renderer, 1, 1, 0, 2, 0xD2122E, false);
cube1.renderCube();

