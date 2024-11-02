import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import textures, { createFloorMaterial, createWallMaterial } from "./textures.js";
import loadFurniture from "./furniture.js";  // General furniture loader

export default function initializePlot() {
  const container = document.getElementById("plot-container");
  if (!container) return;

  // Create the scene
  const scene = new THREE.Scene();

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Brighter ambient light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-10, 10, -10).normalize();
  scene.add(directionalLight2);

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(10, 10, 10);

  // Create the renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Initialize OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 4, 0);

  // Create the floor geometry
  const floorGeometry = new THREE.PlaneGeometry(8, 8, 256, 256);
  let floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Default grey material
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Create walls
  const backWallGeometry = new THREE.PlaneGeometry(8, 8);
  const backWall = new THREE.Mesh(
    backWallGeometry,
    new THREE.MeshBasicMaterial({ color: 0xa0a0a0 }) // Default wall color
  );
  backWall.position.set(0, 4, -4);
  scene.add(backWall);

  const leftWallGeometry = new THREE.PlaneGeometry(8, 8);
  const leftWall = new THREE.Mesh(
    leftWallGeometry,
    new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }) // Default wall color
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-4, 4, 0);
  scene.add(leftWall);

  // Array to hold draggable furniture objects
  const furnitureObjects = [];

  // Handle floor material change on selection
  const floorSelect = document.getElementById("floor-options");
  floorSelect.addEventListener("change", (event) => {
    const selectedTexture = event.target.value;
    floor.material = createFloorMaterial(textures[selectedTexture]);
    floor.material.needsUpdate = true; // Ensure material updates
  });

  // Handle wall material change on selection
  const wallSelect = document.getElementById("wall-options");
  wallSelect.addEventListener("change", (event) => {
    const selectedTexture = event.target.value;
    const wallMaterial = createWallMaterial(textures[selectedTexture]);

    // Apply the selected texture to both walls
    backWall.material = wallMaterial;
    leftWall.material = wallMaterial;

    // Ensure materials are updated
    backWall.material.needsUpdate = true;
    leftWall.material.needsUpdate = true;
  });

  // Handle furniture selection and addition
  const furnitureSelect = document.getElementById("furniture-options");
  const addFurnitureButton = document.getElementById("add-furniture");

  // Pass scene, camera, renderer, and controls to loadFurniture
  addFurnitureButton.addEventListener("click", () => {
    const selectedFurniture = furnitureSelect.value;
    loadFurniture(selectedFurniture, scene, camera, renderer, controls, (model) => {
      furnitureObjects.push(model); // Add the loaded furniture to draggable objects
    });
  });

  // Add DragControls for furniture dragging
  const dragControls = new DragControls(furnitureObjects, camera, renderer.domElement);
  dragControls.addEventListener('dragstart', (event) => {
    controls.enabled = false; // Disable orbit controls while dragging
  });

  dragControls.addEventListener('dragend', (event) => {
    controls.enabled = true; // Enable orbit controls after dragging
  });

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
}
