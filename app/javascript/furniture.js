import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const loader = new GLTFLoader();
let activeObject = null; // Keep track of the currently selected object
let mode = 'translate'; // Default mode is translate

// Object to store all furniture paths
const furnitureModels = {
  sofa: '/assets/furniture/sofa_02/sofa_02_4k.gltf',
  chair: '/assets/furniture/chair_01/chair_01_4k.gltf',
  table: '/assets/furniture/table_01/table_01_4k.gltf',
  // Add more furniture items here...
};

// Function to clamp position values to the room's bounds
function clampPosition(position) {
  const roomBounds = 4; // Assuming the room is from -4 to 4 along x and z axis
  position.x = THREE.MathUtils.clamp(position.x, -roomBounds, roomBounds);
  position.y = THREE.MathUtils.clamp(position.y, 0, roomBounds); // No negative y values (floor level is y=0)
  position.z = THREE.MathUtils.clamp(position.z, -roomBounds, roomBounds);

  // Avoid NaN and Infinity
  if (isNaN(position.x) || !isFinite(position.x)) position.x = 0;
  if (isNaN(position.y) || !isFinite(position.y)) position.y = 0;
  if (isNaN(position.z) || !isFinite(position.z)) position.z = 0;
}

// Function to load furniture models
function loadFurniture(furnitureName, scene, camera, renderer, controls, onLoadCallback) {
  const modelPath = furnitureModels[furnitureName];  // Get the model path based on the name
  if (!modelPath) {
    console.error(`Furniture model for ${furnitureName} not found.`);
    return;
  }

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    // Debugging to check model
    console.log('Loaded model:', model);

    // Reset position to a valid one
    model.position.set(0, 0, 0);

    // Check if the model has children (e.g., meshes) and fix their positions if necessary
    model.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.position.set(0, 0, 0); // Set a valid position for the meshes
      }
    });

    model.userData.isDraggable = true; // Mark it as draggable
    scene.add(model);

    // Manually handle drag and rotate functionality
    setupManualTransform(model, scene, camera, renderer, controls);

    if (onLoadCallback) onLoadCallback(model); // Optional callback after model loads
  }, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
  });
}

// Function to manually handle dragging and rotating
function setupManualTransform(object, scene, camera, renderer, controls) {
  // Add event listeners for dragging or rotating based on the current mode
  window.addEventListener('keydown', (event) => {
    if (mode === 'rotate') {
      if (event.code === 'ArrowLeft') {
        object.rotation.y += 0.05; // Rotate left
      } else if (event.code === 'ArrowRight') {
        object.rotation.y -= 0.05; // Rotate right
      }
    } else if (mode === 'translate') {
      // Clamping movement during translate mode
      clampPosition(object.position);
    }
    controls.update();
    renderer.render(scene, camera);
    console.log('Object position after transformation:', object.position);
    console.log('Object rotation after transformation:', object.rotation);
  });

  // Set up key controls to switch between translate and rotate
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyQ': // Translate mode
        mode = 'translate';
        updateModeIndicator('translate');
        break;
      case 'KeyE': // Rotate mode
        mode = 'rotate';
        updateModeIndicator('rotate');
        break;
    }
  });

  // Mode indicator
  const modeIndicator = document.getElementById("mode-indicator");
  
  function updateModeIndicator(currentMode) {
    modeIndicator.textContent = currentMode === 'translate'
      ? "Mode: Translate (Press 'E' to Rotate)"
      : "Mode: Rotate (Press 'Q' to Translate)";
  }
}

export default loadFurniture;
