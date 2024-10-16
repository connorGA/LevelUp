import * as THREE from "three";

const loader = new THREE.TextureLoader();

const textures = {
  cobblestone_floor: {
    albedo: loader.load('/assets/textures/cobblestone_floor/cobblestone_floor_08_diff_4k.jpg'),
    normal: loader.load('/assets/textures/cobblestone_floor/cobblestone_floor_08_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/cobblestone_floor/cobblestone_floor_08_rough_4k.jpg'),
    displacement: loader.load('/assets/textures/cobblestone_floor/cobblestone_floor_08_disp_4k.png'),
  },

   monastery_stone_floor: {
    albedo: loader.load('/assets/textures/monastery_stone_floor/monastery_stone_floor_diff_4k.jpg'),
    normal: loader.load('/assets/textures/monastery_stone_floor/monastery_stone_floor_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/monastery_stone_floor/monastery_stone_floor_rough_4k.exr'),
    displacement: loader.load('/assets/textures/monastery_stone_floor/monastery_stone_floor_disp_4k.png'),
   }
};

export function createFloorMaterial(textureSet) {
    return new THREE.MeshStandardMaterial({
      map: textureSet.albedo,  // Base color texture
      normalMap: textureSet.normal || null, // Optional normal map for surface detail
      roughnessMap: textureSet.roughness || null, // Optional roughness map
      displacementMap: textureSet.displacement || null, // Optional displacement map
      displacementScale: 0.5, // Adjust the depth effect
      metalness: 0, // Keep the floor non-metallic
      roughness: 1.0, // Default roughness for non-shiny surfaces
      side: THREE.DoubleSide, // Make sure both sides of the plane are visible
    });
  }

export default textures;
