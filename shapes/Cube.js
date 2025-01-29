import * as THREE from "three";

class cube {
  constructor(scene, camera, renderer, color) {
    this.color = color;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  _animateCube(){
    cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  renderCube() {
    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      wireframe: true,
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeRendered = new THREE.Mesh(geometry, material);

    console.log(cubeRendered)

    const _animateCube = () => {
        cubeRendered.rotation.x += 0.01;
        cubeRendered.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    };

    this.scene.add(cubeRendered);
    this.renderer.setAnimationLoop(_animateCube);
    this.camera.position.z = 5;
  }
}

export default cube;
