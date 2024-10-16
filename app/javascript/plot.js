import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";


document.addEventListener("turbo:load", () => {
  const container = document.getElementById("plot-container");
  if (!container) return;  // Ensure the container exists

  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create a simple open room
  const material = new THREE.MeshBasicMaterial({ color: 0x8ac7db, side: THREE.DoubleSide });

  const wallGeometry = new THREE.PlaneGeometry(10, 10);
  const backWall = new THREE.Mesh(wallGeometry, material);
  backWall.position.z = -5;
  scene.add(backWall);

  const leftWall = new THREE.Mesh(wallGeometry, material);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -5;
  scene.add(leftWall);

  const floor = new THREE.Mesh(wallGeometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -5;
  scene.add(floor);

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});
