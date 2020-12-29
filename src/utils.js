export const file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz';
//export const file = 'C://Users//320112319//hackathon//ami//lessons//03//data//adi_brain.nii.gz';

export const colors = {
  red: 0xff0000,
  lightGrey: 0xffffff,
};

export const boxData = {
    width: 50,
    height: 50,
    depth: 50,
    widthSegments: 0,
    heightSegments: 0,
    depthSegments: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0, 
    positionX: 0,
    positionY: 0,
    positionZ: 0
  };

const geometry = new THREE.BoxGeometry( boxData.width, boxData.height, boxData.depth);
const material = new THREE.MeshBasicMaterial( {transparent: true, color:0xff0000, opacity:0.5, side: THREE.DoubleSide, wireframe: true} );

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
