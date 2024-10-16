import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("plot-container");
  if (!container) return;

  // Create the scene
  const scene = new THREE.Scene();

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(10, 10, 10); // Start camera at an angle

  // Create the renderer and append it to the container
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Initialize OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth rotation
  controls.dampingFactor = 0.05;
  controls.target.set(0, 4, 0); // Focus on the center of the room

  // Create the floor
  const floorGeometry = new THREE.PlaneGeometry(8, 8);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Create the back wall
  const backWallGeometry = new THREE.PlaneGeometry(8, 8);
  const backWallMaterial = new THREE.MeshBasicMaterial({ color: 0xa0a0a0 });
  const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
  backWall.position.set(0, 4, -4);
  scene.add(backWall);

  // Create the left wall
  const leftWallGeometry = new THREE.PlaneGeometry(8, 8);
  const leftWallMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
  const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-4, 4, 0);
  scene.add(leftWall);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(directionalLight);

  // Handle window resizing
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Keep controls responsive
    renderer.render(scene, camera);
  }

  animate();
});
