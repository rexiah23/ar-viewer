import * as THREE from 'three';

let currentBackgroundDisplayMesh; 

export const loadNewBackgroundDisplayImage = (newMapImage, scene, is360Seamless=false) => {
  const texture = new THREE.TextureLoader().load(newMapImage);
  if (is360Seamless) {
    const geometry = new THREE.SphereGeometry( 25, 60, 40 );
    geometry.scale( - 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    currentBackgroundDisplayMesh = mesh; 
  } else {
    scene.remove(currentBackgroundDisplayMesh);
    scene.background = texture; 
  };
};
