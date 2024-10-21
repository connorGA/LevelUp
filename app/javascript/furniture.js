import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import * as THREE from 'three';

const loader = new GLTFLoader();
let activeObject = null; // Keep track of the currently selected object

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

    // Ensure that the loaded model is a valid THREE.Object3D
    if (model instanceof THREE.Object3D) {
      setupTransformControls(model, scene, camera, renderer, controls);  // Attach the root object to TransformControls
      if (onLoadCallback) onLoadCallback(model); // Optional callback after model loads
    } else {
      console.error("Loaded model is not a valid THREE.Object3D.");
    }
  }, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
  });
}

// Function to set up transform controls (drag and rotate)
function setupTransformControls(object, scene, camera, renderer, controls) {
  const transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);

  // Attach the object (ensure it's a valid Object3D, e.g., Group or Mesh)
  transformControls.attach(object);

  // Listen to controls change to update the scene
  transformControls.addEventListener('change', () => {
    controls.update();
    renderer.render(scene, camera);

    // Clamp position to ensure it doesn't go out of room bounds
    clampPosition(object.position);

    console.log('Group position after transformation:', object.position);
  });

  // Set up key controls: translate (drag) or rotate with keys (e.g., Q for translate, E for rotate)
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyQ': // Translate mode (drag)
        transformControls.setMode('translate');
        break;
      case 'KeyE': // Rotate mode
        transformControls.setMode('rotate');
        break;
    }
  });

  // Update active object for potential future use
  activeObject = object;
}

export default loadFurniture;  // General export for loading furniture
