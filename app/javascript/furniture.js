import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import * as THREE from 'three';

const loader = new GLTFLoader();
let activeObject = null; // Keep track of the currently selected object

// Object to store all furniture paths
const furnitureModels = {
  sofa: '/assets/furniture/sofa_02/sofa_02_4k.gltf',
//   chair: '/assets/furniture/chair_01/chair_01_4k.gltf',
//   table: '/assets/furniture/table_01/table_01_4k.gltf',
  // Add more furniture items here...
};

// Function to load furniture models
function loadFurniture(furnitureName, scene, camera, renderer, controls, onLoadCallback) {
  const modelPath = furnitureModels[furnitureName];  // Get the model path based on the name
  if (!modelPath) {
    console.error(`Furniture model for ${furnitureName} not found.`);
    return;
  }

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.userData.isDraggable = true; // Mark it as draggable
    scene.add(model);
    
    // Enable drag and rotate functionality on the loaded model
    setupTransformControls(model, scene, camera, renderer, controls);
    
    if (onLoadCallback) onLoadCallback(model);
  }, undefined, (error) => {
    console.error('An error occurred while loading the model:', error);
  });
}

// Function to set up transform controls (drag and rotate)
function setupTransformControls(object, scene, camera, renderer, controls) {
  const transformControls = new TransformControls(camera, renderer.domElement);
  scene.add(transformControls);
  
  // Enable dragging the object
  transformControls.attach(object);
  
  // Listen to controls change to update the scene
  transformControls.addEventListener('change', () => {
    controls.update();
    renderer.render(scene, camera);
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
