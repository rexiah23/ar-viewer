import * as THREE from 'three';

export const loadSceneObjects = (objects, addModelToScene) => {
  objects.forEach(object => {
    // addModelToScene(object.modelObjectInfo, object.modelScene, object.mesh);
    addModelToScene(object.modelObjectInfo, object.modelScene, object.locked, object.visible);
  });
};

export const loadSceneObjectsOutsideEditor = (objects, addModelToScene) => {
  objects.forEach(object => {
    addModelToScene(object.modelObjectInfo, object.modelScene, object.locked, object.visible, true);
  });
};

// @note: Lewis - can't destructure context in arguments because transformControls.attach() does not work; 
export const deleteAllObjectsFromScene = (context) => {
  console.log('this ran');
  context.themeModelsGroup.remove(...context.themeModelsGroup.children);
  context.sceneGroup.remove(context.transformControlsGizmoMeshesGroup, context.transformControlsMenuMeshesGroup);
  context.dragAndDropMeshes.length = 0;
  context.transformControls.detach();
  for (let object in context.countOfEachModelOnScene) delete context.countOfEachModelOnScene[object];
  context.currentSceneObjects.length = 0;
  context.setSelectedSceneObject(null);
};

export const deleteSelectedObjectFromScene = (context) => {
  if (!context.selectedSceneObject) return; 
  let indexOfObjectToBeDeleted = null;
  const objectToBeDeleted = context.currentSceneObjects.filter((object, index) => {
    if (object.label === context.selectedSceneObject) {
      indexOfObjectToBeDeleted = index; 
      return true;
    };
  })[0]; 
  context.themeModelsGroup.remove(context.themeModelsGroup.children[indexOfObjectToBeDeleted]);
  context.sceneGroup.remove(context.transformControlsGizmoMeshesGroup, context.transformControlsMenuMeshesGroup);
  // let nameOfMesh = '';
  let index = context.dragAndDropMeshes.length; 
  while (index--) {
    const object = context.dragAndDropMeshes[index];
    if (object.belongsTo === context.selectedSceneObject) { 
      context.dragAndDropMeshes.splice(index, 1);
    };
  }
  // countOfEachModelOnScene[nameOfMesh]--;
  context.transformControls.detach();
  context.currentSceneObjects.splice(indexOfObjectToBeDeleted, 1);
  context.setSelectedSceneObject(null);
};

export const toggleModelVisibility = (object, context) => {
      context.dragAndDropMeshes.forEach(mesh => {
        if (mesh.belongsTo === object.label) {
          if (object.visible) {
            mesh.layers.enableAll();
          } else {
            mesh.layers.disableAll();
          }
        };
      });
    switchTransformControlsToSelectedObject(object.modelScene, object.locked, object.visible, context); 
};

export const toggleModelLock = (object, context) => {
  if (object.locked) {
    context.transformControlsGizmoMeshesGroup.visible = false; 
    context.transformControlsMenuMeshesGroup.visible = false; 
    context.transformControls.detach();
  } else if (object.visible) {
    context.currentlyAttachedScene = object.modelScene;
    context.transformControlsGizmoMeshesGroup.visible = true; 
    context.transformControlsMenuMeshesGroup.visible = true; 
    context.transformControls.attach(context.currentlyAttachedScene);
  };
};

export const switchTransformControlsToSelectedObject = (modelScene, isModelLocked, isModelVisible, context) => {
  if (context.gizmoMeshes.length === 0) {
    switch(context.nameOfSelectedGizmoMeshParentContext) {
      case 'translateMenuMeshes':
        context.gizmoMeshes = [context.translateGizmoCenterMesh];
      break;
      case 'scaleMenuMeshes':
        context.gizmoMeshes = [context.scaleGizmoCenterMesh];
      break;
      case 'rotateMenuMeshes':
        context.gizmoMeshes = [context.rotateGizmoCenterMesh];
      break;
      default:
        context.gizmoMeshes = [context.translateMenuCenterMesh, context.scaleMenuCenterMesh, context.rotateMenuCenterMesh];
    };
  };
  context.currentlyAttachedScene = modelScene; 
  if (isModelLocked || !isModelVisible) {
    context.transformControls.detach();
    context.transformControlsGizmoMeshesGroup.visible = false; 
    context.transformControlsMenuMeshesGroup.visible = false;
  } else {
    context.transformControls.attach(modelScene);
    context.sceneGroup.add(context.transformControlsGizmoMeshesGroup, context.transformControlsMenuMeshesGroup);
    context.transformControlsGizmoMeshesGroup.visible = true; 
    context.transformControlsMenuMeshesGroup.visible = true;
  };
};
