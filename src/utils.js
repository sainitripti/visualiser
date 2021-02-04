//export const file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz';
//export const file = '..//data//adi_brain.nii.gz';
export const file = 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/adi_brain.nii.gz';
export const file4 = 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/training_sa_crop_pat0_transformed.nii.gz';

export const colors = {
  red: 0xff0000,
  lightGrey: 0xffffff,
};


export let boxData = {
    width: 50,
    height: 50,
    depth: 50,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0, 
    positionX: 0,
    positionY: 0,
    positionZ: 0
  };
/*
fetch("..//data//box.json")
.then(response => {
   return response.json();
})
.then(data => {
  boxData = data["boxData"];
  gui();
  generateGeometry();
});
*/

export const geometry = new THREE.BoxGeometry( 1, 1, 1);
export const material = new THREE.MeshBasicMaterial( {transparent: true, color:0xff0000, opacity:0.5, side: THREE.DoubleSide, wireframe: true} );

export const cube = new THREE.Mesh( geometry, material );
export const axialCube = new THREE.Mesh( geometry, material );
export const coronalCube = new THREE.Mesh( geometry, material );
export const sagittalCube = new THREE.Mesh( geometry, material );

const arrCube = [cube, axialCube, coronalCube, sagittalCube];
export function generateGeometry() {
  
  arrCube.forEach(function(element)
  {
  	element.geometry.dispose();
  	element.geometry = new THREE.BoxGeometry( 
	  boxData.width, 
	  boxData.height, 
	  boxData.depth, 
	  boxData.widthSegments, 
	  boxData.heightSegments, 
	  boxData.depthSegments);
	element.rotation.x = boxData.rotateX;
	element.rotation.y = boxData.rotateY;
	element.rotation.z = boxData.rotateZ;
	element.position.x = boxData.positionX;
	element.position.y = boxData.positionY;
	element.position.z = boxData.positionZ;
  });
  
}

function gui() {
  const gui = new dat.GUI({
    autoPlace: false,
  });

  const customContainer = document.getElementById('main-gui-container');
  customContainer.appendChild(gui.domElement);

  const boxFolder = gui.addFolder( 'Box Geometry' );

  boxFolder.add( boxData, 'width', 1, 100 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'height', 1, 100 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'depth', 1, 100 ).onChange( generateGeometry );

  boxFolder.add( boxData, 'widthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'heightSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'depthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );

  boxFolder.add( boxData, 'rotateX', 0, 360 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'rotateY', 0, 360 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'rotateZ', 0, 360 ).onChange( generateGeometry );
  boxFolder.add( boxData , 'positionX', -100, 100 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'positionY', -100, 100 ).onChange( generateGeometry );
  boxFolder.add( boxData, 'positionZ', -100, 100 ).onChange( generateGeometry );

  boxFolder.open();
};


