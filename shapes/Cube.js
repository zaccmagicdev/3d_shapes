import * as THREE from "three";

class cube {
  constructor(
    scene,
    camera,
    renderer,
    width,
    height,
    xPos,
    yPos,
    color,
    isWiremesh
  ) {
    this.color = color;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.isWiremesh = isWiremesh;
  }

  renderCube() {
    const material = new THREE.MeshPhongMaterial({
      color: this.color
    });
    const geometry = new THREE.BoxGeometry(this.width, this.height, 1, 1, 1);
    const cubeRendered = new THREE.Mesh(geometry, material);
    
    cubeRendered.position.set(this.xPos, this.yPos, 1);

    const _animateCube = () => {
      cubeRendered.rotation.x += 0.005;
      cubeRendered.rotation.y += 0.005;
      //this.renderer.render(this.scene, this.camera);
    };

    console.log(cubeRendered)

    cubeRendered.castShadow = true;
    cubeRendered.receiveShadow = false;
    this.scene.add(cubeRendered);
    this.renderer.setAnimationLoop(_animateCube);
  }
}

export default cube;
