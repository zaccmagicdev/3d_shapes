import * as THREE from "three";
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils } from "three";
import { Vector3 } from "three";

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

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 4.5, 3, 0 ); //default; light shining from top
light.visible = true;
light.castShadow = true; // default false

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.1; // default
light.shadow.camera.far = 10; // default

scene.add( light );

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const flyControls = new FlyControls(camera, renderer.domElement);
console.log(flyControls)
flyControls.rollSpeed = Math.PI / 24;
flyControls.mouseButtons.LEFT = THREE.MOUSE.LEFT;
flyControls.mouseButtons.RIGHT = THREE.MOUSE.RIGHT;
flyControls.dragToLook = true;
flyControls.connect();

//adding a sky
const sky = new Sky();
sky.scale.setScalar( 450000 );

const phi = MathUtils.degToRad( 83 );
const theta = MathUtils.degToRad( 90 );
const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;

scene.add( sky );

//ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0x228B22,
    side: THREE.DoubleSide,
  })
);

ground.rotateX(Math.PI / 2);

ground.receiveShadow = true;

scene.add(ground);
renderer.setAnimationLoop(() => renderer.render(scene, camera));
camera.position.z = 4;

//first object
const cubeGeometry = new THREE.BoxGeometry( 2, 2, 2 );
const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.castShadow = true; //default is false

cube.position.y = 2.5

scene.add( cube );

//second object
const coneGeometry = new THREE.ConeGeometry(2, 4, 8);
const coneMaterial = new THREE.MeshStandardMaterial( { color: 0x8080ff } );
const coneHouse = new THREE.Mesh(coneGeometry, coneMaterial);
coneHouse.position.set(5, 2, 5);
coneHouse.castShadow = true;
scene.add(coneHouse)

//concrete wall
const wallGeo = new THREE.RingGeometry( 2, 2, 13 );
const wallMaterial = new THREE.MeshStandardMaterial({color: 0x9b9b9b})
const concreteWall = new THREE.Mesh(wallGeo, wallMaterial);
concreteWall.castShadow = true;
scene.add(concreteWall)

const animate = () => {
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  flyControls.update(0.05);

  document.addEventListener('keydown', (e) => {
    e.key === 'Shift' && flyControls.update(0.001)
  })

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate)

