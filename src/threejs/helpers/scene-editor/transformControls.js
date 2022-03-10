import * as THREE from 'three'; 

export const arrowScaleMultiplier = 8; 
const makeArrowMeshes = (n, geometry, material, positions, rotations) => {
  const meshes = []; 
  for (let i=0; i<n; i++) {
    const newMesh = new THREE.Mesh(geometry, material); 
    const meshPositionX = positions[i][0];
    const meshPositionY = positions[i][1];
    const meshPositionZ = positions[i][2];

    const meshRotationX = rotations[i][0];
    const meshRotationY = rotations[i][1];
    const meshRotationZ = rotations[i][2];

    newMesh.position.set(meshPositionX, meshPositionY, meshPositionZ); 
    // newMesh.rotateX(meshRotationX);
    // newMesh.rotateY(meshRotationY);
    // newMesh.rotateZ(meshRotationZ);
    meshes.push(newMesh);
  };
  return meshes; 
};
const arrowMaterial = new THREE.MeshBasicMaterial({
  depthTest: false,
  transparent: true,
});  
const arrowTopGeometry = new THREE.BoxGeometry(0.1* arrowScaleMultiplier, 0.5* arrowScaleMultiplier, 2.5* arrowScaleMultiplier);
const stickRotate = [
  [Math.PI / 2, 0, Math.PI / 2],
  [0, Math.PI / 2, 0],
];
const gizmoScaleDownAmount = 0.003; 
const curve = new THREE.EllipseCurve(
  0,  0,            // ax, aY
  9.8 * arrowScaleMultiplier, 9.8 * arrowScaleMultiplier,           // xRadius, yRadius
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0      // aRotation
  );

const samples = curve.getPoints( 1000 );
const geometrySpline = new THREE.BufferGeometry().setFromPoints( samples );
const lineMaterial = new THREE.LineDashedMaterial( {  depthTest: false, transparent: true, color: 0xffffff, linewidth: 20, linecap: 'round', dashSize: 15, gapSize: 15 } );
const line = new THREE.Line( geometrySpline, new THREE.LineDashedMaterial( { color: 0xffffff,  depthTest: false,
  transparent: true, linewidth: 20, linecap: 'round', dashSize: 15, gapSize: 15 } ) );
line.computeLineDistances();
line.position.z -= 15;

