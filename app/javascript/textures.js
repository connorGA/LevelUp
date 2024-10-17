import * as THREE from "three";

const loader = new THREE.TextureLoader();

const textures = {
  // Floor Textures
  cobblestone_floor: {
    albedo: loader.load('/assets/textures/floors/cobblestone_floor/cobblestone_floor_08_diff_4k.jpg'),
    normal: loader.load('/assets/textures/floors/cobblestone_floor/cobblestone_floor_08_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/floors/cobblestone_floor/cobblestone_floor_08_rough_4k.jpg'),
    displacement: loader.load('/assets/textures/floors/cobblestone_floor/cobblestone_floor_08_disp_4k.png'),
  },

   monastery_stone_floor: {
    albedo: loader.load('/assets/textures/floors/monastery_stone_floor/monastery_stone_floor_diff_4k.jpg'),
    normal: loader.load('/assets/textures/floors/monastery_stone_floor/monastery_stone_floor_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/floors/monastery_stone_floor/monastery_stone_floor_rough_4k.exr'),
    displacement: loader.load('/assets/textures/floors/monastery_stone_floor/monastery_stone_floor_disp_4k.png'),
   },

   sparse_grass: {
    albedo: loader.load('/assets/textures/floors/sparse_grass/sparse_grass_diff_4k.jpg'),
    normal: loader.load('/assets/textures/floors/sparse_grass/sparse_grass_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/floors/sparse_grass/sparse_grass_rough_4k.exr'),
    displacement: loader.load('/assets/textures/floors/sparse_grass/sparse_grass_disp_4k.png'),
   },

   wood_floor: {
    albedo: loader.load('/assets/textures/floors/wood_floor/wood_floor_diff_4k.jpg'),
    normal: loader.load('/assets/textures/floors/wood_floor/wood_floor_nor_gl_4k.exr'),
    roughness: loader.load('/assets/textures/floors/wood_floor/wood_floor_rough_4k.exr'),
    displacement: loader.load('/assets/textures/floors/wood_floor/wood_floor_disp_4k.png'),
   },

  
  // Wall Textures
    wooden_garage_door: {
      albedo: loader.load('/assets/textures/walls/wooden_garage_door/wooden_garage_door_diff_4k.jpg'),
      normal: loader.load('/assets/textures/walls/wooden_garage_door/wooden_garage_door_nor_gl_4k.exr'),
      roughness: loader.load('/assets/textures/walls/wooden_garage_door/wooden_garage_door_rough_4k.exr'),
      displacement: loader.load('/assets/textures/walls/wooden_garage_door/wooden_garage_door_disp_4k.png'),
    },
  };

export function createWallMaterial(textureSet) {
    return new THREE.MeshStandardMaterial({
      map: textureSet.albedo,
      normalMap: textureSet.normal || null,
      roughnessMap: textureSet.roughness || null,
      roughness: 1.0,  // Default roughness for non-shiny surfaces
      side: THREE.DoubleSide,
    });
}

export function createFloorMaterial(textureSet) {
    return new THREE.MeshStandardMaterial({
      map: textureSet.albedo,
      normalMap: textureSet.normal || null,
      roughnessMap: textureSet.roughness || null,
      displacementMap: textureSet.displacement || null,
      displacementScale: 0.5,
      metalness: 0,
      roughness: 1.0,
      side: THREE.DoubleSide,
    });
}

export default textures;


