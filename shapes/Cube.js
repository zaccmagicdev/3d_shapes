import * as THREE from "three";

class cube {
  constructor(scene, camera, renderer, width, height, color, isWiremesh) {
    this.color = color;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.Ypos = Ypos;
    this.isWiremesh = isWiremesh;
  }

  renderCube() {
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      wireframe: this.isWiremesh,
    });
    const geometry = new THREE.BoxGeometry(this.width, this.height, 1, 1, 1);
    const cubeRendered = new THREE.Mesh(geometry, material);

    const _animateCube = () => {
      cubeRendered.rotation.x += 0.005;
      cubeRendered.rotation.y += 0.005;
      this.renderer.render(this.scene, this.camera);
    };

    this.scene.add(cubeRendered);
    this.renderer.setAnimationLoop(_animateCube);
    
  }
}

export default cube;