export const generateTranslateGizmoMeshes = () => {
  const translateGizmoMeshes = new THREE.Group();
  translateGizmoMeshes.name = 'translateGizmoMeshes';
  const translateStickGeometry = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 10 * arrowScaleMultiplier);
  const translateStickMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true,
    depthTest: false});
  const translateStickMeshes = makeArrowMeshes(2, translateStickGeometry, translateStickMaterial, [[0,0,0], [0,0,0]], stickRotate); 
  const verticalStick = translateStickMeshes[0];
  const horizontalStick = translateStickMeshes[1];

  verticalStick.rotateX(Math.PI / 2);
  verticalStick.rotateZ(Math.PI / 2);
  horizontalStick.rotateY(Math.PI / 2);

  const topArrowLeft = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeft.position.set(
    verticalStick.position.x - 0.9 * arrowScaleMultiplier, 
    verticalStick.position.y + 4 * arrowScaleMultiplier, 
    verticalStick.position.z ,
  );
  topArrowLeft.rotateZ(Math.PI / 4);
  topArrowLeft.rotateY(Math.PI / 2);

  const topArrowRight = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRight.position.set(
    verticalStick.position.x + 0.9 * arrowScaleMultiplier,
    verticalStick.position.y + 4 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  topArrowRight.rotateZ(-Math.PI / 4);
  topArrowRight.rotateY(Math.PI / 2);

  const rightArrowLeft = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  rightArrowLeft.position.set(
    verticalStick.position.x + 4 * arrowScaleMultiplier,
    verticalStick.position.y + 0.9 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  rightArrowLeft.rotateZ(-Math.PI / 4);
  rightArrowLeft.rotateY(Math.PI / 2);

  const rightArrowRight = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  rightArrowRight.position.set(
    verticalStick.position.x + 4 * arrowScaleMultiplier,
    verticalStick.position.y - 0.9 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  rightArrowRight.rotateZ(Math.PI / 4);
  rightArrowRight.rotateY(Math.PI / 2);

  const bottomArrowLeft = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeft.position.set(
    verticalStick.position.x - 0.9 * arrowScaleMultiplier,
    verticalStick.position.y - 4 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  bottomArrowLeft.rotateZ(-Math.PI / 4);
  bottomArrowLeft.rotateY(Math.PI / 2);

  const bottomArrowRight = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRight.position.set(
    verticalStick.position.x + 0.9 * arrowScaleMultiplier, 
    verticalStick.position.y - 4 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  bottomArrowRight.rotateZ(Math.PI / 4);
  bottomArrowRight.rotateY(Math.PI / 2);

  const leftArrowLeft = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  leftArrowLeft.position.set(
    verticalStick.position.x - 4 * arrowScaleMultiplier,
    verticalStick.position.y - 0.9 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  leftArrowLeft.rotateY(Math.PI / 2);
  leftArrowLeft.rotateX(Math.PI / 4);

  const leftArrowRight = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  leftArrowRight.position.set(
    verticalStick.position.x - 4 * arrowScaleMultiplier,
    verticalStick.position.y + 0.9 * arrowScaleMultiplier,
    verticalStick.position.z
  );
  leftArrowRight.rotateY(-Math.PI / 2);
  leftArrowRight.rotateX(Math.PI / 4);

  const customCircleMaterial = new THREE.MeshBasicMaterial({
    depthTest: false,
    transparent: true,
  });
  const customCircleGeometry= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
  customCircleMaterial.color.setHex(0x676767);
  customCircleMaterial.opacity = 0.6;
  customCircleMaterial.depthTest = false;

  const translateGizmoCenterMesh = new THREE.Mesh(customCircleGeometry, customCircleMaterial);
  translateGizmoCenterMesh.position.z -= 15;
  const curve = new THREE.EllipseCurve(
  0,  0,            // ax, aY
  9.8 * arrowScaleMultiplier, 9.8 * arrowScaleMultiplier,           // xRadius, yRadius
  0,  2 * Math.PI,  // aStartAngle, aEndAngle
  false,            // aClockwise
  0      // aRotation
  );
  const samples = curve.getPoints( 1000 );
  const geometrySpline = new THREE.BufferGeometry().setFromPoints( samples );
  const lineMaterial = new THREE.LineDashedMaterial( {  depthTest: false, transparent: true, color: 0xffffff, linewidth: 20, linecap: 'round', dashSize: 15, gapSize: 15 } );
  const line = new THREE.Line( geometrySpline, new THREE.LineDashedMaterial( { color: 0xffffff,  depthTest: false,
    transparent: true, linewidth: 20, linecap: 'round', dashSize: 15, gapSize: 15 } ) );
  line.computeLineDistances();
  line.position.z -= 15;

  translateGizmoMeshes.add(
  line, 
  translateGizmoCenterMesh,
  verticalStick,
  horizontalStick, 
  topArrowLeft, 
  topArrowRight,
  rightArrowLeft,
  rightArrowRight,
  bottomArrowLeft,
  bottomArrowRight,
  leftArrowLeft,
  leftArrowRight
  );
  translateGizmoMeshes.scale.x *= gizmoScaleDownAmount;
  translateGizmoMeshes.scale.y *= gizmoScaleDownAmount;
  translateGizmoMeshes.scale.z *= gizmoScaleDownAmount;
  return { translateGizmoMeshes, translateGizmoCenterMesh }; 
};

export const generateTranslateMenuMeshes = () => {
  const translateMenuMeshes = new THREE.Group();
  translateMenuMeshes.name = 'translateMenuMeshes';
  const translateStickGeometryV2 = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 10 * arrowScaleMultiplier);
  const translateStickMaterialV2 = new THREE.MeshBasicMaterial({ color: 0xffffff,  depthTest: false,
    transparent: true,});
  const translateStickMeshesV2 = makeArrowMeshes(2, translateStickGeometryV2, translateStickMaterialV2, [[0,0,0], [0,0,0]], stickRotate); 
  const verticalStickV2 = translateStickMeshesV2[0];
  const horizontalStickV2 = translateStickMeshesV2[1];
  
  verticalStickV2.rotateX(Math.PI / 2);
  verticalStickV2.rotateZ(Math.PI / 2);
  horizontalStickV2.rotateY(Math.PI / 2);
  
  const topArrowLeftV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeftV2.position.set(
    verticalStickV2.position.x - 0.9 * arrowScaleMultiplier, 
    verticalStickV2.position.y + 4 * arrowScaleMultiplier, 
    verticalStickV2.position.z ,
  );
  topArrowLeftV2.rotateZ(Math.PI / 4);
  topArrowLeftV2.rotateY(Math.PI / 2);
  
  const topArrowRightV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRightV2.position.set(
    verticalStickV2.position.x + 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.y + 4 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  topArrowRightV2.rotateZ(-Math.PI / 4);
  topArrowRightV2.rotateY(Math.PI / 2);
  
  const rightArrowLeftV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  rightArrowLeftV2.position.set(
    verticalStickV2.position.x + 4 * arrowScaleMultiplier,
    verticalStickV2.position.y + 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  rightArrowLeftV2.rotateZ(-Math.PI / 4);
  rightArrowLeftV2.rotateY(Math.PI / 2);
  
  const rightArrowRightV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  rightArrowRightV2.position.set(
    verticalStickV2.position.x + 4 * arrowScaleMultiplier,
    verticalStickV2.position.y - 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  rightArrowRightV2.rotateZ(Math.PI / 4);
  rightArrowRightV2.rotateY(Math.PI / 2);
  
  const bottomArrowLeftV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeftV2.position.set(
    verticalStickV2.position.x - 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.y - 4 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  bottomArrowLeftV2.rotateZ(-Math.PI / 4);
  bottomArrowLeftV2.rotateY(Math.PI / 2);
  
  const bottomArrowRightV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRightV2.position.set(
    verticalStickV2.position.x + 0.9 * arrowScaleMultiplier, 
    verticalStickV2.position.y - 4 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  bottomArrowRightV2.rotateZ(Math.PI / 4);
  bottomArrowRightV2.rotateY(Math.PI / 2);
  
  const leftArrowLeftV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  leftArrowLeftV2.position.set(
    verticalStickV2.position.x - 4 * arrowScaleMultiplier,
    verticalStickV2.position.y - 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  leftArrowLeftV2.rotateY(Math.PI / 2);
  leftArrowLeftV2.rotateX(Math.PI / 4);
  
  const leftArrowRightV2 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  leftArrowRightV2.position.set(
    verticalStickV2.position.x - 4 * arrowScaleMultiplier,
    verticalStickV2.position.y + 0.9 * arrowScaleMultiplier,
    verticalStickV2.position.z
  );
  leftArrowRightV2.rotateY(-Math.PI / 2);
  leftArrowRightV2.rotateX(Math.PI / 4);
  
  const customCircleMaterialV2 = new THREE.MeshBasicMaterial({
    depthTest: false,
    transparent: true,
  });
  const customCircleGeometryV2= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
  customCircleMaterialV2.color.setHex(0x676767);
  customCircleMaterialV2.opacity = 0.6;
  
  const translateMenuCenterMesh = new THREE.Mesh(customCircleGeometryV2, customCircleMaterialV2);
  translateMenuCenterMesh.position.z -= 15;
  
  const lineV2 = new THREE.Line( geometrySpline, lineMaterial );
  lineV2.computeLineDistances();
  lineV2.position.z -= 15;
  
  translateMenuMeshes.add(
    lineV2, 
    translateMenuCenterMesh,
    verticalStickV2,
    horizontalStickV2, 
    topArrowLeftV2, 
    topArrowRightV2,
    rightArrowLeftV2,
    rightArrowRightV2,
    bottomArrowLeftV2,
    bottomArrowRightV2,
    leftArrowLeftV2,
    leftArrowRightV2,
  );
  
  translateMenuMeshes.scale.x *= gizmoScaleDownAmount;
  translateMenuMeshes.scale.y *= gizmoScaleDownAmount;
  translateMenuMeshes.scale.z *= gizmoScaleDownAmount;

  return { translateMenuMeshes, translateMenuCenterMesh }
};

export const generateScaleGizmoMeshes = () => {
  const scaleGizmoMeshes = new THREE.Group();
  scaleGizmoMeshes.name = 'scaleGizmoMeshes';
  const scaleStickGeometry = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 4 * arrowScaleMultiplier);
  const scaleStickMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true,
    depthTest: false});
  const scaleStickMeshes = makeArrowMeshes(2, scaleStickGeometry, scaleStickMaterial, [[0,0,0], [0,0,0]], stickRotate); 
  const verticalStickV3 = scaleStickMeshes[0];
  const horizontalStickV3 = scaleStickMeshes[1];

  verticalStickV3.rotateX(Math.PI / 2);
  verticalStickV3.rotateY(-Math.PI / 4);
  verticalStickV3.rotateZ(-Math.PI / 2);

  horizontalStickV3.rotateX(Math.PI / 2);
  horizontalStickV3.rotateY(-Math.PI / 4);
  horizontalStickV3.rotateZ(-Math.PI / 4);


  verticalStickV3.position.x += 15; 
  verticalStickV3.position.y += 15; 

  horizontalStickV3.position.x -= 15; 
  horizontalStickV3.position.y -= 15; 

  const topArrowLeftV3 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeftV3.position.set(
    verticalStickV3.position.x - 5.45 * arrowScaleMultiplier, 
    verticalStickV3.position.y - 4.4235 * arrowScaleMultiplier, 
    verticalStickV3.position.z ,
  );
  topArrowLeftV3.rotateX(Math.PI / 2);
  topArrowLeftV3.rotateZ(Math.PI / 2);

  const topArrowRightV3 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRightV3.position.set(
    verticalStickV3.position.x - 4.4235 * arrowScaleMultiplier,
    verticalStickV3.position.y - 5.45 * arrowScaleMultiplier,
    verticalStickV3.position.z
  );
  topArrowRightV3.rotateX(Math.PI / 2);
  topArrowRightV3.rotateY(-Math.PI / 2);
  topArrowRightV3.rotateZ(Math.PI / 2);

  const bottomArrowLeftV3 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeftV3.position.set(
    horizontalStickV3.position.x + 5.45 * arrowScaleMultiplier,
    horizontalStickV3.position.y + 4.4235 * arrowScaleMultiplier,
    horizontalStickV3.position.z
  );
  bottomArrowLeftV3.rotateX(Math.PI / 2);
  bottomArrowLeftV3.rotateZ(Math.PI / 2);

  const bottomArrowRightV3 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRightV3.position.set(
    horizontalStickV3.position.x + 4.4235 * arrowScaleMultiplier, 
    horizontalStickV3.position.y + 5.45 * arrowScaleMultiplier,
    horizontalStickV3.position.z
  );
  bottomArrowRightV3.rotateX(Math.PI / 2);
  bottomArrowRightV3.rotateY(-Math.PI / 2);
  bottomArrowRightV3.rotateZ(Math.PI / 2);

  const customCircleMaterialV3 = new THREE.MeshBasicMaterial({
    depthTest: false,
    transparent: true,
  });
  const customCircleGeometryV3= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
  customCircleMaterialV3.color.setHex(0xffffff);
  customCircleMaterialV3.color.setHex(0x676767);
  customCircleMaterialV3.opacity = 0.6;
  const scaleGizmoCenterMesh = new THREE.Mesh(customCircleGeometryV3, customCircleMaterialV3);
  scaleGizmoCenterMesh.position.z -= 15;

  const lineV3 = new THREE.Line( geometrySpline, lineMaterial );
  lineV3.computeLineDistances();
  lineV3.position.z -= 15;

  scaleGizmoMeshes.add(
      lineV3,
      verticalStickV3,
      horizontalStickV3,
      topArrowLeftV3, 
      topArrowRightV3, 
      bottomArrowLeftV3,
      bottomArrowRightV3,
      scaleGizmoCenterMesh
    );

  scaleGizmoMeshes.scale.x *= gizmoScaleDownAmount;
  scaleGizmoMeshes.scale.y *= gizmoScaleDownAmount;
  scaleGizmoMeshes.scale.z *= gizmoScaleDownAmount;

  return { scaleGizmoMeshes, scaleGizmoCenterMesh }
};

export const generateScaleMenuMeshes = () => {
  const scaleStickGeometry = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 4 * arrowScaleMultiplier);
  const scaleStickMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true,
    depthTest: false});

  const customCircleMaterialV3 = new THREE.MeshBasicMaterial({
    depthTest: false,
    transparent: true,
  });
  const customCircleGeometryV3= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
  customCircleMaterialV3.color.setHex(0xffffff);
  customCircleMaterialV3.color.setHex(0x676767);
  customCircleMaterialV3.opacity = 0.6;

  const scaleMenuMeshes = new THREE.Group();
  scaleMenuMeshes.name = 'scaleMenuMeshes';
  const scaleStickMeshesV2 = makeArrowMeshes(2, scaleStickGeometry, scaleStickMaterial, [[0,0,0], [0,0,0]], stickRotate); 
  const verticalStickV4 = scaleStickMeshesV2[0];
  const horizontalStickV4 = scaleStickMeshesV2[1];

  verticalStickV4.rotateX(Math.PI / 2);
  verticalStickV4.rotateY(-Math.PI / 4);
  verticalStickV4.rotateZ(-Math.PI / 2);

  horizontalStickV4.rotateX(Math.PI / 2);
  horizontalStickV4.rotateY(-Math.PI / 4);
  horizontalStickV4.rotateZ(-Math.PI / 4);


  verticalStickV4.position.x += 15; 
  verticalStickV4.position.y += 15; 

  horizontalStickV4.position.x -= 15; 
  horizontalStickV4.position.y -= 15; 

  const topArrowLeftV4 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeftV4.position.set(
    verticalStickV4.position.x - 5.45 * arrowScaleMultiplier, 
    verticalStickV4.position.y - 4.4235 * arrowScaleMultiplier, 
    verticalStickV4.position.z ,
  );
  topArrowLeftV4.rotateX(Math.PI / 2);
  topArrowLeftV4.rotateZ(Math.PI / 2);

  const topArrowRightV4 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRightV4.position.set(
    verticalStickV4.position.x - 4.4235 * arrowScaleMultiplier,
    verticalStickV4.position.y - 5.45 * arrowScaleMultiplier,
    verticalStickV4.position.z
  );
  topArrowRightV4.rotateX(Math.PI / 2);
  topArrowRightV4.rotateY(-Math.PI / 2);
  topArrowRightV4.rotateZ(Math.PI / 2);

  const bottomArrowLeftV4 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeftV4.position.set(
    horizontalStickV4.position.x + 5.45 * arrowScaleMultiplier,
    horizontalStickV4.position.y + 4.4235 * arrowScaleMultiplier,
    horizontalStickV4.position.z
  );
  bottomArrowLeftV4.rotateX(Math.PI / 2);
  bottomArrowLeftV4.rotateZ(Math.PI / 2);

  const bottomArrowRightV4 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRightV4.position.set(
    horizontalStickV4.position.x + 4.4235 * arrowScaleMultiplier, 
    horizontalStickV4.position.y + 5.45 * arrowScaleMultiplier,
    horizontalStickV4.position.z
  );
  bottomArrowRightV4.rotateX(Math.PI / 2);
  bottomArrowRightV4.rotateY(-Math.PI / 2);
  bottomArrowRightV4.rotateZ(Math.PI / 2);

  const scaleMenuCenterMesh = new THREE.Mesh(customCircleGeometryV3, customCircleMaterialV3);
  scaleMenuCenterMesh.position.z -= 15;

  const lineV4 = new THREE.Line( geometrySpline, lineMaterial );
  lineV4.computeLineDistances();
  lineV4.position.z -= 15;

  scaleMenuMeshes.add(
    lineV4,
    verticalStickV4,
    horizontalStickV4,
    topArrowLeftV4, 
    topArrowRightV4, 
    bottomArrowLeftV4,
    bottomArrowRightV4,
    scaleMenuCenterMesh,
  );

  scaleMenuMeshes.scale.x *= gizmoScaleDownAmount;
  scaleMenuMeshes.scale.y *= gizmoScaleDownAmount;
  scaleMenuMeshes.scale.z *= gizmoScaleDownAmount;

  return { scaleMenuMeshes, scaleMenuCenterMesh };
};

export const generateRotateGizmoMeshes = () => {
  const rotateGizmoMeshes = new THREE.Group();
  rotateGizmoMeshes.name = 'rotateGizmoMeshes';
  const rotateStickGeometry = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 10 * arrowScaleMultiplier);
  const rotateStickMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true,
    depthTest: false});
  const rotateStickMeshes = makeArrowMeshes(2, rotateStickGeometry, rotateStickMaterial, [[0,0,0], [0,0,0]], stickRotate); 
  const leftStickV3 = rotateStickMeshes[0];
  // const rightStickV2 = rotateStickMeshes[1];
  
  leftStickV3.rotateZ(Math.PI / 2);
  leftStickV3.rotateX(Math.PI / 2);
  const customCircleMaterialV5 = new THREE.MeshBasicMaterial({
    depthTest: false,
    transparent: true,
  });
  
  const rotateGizmoStickCurve = new THREE.EllipseCurve(
    0,  0,            // ax, aY
    5 * arrowScaleMultiplier, 5 * arrowScaleMultiplier,           // xRadius, yRadius
    Math.PI / 2, Math.PI * 1.3,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0      // aRotation
    );
    const samples2 = rotateGizmoStickCurve.getPoints( 1000 );
    const rotateGizmoStickGeometry = new THREE.BufferGeometry().setFromPoints( samples2 );
    const rotateGizmoStickMesh = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
    rotateGizmoStickMesh.rotateZ(Math.PI / 6)
    rotateGizmoStickMesh.position.x -= 1;
    const rotateGizmoStickMeshV2 = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
    rotateGizmoStickMeshV2.rotateZ(-Math.PI + Math.PI / 6);
    rotateGizmoStickMeshV2.position.x += 1;
  
  const topArrowLeftV5 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeftV5.position.set(
    rotateGizmoStickMesh.position.x - 27, 
    rotateGizmoStickMesh.position.y + 42, 
    rotateGizmoStickMesh.position.z ,
  );
  
  topArrowLeftV5.rotateX(Math.PI / 2);
  topArrowLeftV5.rotateY(Math.PI / 4);
  
  const topArrowRightV5 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRightV5.position.set(
    rotateGizmoStickMeshV2.position.x - 27,
    rotateGizmoStickMeshV2.position.y + 26,
    rotateGizmoStickMeshV2.position.z
  );
  topArrowRightV5.rotateX(Math.PI / 2);
  topArrowRightV5.rotateY(-Math.PI /6);
  
  const bottomArrowLeftV5 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeftV5.position.set(
    rotateGizmoStickMeshV2.position.x + 25,
    rotateGizmoStickMeshV2.position.y - 43,
    rotateGizmoStickMeshV2.position.z
  );
  bottomArrowLeftV5.rotateX(Math.PI / 2);
  bottomArrowLeftV5.rotateY(Math.PI / 6);
  
  const bottomArrowRightV5 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRightV5.position.set(
    bottomArrowLeftV5.position.x, 
    bottomArrowLeftV5.position.y + 17,
    bottomArrowLeftV5.position.z
  );
  bottomArrowRightV5.rotateX(Math.PI / 2);
  bottomArrowRightV5.rotateY(-Math.PI / 6);
  
  const customCircleGeometryV5= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
  customCircleMaterialV5.color.setHex(0x676767);
  customCircleMaterialV5.opacity = 0.6;
  
  const rotateGizmoCenterMesh = new THREE.Mesh(customCircleGeometryV5, customCircleMaterialV5);
  rotateGizmoCenterMesh.position.z -= 15;
  
  const lineV5 = new THREE.Line( geometrySpline, lineMaterial );
  lineV5.computeLineDistances();
  lineV5.position.z -= 15;
  
    rotateGizmoMeshes.add(
      lineV5,
      rotateGizmoStickMesh,
      rotateGizmoStickMeshV2,
      rotateGizmoCenterMesh,
      topArrowLeftV5,
      topArrowRightV5,
      bottomArrowLeftV5,
      bottomArrowRightV5,
    );
  
  rotateGizmoMeshes.scale.x *= gizmoScaleDownAmount;
  rotateGizmoMeshes.scale.y *= gizmoScaleDownAmount;

  return { rotateGizmoMeshes, rotateGizmoCenterMesh };
};

export const generateRotateMenuMeshes = () => {
  const rotateStickGeometry = new THREE.BoxGeometry(0.1 * arrowScaleMultiplier, 0.5 * arrowScaleMultiplier, 10 * arrowScaleMultiplier);
  const rotateStickMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true,
    depthTest: false});

    const rotateGizmoStickCurve = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      5 * arrowScaleMultiplier, 5 * arrowScaleMultiplier,           // xRadius, yRadius
      Math.PI / 2, Math.PI * 1.3,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0      // aRotation
      );
      
    const samples2 = rotateGizmoStickCurve.getPoints( 1000 );
    const rotateGizmoStickGeometry = new THREE.BufferGeometry().setFromPoints( samples2 );
    const rotateGizmoStickMesh = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
    rotateGizmoStickMesh.rotateZ(Math.PI / 6)
    rotateGizmoStickMesh.position.x -= 1;
    const rotateGizmoStickMeshV2 = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
    rotateGizmoStickMeshV2.rotateZ(-Math.PI + Math.PI / 6);
    rotateGizmoStickMeshV2.position.x += 1;
    const customCircleMaterialV5 = new THREE.MeshBasicMaterial({
      depthTest: false,
      transparent: true,
    });
    const customCircleGeometryV5= new THREE.CircleGeometry(10 * arrowScaleMultiplier, 32);
    customCircleMaterialV5.color.setHex(0x676767);
    customCircleMaterialV5.opacity = 0.6;
   
  // GIZMO - menu: rotate
  const rotateMenuMeshes = new THREE.Group();
  rotateMenuMeshes.name = 'rotateMenuMeshes';
  const rotateStickMeshesV2 = makeArrowMeshes(2, rotateStickGeometry, rotateStickMaterial, [[0,0,0], [0,0,0]], stickRotate); 
  const leftStickV4 = rotateStickMeshesV2[0];
  // const rightStickV4 = rotateStickMeshesV2[1];
  leftStickV4.rotateY(Math.PI / 2);

  const rotateGizmoStickMeshV3 = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
  rotateGizmoStickMeshV3.rotateZ(Math.PI / 6)
  rotateGizmoStickMeshV3.position.x -= 1;
    const rotateGizmoStickMeshV4 = new THREE.Line( rotateGizmoStickGeometry, new THREE.LineDashedMaterial({ color: 0xffffff,  depthTest: false, transparent: true,}));
    rotateGizmoStickMeshV4.rotateZ(-Math.PI + Math.PI / 6);
    rotateGizmoStickMeshV4.position.x += 1;

  const topArrowLeftV6 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowLeftV6.position.set(
    rotateGizmoStickMeshV3.position.x - 27, 
    rotateGizmoStickMeshV3.position.y + 42, 
    rotateGizmoStickMeshV3.position.z ,
  );

  topArrowLeftV6.rotateX(Math.PI / 2);
  topArrowLeftV6.rotateY(Math.PI / 4);

  const topArrowRightV6 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  topArrowRightV6.position.set(
    rotateGizmoStickMeshV3.position.x - 27,
    rotateGizmoStickMeshV3.position.y + 26,
    rotateGizmoStickMeshV3.position.z
  );
  topArrowRightV6.rotateX(Math.PI / 2);
  topArrowRightV6.rotateY(-Math.PI /6);

  const bottomArrowLeftV6 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowLeftV6.position.set(
    rotateGizmoStickMeshV4.position.x + 25,
    rotateGizmoStickMeshV4.position.y - 43,
    rotateGizmoStickMeshV4.position.z
  );
  bottomArrowLeftV6.rotateX(Math.PI / 2);
  bottomArrowLeftV6.rotateY(Math.PI / 6);

  const bottomArrowRightV6 = new THREE.Mesh(arrowTopGeometry, arrowMaterial); 
  bottomArrowRightV6.position.set(
    bottomArrowLeftV6.position.x, 
    bottomArrowLeftV6.position.y + 17,
    bottomArrowLeftV6.position.z
  );
  bottomArrowRightV6.rotateX(Math.PI / 2);
  bottomArrowRightV6.rotateY(-Math.PI / 6);

  const rotateMenuCenterMesh = new THREE.Mesh(customCircleGeometryV5, customCircleMaterialV5);
  rotateMenuCenterMesh.position.z -= 15;

  const lineV6 = new THREE.Line(geometrySpline,  lineMaterial);
  lineV6.computeLineDistances();
  lineV6.position.z -= 15;

  rotateMenuMeshes.add(
    lineV6,
    rotateGizmoStickMeshV3,
    rotateGizmoStickMeshV4,
    rotateMenuCenterMesh,
    topArrowLeftV6,
    topArrowRightV6,
    bottomArrowLeftV6,
    bottomArrowRightV6,
  );

  rotateMenuMeshes.scale.x *= gizmoScaleDownAmount;
  rotateMenuMeshes.scale.y *= gizmoScaleDownAmount;
  rotateMenuMeshes.scale.z *= gizmoScaleDownAmount;

  return { rotateMenuMeshes, rotateMenuCenterMesh };
};