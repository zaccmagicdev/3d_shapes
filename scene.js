import * as THREE from "three";
import cube from "./shapes/Cube";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0d97ff");

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.2,
  2000
);

camera.position.set(0, 2, 0);

const renderer = new THREE.WebGLRenderer();

//adding and enabling lighting :>
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
scene.add(ambientLight);

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 1 ); //default; light shining from top
light.visible = true;
light.castShadow = true; // default false


//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.1; // default
light.shadow.camera.far = 10; // default

scene.add( light );

console.log(light);


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 32, 32),
  new THREE.MeshStandardMaterial({
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

const sphereGeometry = new THREE.SphereGeometry( 1.3, 32, 32 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default

sphere.position.y = 2.5

scene.add( sphere );

//first object


renderer.render(scene, camera);

