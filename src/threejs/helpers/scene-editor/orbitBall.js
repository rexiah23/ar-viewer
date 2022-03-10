export const generateOrbitBallProperties = (THREE) => {
  const orbitBallGroup = new THREE.Group();
  orbitBallGroup.scale.x *= 0.125; 
  orbitBallGroup.scale.y *= 0.125; 
  orbitBallGroup.scale.z *= 0.125; 
  const sphereMaterial = new THREE.MeshBasicMaterial( { color: 'gray' } ); // @note - Lewis to show contrast between sphere and spokes
  const sphereGeometry = new THREE.SphereGeometry(1.25);
  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.name = 'sphere';
  
  const sphereGroup = new THREE.Group();
  sphereGroup.add(sphere);
  sphereGroup.name = 'sphereGroup';
  
  let verticalSpoke1, verticalSpoke2, verticalSpoke3, verticalSpoke4, verticalSpoke5, verticalSpoke6;
  let shortHorizontalSpoke1, shortHorizontalSpoke2, shortHorizontalSpoke3,
  shortHorizontalSpoke4, shortHorizontalSpoke5, shortHorizontalSpoke6;  
  let shortHorizontalSpoke1V2, shortHorizontalSpoke2V2, shortHorizontalSpoke3V2,
  shortHorizontalSpoke4V2, shortHorizontalSpoke5V2, shortHorizontalSpoke6V2;  
  let longHorizontalSpoke1, longHorizontalSpoke2, longHorizontalSpoke3,
  longHorizontalSpoke4,longHorizontalSpoke5,longHorizontalSpoke6;
  let longHorizontalSpoke1V2, longHorizontalSpoke2V2, longHorizontalSpoke3V2,
  longHorizontalSpoke4V2,longHorizontalSpoke5V2,longHorizontalSpoke6V2;
  
  
  const verticalSpokeGeometry = new THREE.BoxGeometry( .2, .2, 3 );
  
  const xAxisSpokeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000
  });
  const yAxisSpokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00
  });
  const zAxisSpokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF
  });
  
  verticalSpoke1 = new THREE.Mesh( verticalSpokeGeometry, yAxisSpokeMaterial );
  verticalSpoke2 = new THREE.Mesh( verticalSpokeGeometry, yAxisSpokeMaterial );
  verticalSpoke3 = new THREE.Mesh( verticalSpokeGeometry, zAxisSpokeMaterial );
  verticalSpoke4 = new THREE.Mesh( verticalSpokeGeometry, xAxisSpokeMaterial );
  verticalSpoke5 = new THREE.Mesh( verticalSpokeGeometry, zAxisSpokeMaterial );
  verticalSpoke6 = new THREE.Mesh( verticalSpokeGeometry, xAxisSpokeMaterial );
  
  verticalSpoke1.name = 'verticalSpoke1';
  verticalSpoke2.name = 'verticalSpoke2';
  verticalSpoke3.name = 'verticalSpoke3';
  verticalSpoke4.name = 'verticalSpoke4';
  verticalSpoke5.name = 'verticalSpoke5';
  verticalSpoke6.name = 'verticalSpoke6';
  
  
  verticalSpoke1.position.set
  (
    sphere.position.x, 
    sphere.position.y + 1, 
    sphere.position.z
  );
  verticalSpoke1.rotation.x += (Math.PI / 2);
  
  
  verticalSpoke2.position.set
  (
    -sphere.position.x, 
    -sphere.position.y - 1, 
    -sphere.position.z
  );
  verticalSpoke2.rotation.x += (Math.PI / 2);
  
  verticalSpoke3.position.set
  (
    sphere.position.x, 
    sphere.position.y, 
    sphere.position.z + 1
    );
  verticalSpoke3.rotation.z += (Math.PI / 2);
  
  verticalSpoke4.position.set
  (
  -sphere.position.x + 1, 
  -sphere.position.y, 
  -sphere.position.z 
  );
  verticalSpoke4.rotation.y += (Math.PI / 2);
  
  verticalSpoke5.position.set
  (
    sphere.position.x, 
    -sphere.position.y, 
    sphere.position.z - 1
  );
  
  verticalSpoke6.position.set
  (
    sphere.position.x - 1, 
    sphere.position.y, 
    sphere.position.z
  );
  verticalSpoke6.rotation.y += (Math.PI / 2);
  
  const shortHorizontalSpokeGeometry = new THREE.BoxGeometry( .25, .25, 1 );
  
  shortHorizontalSpoke1 = new THREE.Mesh( shortHorizontalSpokeGeometry, yAxisSpokeMaterial );
  shortHorizontalSpoke2 = new THREE.Mesh( shortHorizontalSpokeGeometry, yAxisSpokeMaterial );
  shortHorizontalSpoke3 = new THREE.Mesh( shortHorizontalSpokeGeometry, zAxisSpokeMaterial );
  shortHorizontalSpoke4 = new THREE.Mesh( shortHorizontalSpokeGeometry, xAxisSpokeMaterial );
  shortHorizontalSpoke5 = new THREE.Mesh( shortHorizontalSpokeGeometry, zAxisSpokeMaterial );
  shortHorizontalSpoke6 = new THREE.Mesh( shortHorizontalSpokeGeometry, xAxisSpokeMaterial );
  shortHorizontalSpoke1V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, yAxisSpokeMaterial );
  shortHorizontalSpoke2V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, yAxisSpokeMaterial );
  shortHorizontalSpoke3V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, zAxisSpokeMaterial );
  shortHorizontalSpoke4V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, xAxisSpokeMaterial );
  shortHorizontalSpoke5V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, zAxisSpokeMaterial );
  shortHorizontalSpoke6V2 = new THREE.Mesh( shortHorizontalSpokeGeometry, xAxisSpokeMaterial );
  
  shortHorizontalSpoke1.name = 'shortHorizontalSpoke1';
  shortHorizontalSpoke2.name = 'shortHorizontalSpoke2';
  shortHorizontalSpoke3.name = 'shortHorizontalSpoke3';
  shortHorizontalSpoke4.name = 'shortHorizontalSpoke4';
  shortHorizontalSpoke5.name = 'shortHorizontalSpoke5';
  shortHorizontalSpoke6.name = 'shortHorizontalSpoke6';
  shortHorizontalSpoke1V2.name = 'shortHorizontalSpoke1V2';
  shortHorizontalSpoke2V2.name = 'shortHorizontalSpoke2V2';
  shortHorizontalSpoke3V2.name = 'shortHorizontalSpoke3V2';
  shortHorizontalSpoke4V2.name = 'shortHorizontalSpoke4V2';
  shortHorizontalSpoke5V2.name = 'shortHorizontalSpoke5V2';
  shortHorizontalSpoke6V2.name = 'shortHorizontalSpoke6V2';
  
  const longHorizontalSpokeGeometry = new THREE.BoxGeometry( .25, .25, 2 );
  longHorizontalSpoke1 = new THREE.Mesh( longHorizontalSpokeGeometry, yAxisSpokeMaterial );
  longHorizontalSpoke2 = new THREE.Mesh( longHorizontalSpokeGeometry, yAxisSpokeMaterial );
  longHorizontalSpoke3 = new THREE.Mesh( longHorizontalSpokeGeometry, zAxisSpokeMaterial );
  longHorizontalSpoke4 = new THREE.Mesh( longHorizontalSpokeGeometry, xAxisSpokeMaterial );
  longHorizontalSpoke5 = new THREE.Mesh( longHorizontalSpokeGeometry, zAxisSpokeMaterial );
  longHorizontalSpoke6 = new THREE.Mesh( longHorizontalSpokeGeometry, xAxisSpokeMaterial );
  longHorizontalSpoke1V2 = new THREE.Mesh( longHorizontalSpokeGeometry, yAxisSpokeMaterial );
  longHorizontalSpoke2V2 = new THREE.Mesh( longHorizontalSpokeGeometry, yAxisSpokeMaterial );
  longHorizontalSpoke3V2 = new THREE.Mesh( longHorizontalSpokeGeometry, zAxisSpokeMaterial );
  longHorizontalSpoke4V2 = new THREE.Mesh( longHorizontalSpokeGeometry, xAxisSpokeMaterial );
  longHorizontalSpoke5V2 = new THREE.Mesh( longHorizontalSpokeGeometry, zAxisSpokeMaterial );
  longHorizontalSpoke6V2 = new THREE.Mesh( longHorizontalSpokeGeometry, xAxisSpokeMaterial );
  
  longHorizontalSpoke1.name = 'longHorizontalSpoke1';
  longHorizontalSpoke2.name = 'longHorizontalSpoke2';
  longHorizontalSpoke3.name = 'longHorizontalSpoke3';
  longHorizontalSpoke4.name = 'longHorizontalSpoke4';
  longHorizontalSpoke5.name = 'longHorizontalSpoke5';
  longHorizontalSpoke6.name = 'longHorizontalSpoke6';
  longHorizontalSpoke1V2.name = 'longHorizontalSpoke1V2';
  longHorizontalSpoke2V2.name = 'longHorizontalSpoke2V2';
  longHorizontalSpoke3V2.name = 'longHorizontalSpoke3V2';
  longHorizontalSpoke4V2.name = 'longHorizontalSpoke4V2';
  longHorizontalSpoke5V2.name = 'longHorizontalSpoke5V2';
  longHorizontalSpoke6V2.name = 'longHorizontalSpoke6V2';
  //
  
  shortHorizontalSpoke1.position.set
  (
    verticalSpoke1.position.x, 
    verticalSpoke1.position.y + 1.6, 
    verticalSpoke1.position.z
  );
  shortHorizontalSpoke2.position.set
  (
    -verticalSpoke1.position.x, 
    -verticalSpoke1.position.y - 1.6, 
    -verticalSpoke1.position.z
  );
  shortHorizontalSpoke3.position.set
  (
  -verticalSpoke1.position.x, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z + 2.5
  );
  shortHorizontalSpoke3.rotation.x += (Math.PI / 2)
  shortHorizontalSpoke4.position.set
  (
  -verticalSpoke1.position.x + 2.5, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z
  );
  shortHorizontalSpoke5.position.set
  (
  -verticalSpoke1.position.x , 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z - 2.5
  );
  shortHorizontalSpoke5.rotation.x += (Math.PI / 2)
  shortHorizontalSpoke5.rotation.y += (Math.PI / 2)
  
  shortHorizontalSpoke6.position.set
  (
  -verticalSpoke1.position.x - 2.5, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z
  );
  
  //
  
  shortHorizontalSpoke1V2.position.set
  (
    verticalSpoke1.position.x, 
    verticalSpoke1.position.y + 1.6, 
    verticalSpoke1.position.z
  );
  shortHorizontalSpoke1V2.rotation.y += (Math.PI / 2)
  
  shortHorizontalSpoke2V2.position.set
  (
    -verticalSpoke1.position.x, 
    -verticalSpoke1.position.y - 1.6, 
    -verticalSpoke1.position.z
  );
  shortHorizontalSpoke2V2.rotation.y += (Math.PI / 2);
  
  shortHorizontalSpoke3V2.position.set
  (
  -verticalSpoke1.position.x, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z + 2.5
  );
  shortHorizontalSpoke3V2.rotation.y += (Math.PI / 2);
  
  shortHorizontalSpoke4V2.position.set
  (
  -verticalSpoke1.position.x + 2.5, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z
  );
  shortHorizontalSpoke4V2.rotation.x += (Math.PI / 2);
  
  shortHorizontalSpoke5V2.position.set
  (
  -verticalSpoke1.position.x , 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z - 2.5
  );
  shortHorizontalSpoke5V2.rotation.x += (Math.PI / 2)
  
  shortHorizontalSpoke6V2.position.set
  (
  -verticalSpoke1.position.x - 2.5, 
  -verticalSpoke1.position.y + 1, 
  -verticalSpoke1.position.z
  );
  shortHorizontalSpoke6V2.rotation.x += (Math.PI / 2)
  //
  
  longHorizontalSpoke1.position.set
  (
    shortHorizontalSpoke1.position.x, 
    shortHorizontalSpoke1.position.y + 0.25, 
    shortHorizontalSpoke1.position.z
  );
  
  longHorizontalSpoke2.position.set
  (
    shortHorizontalSpoke2.position.x, 
    shortHorizontalSpoke2.position.y - 0.25, 
    shortHorizontalSpoke2.position.z
  );
  
  //
  longHorizontalSpoke3.position.set
  (
    shortHorizontalSpoke3.position.x, 
    shortHorizontalSpoke3.position.y, 
    shortHorizontalSpoke3.position.z + 0.25
  );
  
  longHorizontalSpoke3.rotation.x += (Math.PI / 2)
  longHorizontalSpoke4.position.set
  (
    shortHorizontalSpoke4.position.x + 0.25, 
    shortHorizontalSpoke4.position.y, 
    shortHorizontalSpoke4.position.z
  );
  longHorizontalSpoke5.position.set
  (
    shortHorizontalSpoke5.position.x, 
    shortHorizontalSpoke5.position.y, 
    shortHorizontalSpoke5.position.z - 0.25
  );
  longHorizontalSpoke5.rotation.y += (Math.PI / 2)
  
  longHorizontalSpoke6.position.set
  (
    shortHorizontalSpoke6.position.x - 0.25, 
    shortHorizontalSpoke6.position.y, 
    shortHorizontalSpoke6.position.z
  );
  
  // 
  longHorizontalSpoke1V2.position.set
  (
    shortHorizontalSpoke1V2.position.x, 
    shortHorizontalSpoke1V2.position.y + 0.25, 
    shortHorizontalSpoke1V2.position.z
  );
  
  longHorizontalSpoke1V2.rotation.y += (Math.PI / 2)
  
  longHorizontalSpoke2V2.position.set
  (
    shortHorizontalSpoke2V2.position.x, 
    shortHorizontalSpoke2V2.position.y - 0.25, 
    shortHorizontalSpoke2V2.position.z
  );
  
  longHorizontalSpoke2V2.rotation.y += (Math.PI / 2)
  
  //
  longHorizontalSpoke3V2.position.set
  (
    shortHorizontalSpoke3V2.position.x, 
    shortHorizontalSpoke3V2.position.y, 
    shortHorizontalSpoke3V2.position.z + 0.25
  );
  longHorizontalSpoke3V2.rotation.y += (Math.PI / 2);
  
  longHorizontalSpoke4V2.position.set
  (
    shortHorizontalSpoke4V2.position.x + 0.25, 
    shortHorizontalSpoke4V2.position.y, 
    shortHorizontalSpoke4V2.position.z
  );
  longHorizontalSpoke4V2.rotation.x += (Math.PI / 2);
  
  longHorizontalSpoke5V2.position.set
  (
    shortHorizontalSpoke5V2.position.x, 
    shortHorizontalSpoke5V2.position.y, 
    shortHorizontalSpoke5V2.position.z - 0.25
  );
  longHorizontalSpoke5V2.rotation.x += (Math.PI / 2)
  
  longHorizontalSpoke6V2.position.set
  (
    shortHorizontalSpoke6V2.position.x - 0.25, 
    shortHorizontalSpoke6V2.position.y, 
    shortHorizontalSpoke6V2.position.z
  );
  longHorizontalSpoke6V2.rotation.x += (Math.PI / 2)
  
  // @note - Lewis: array of meshes for raycaster
 const orbitBallMeshes = [];
  // const { orbitBallMeshes } = context;
  orbitBallMeshes.push(
    sphere,
    verticalSpoke1, 
    verticalSpoke2, 
    verticalSpoke3,
    verticalSpoke4,
    verticalSpoke5,
    verticalSpoke6,
    shortHorizontalSpoke1,
    shortHorizontalSpoke2,
    shortHorizontalSpoke3,
    shortHorizontalSpoke4,
    shortHorizontalSpoke5,
    shortHorizontalSpoke6,
    longHorizontalSpoke1, 
    longHorizontalSpoke2, 
    longHorizontalSpoke3, 
    longHorizontalSpoke4, 
    longHorizontalSpoke5, 
    longHorizontalSpoke6, 
    longHorizontalSpoke1V2, 
    longHorizontalSpoke2V2, 
    longHorizontalSpoke3V2,
    longHorizontalSpoke4V2,
    longHorizontalSpoke5V2,
    longHorizontalSpoke6V2,
    shortHorizontalSpoke1V2, 
    shortHorizontalSpoke2V2, 
    shortHorizontalSpoke3V2,
    shortHorizontalSpoke4V2, 
    shortHorizontalSpoke5V2, 
    shortHorizontalSpoke6V2,
  );
  
  const originalSpokeMaterial = {
    'topView' : new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 
    'bottomView' : new THREE.MeshBasicMaterial({ color: 0x00ff00 }), 
    'leftView' : new THREE.MeshBasicMaterial({ color: 0x0000ff }), 
    'rightView' : new THREE.MeshBasicMaterial({ color: 0x0000ff }), 
    'frontView' : new THREE.MeshBasicMaterial({ color: 0xff0000 }), 
    'backView' : new THREE.MeshBasicMaterial({ color: 0xff0000 }),     
  };
  const hoverSpokeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  hoverSpokeMaterial.name = 'hoverSpokeMaterial';
  
  const topView = new THREE.Group();
  const bottomView = new THREE.Group();
  const leftView = new THREE.Group();
  const frontView = new THREE.Group();
  const rightView = new THREE.Group();
  const backView = new THREE.Group();
  
  topView.add(verticalSpoke1, shortHorizontalSpoke1, longHorizontalSpoke1, shortHorizontalSpoke1V2, longHorizontalSpoke1V2);
  bottomView.add(verticalSpoke2, shortHorizontalSpoke2, longHorizontalSpoke2, shortHorizontalSpoke2V2, longHorizontalSpoke2V2);
  leftView.add(verticalSpoke6, shortHorizontalSpoke6, longHorizontalSpoke6, shortHorizontalSpoke6V2, longHorizontalSpoke6V2);
  frontView.add(verticalSpoke3, shortHorizontalSpoke3, longHorizontalSpoke3, shortHorizontalSpoke3V2, longHorizontalSpoke3V2);
  rightView.add(verticalSpoke4, shortHorizontalSpoke4, longHorizontalSpoke4, shortHorizontalSpoke4V2, longHorizontalSpoke4V2);
  backView.add(verticalSpoke5, shortHorizontalSpoke5, longHorizontalSpoke5, shortHorizontalSpoke5V2, longHorizontalSpoke5V2);
  
  topView.name = 'topView';
  bottomView.name = 'bottomView';
  leftView.name = 'leftView';
  rightView.name = 'rightView';
  frontView.name = 'frontView';
  backView.name = 'backView';
  
  orbitBallGroup.add(
    sphereGroup, 
    topView,
    bottomView,
    leftView,
    frontView,
    rightView,
    backView,
  );

  return { orbitBallGroup, orbitBallMeshes, hoverSpokeMaterial, originalSpokeMaterial }; 
};
