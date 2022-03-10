import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { normalizeModelScale, placeModelOnFloor, createRaycastSphere } from './helpers/scene-editor/models';

const setUpLights = (lightingGroup, { primaryDirectionalLightContainer }) => {
  // @todo: may investigate PCSS later for proper soft shadows.
  // DEMO: https://threejs.org/examples/?q=shado#webgl_shadowmap_pcss
  // CODE: https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pcss.html
  {
    primaryDirectionalLightContainer.light = new THREE.DirectionalLight( 0xffffff, 1 / 2 );
    const { light } = primaryDirectionalLightContainer; 
    light.position.set(0, 8, 0);
    light.castShadow = true;
    lightingGroup.add(light);

    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    // const light = primaryDirectionalLight; // @todo: check, is this a pointer?
    // light.position.set(0, 8, 0);
    // light.castShadow = true;
    // lightingGroup.add(light);

    // light.shadow.mapSize.width = 512;
    // light.shadow.mapSize.height = 512;
    // light.shadow.camera.near = 0.5;
    // light.shadow.camera.far = 500;
  }
  
  // ..

  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(-4, 4, 4);
    light.layers.set(10);
    lightingGroup.add(light);
  }

  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(4, 4, 4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(-4, 4, -4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(4, 4, -4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  // ..
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(-4, -4, 4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(4, -4, 4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(-4, -4, -4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
  
  {
    const light = new THREE.PointLight(0xffffff, 0.125 / 4, 100);
    light.position.set(4, -4, -4);
    light.layers.set(10);
    lightingGroup.add(light);
  }
};
export const initializeScene = ({
  webGLContainerRef,
  params,
  context,
}) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ alpha: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  webGLContainerRef.current.appendChild( renderer.domElement );

  context.modelGroup = new THREE.Group();
  const { modelGroup } = context;
  scene.add( modelGroup );
  
  context.lightingGroup = new THREE.Group();
  const { lightingGroup } = context;
  scene.add(lightingGroup);
  
  context.cameraControls = new OrbitControls(camera, renderer.domElement);
  const { cameraControls } = context;


  
  const addModelToGroup = (modelFilePath, group_, shouldPlaceOnFloor=false, modelObjectInfo=null, name='', onLoad = () => {}) => {
    const modelObject = {};
    // @todo: abstract out into a dedicated function for model loading.
    // - handle various formats internally.
    const modelFileExtension = modelFilePath.split('.').reverse()[0];
    // if (modelFileExtension === 'glb') {
    if (modelFileExtension === 'glb' || modelFileExtension === 'gltf') {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(modelFilePath, (gltfModel) => {
        // console.log('Finished Loading Model.');
        modelObject.model = gltfModel;
        if (shouldPlaceOnFloor) {
          group_.add(placeModelOnFloor(normalizeModelScale(gltfModel.scene, true)));
        } else {
          group_.add(normalizeModelScale(gltfModel.scene));
          gltfModel.scene.position.y += 5;
        };
  
        if (!!modelObjectInfo) {
          if (!context.countOfEachModelOnScene[modelObjectInfo.title]) {
            context.countOfEachModelOnScene[modelObjectInfo.title] = 1; 
          } else {
            context.countOfEachModelOnScene[modelObjectInfo.title]++; 
          }
          context.currentlyAttachedScene = gltfModel.scene; 
          context.currentlyAttachedScene.belongsTo = modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title];
        };
        
        group_.traverse((node) => {
          if (node.isMesh) {
            // @note: Lewis - this is causing all drag and drop objects to shift everytime a new one is placed
            // node.position.y = -5;
            node.name = name;
            // node.material.envMap = environmentMap;
            node.material.envMapIntensity = 5;
            node.castShadow = true;
            node.receiveShadow = false; // @todo: rethink?
          };
          
          if (node.isMesh && !modelObjectInfo) {
            node.layers.enable(10);
          }
          
          if (node.isMesh && !!modelObjectInfo && !node.alreadyAddedToDragAndDropMeshes) {
            node.belongsTo = modelObjectInfo.title + ' ' + context.countOfEachModelOnScene[modelObjectInfo.title];
            // context.currentlyAttachedScene = node; 
            context.dragAndDropMeshes.push(node);
            node.alreadyAddedToDragAndDropMeshes = true;        
          } 
        }); // @todo: might bring this OUT of this function. maybe. or if-block even.
        // // @todo: modify?
        
        onLoad(modelObject); // @todo: later async/await likely.
      }, (progress) => {
        // console.log('Loading Model:', ((progress.loaded / 1024) / 1024), 'MB');
      }, (error) => {
        console.error(error);
      });
    } else if (modelFileExtension === 'fbx') {
      const fbxLoader = new FBXLoader();
      fbxLoader.load(modelFilePath, (fbxModel) => {
        modelObject.model = fbxModel;
  
        console.log('Finished Loading Model.');
        console.log(fbxModel);
  
        if (fbxModel.animations.length > 0) {
          context.mixer = new THREE.AnimationMixer(fbxModel);
          // const { mixer } = context;
  
          context.modelAnimations = [...fbxModel.animations];
          // const { modelAnimations } = context;
        }
  
        group_.add(placeModelOnFloor(normalizeModelScale(fbxModel)));
        group_.traverse((node) => {
          if (node.isMesh) {
            node.material.envMapIntensity = 15;
            node.castShadow = true;
            node.receiveShadow = false;
          }
        });
        onLoad(modelObject);
      }, (progress) => {
        // console.log('Loading Model:', ((progress.loaded / 1024) / 1024), 'MB');
      }, (error) => {
        console.error(error);
      });
    };
  };
  addModelToGroup(params.modelFilePath, modelGroup, true, null, 'shoe');

  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      render()
  }

  const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };

  function render() {
    renderer.render(scene, camera)
  }

  animate();

  const webGLContainerRefToDestroy = webGLContainerRef.current;

  return () => {
    webGLContainerRefToDestroy.removeChild(renderer.domElement);
  }
}