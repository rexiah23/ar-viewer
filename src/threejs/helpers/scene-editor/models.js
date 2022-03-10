import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// @todo: refactor later.
export const normalizeModelScale = (object, mainModel=false) => {
  const bbox = new THREE.Box3().setFromObject(object);
  var center = bbox.getCenter(new THREE.Vector3());
  var size = bbox.getSize(new THREE.Vector3());
  var maxAxis = Math.max(size.x, size.y, size.z);
  if (mainModel) {
    object.scale.multiplyScalar(1.0 / maxAxis);
  } else {
    object.scale.multiplyScalar(0.5 / maxAxis);
  };
  bbox.setFromObject(object);
  bbox.getCenter(center);
  bbox.getSize(size);
  object.position.copy(center).multiplyScalar(-1);
  object.position.y-= (size.y * 0.5);
  return object;
};

export const placeModelOnFloor = (object) => {
  const bbox = new THREE.Box3().setFromObject(object);
  var center = bbox.getCenter(new THREE.Vector3());
  object.position.y-= (center.y);
  return object;
};

export const createRaycastSphere = (object) => {
  const bbox = new THREE.Box3().setFromObject(object);
  const center = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z);
  const sphereGeometry = new THREE.SphereGeometry(maxAxis, 32, 16);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'red'});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  return sphere;
};

// export const loadGLBModel = (modelFilePath, group_, shouldPlaceOnFloor=false, modelObjectInfo=null, context, onLoad = () => {}) => {
//   const modelObject = {};
//   const gltfLoader = new GLTFLoader();
//   gltfLoader.load(modelFilePath, (gltfModel) => {
//     // console.log('Finished Loading Model.');
//     modelObject.model = gltfModel;
    
//     if (shouldPlaceOnFloor) {
//       group_.add(placeModelOnFloor(normalizeModelScale(gltfModel.scene, true)));
//     } else {
//       group_.add(normalizeModelScale(gltfModel.scene));
//       gltfModel.scene.position.y += 5;
//     };

//     if (!!modelObjectInfo) {
//       if (!context.countOfEachModelOnScene[modelObjectInfo.title]) {
//         context.countOfEachModelOnScene[modelObjectInfo.title] = 1; 
//       } else {
//         context.countOfEachModelOnScene[modelObjectInfo.title]++; 
//       }
//       context.currentlyAttachedScene = gltfModel.scene; 
//       context.currentlyAttachedScene.belongsTo = modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title];
//     };
    
//     group_.traverse((node) => {
//       if (node.isMesh) {
//         // @note: Lewis - this is causing all drag and drop objects to shift everytime a new one is placed
//         // node.position.y = -5;
//         node.material.envMap = environmentMap;
//         node.material.envMapIntensity = 15;
//         node.castShadow = true;
//         node.receiveShadow = false; // @todo: rethink?
//       };

//       if (node.isMesh && !modelObjectInfo) {
//         node.layers.enable(10);
//       }

//       if (node.isMesh && !!modelObjectInfo && !node.alreadyAddedToDragAndDropMeshes) {
//           node.belongsTo = modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title];
//           // context.currentlyAttachedScene = node; 
//           context.dragAndDropMeshes.push(node);
//           node.alreadyAddedToDragAndDropMeshes = true;        
//         } 
//     }); // @todo: might bring this OUT of this function. maybe. or if-block even.
//     // // @todo: modify?

//     if (context.currentlyAttachedScene) {
//       transformControls.attach(gltfModel.scene);
//     };
//     onLoad(modelObject); // @todo: later async/await likely.
//   }, (progress) => {
//     // console.log('Loading Model:', ((progress.loaded / 1024) / 1024), 'MB');
//   }, (error) => {
//     console.error(error);
//   });
// };

// export const loadDragAndDropObject = (modelObject) => {
//   let model = modelObject.model;    
//   let isVisible = true;
//   let isLocked = false; 

//   // @note: Lewis - modelScene = true if this is a presaved load of objects
//   if (!modelScene) {
//     const { onDropMouseCoordinates: e, sceneRenderer } = context; 
//     const canvas = sceneRenderer.domElement;
//     const canvasPosition = canvas.getBoundingClientRect();
//     const mousePosition = new THREE.Vector2(); 
//     mousePosition.set(
//       ((e.clientX - canvasPosition.left) / canvas.width) * 2 - 1,
//       -((e.clientY - canvasPosition.top) / canvas.height) * 2 + 1,
//       0.5 );
//     const rayCaster = new THREE.Raycaster();
//     rayCaster.setFromCamera(mousePosition, sceneCamera);
//     let intersects = rayCaster.intersectObject(infinitePlane);
//     if (intersects.length > 0) {
//       model.scene.position.x = intersects[0].point.x; 
//       model.scene.position.y = intersects[0].point.y; 
//       model.scene.position.z = intersects[0].point.z; 
//     };
//   } else {
//     context.currentlyAttachedScene.position.copy(modelScene.position);
//     context.currentlyAttachedScene.rotation.copy(modelScene.rotation);
//     context.currentlyAttachedScene.scale.copy(modelScene.scale);
  
//     isVisible = context.scenes[context.selectedScene].sceneObjects.filter(object => object.label === modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title])[0].visible; 
//     const sceneBackground = new THREE.Color(context.scenes[context.selectedScene].backgroundDisplayColor);
//     context.scene.background = new THREE.Color(sceneBackground.getHex()); 
//   };
  
//   const newObjectOnScene = {
//     id: context.currentlyAttachedScene.uuid,
//     visible: isVisible,
//     locked: isLocked, 
//     label: modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title],
//     modelScene: context.currentlyAttachedScene, 
//     modelObjectInfo: modelObjectInfo,
//   }; 
//   context.currentSceneObjects.push(newObjectOnScene);
//   toggleModelVisibility(newObjectOnScene, context);
//   context.setSelectedSceneObject(newObjectOnScene.label);

//   if (!isLoadedOutsideEditor && isVisible) {
//     sceneGroup.add(transformControlsGizmoMeshesGroup, transformControlsMenuMeshesGroup);
//   } else {
//     context.transformControls.detach();
//   };
// };