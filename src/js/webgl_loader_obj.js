import * as THREE from '../../node_modules/three/build/three.module.js';

import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { TrackballControls } from '../../node_modules/three/examples/jsm/controls/TrackballControls.js';

let container;

let camera, scene, renderer;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let object;
let object2;
let object3;
let object4;
let controls;

/*const particleLight = new THREE.Mesh(
  new THREE.SphereBufferGeometry(4, 8, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
*/
init();
animate();


function init() {

	container = document.getElementById( 'r3d_obj' );
	
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 500;

	// scene

	scene = new THREE.Scene();

	//const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	//scene.add( ambientLight );

	//const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	//camera.add( pointLight );

	
	//scene.add(particleLight);

	scene.add(new THREE.AmbientLight());
/*
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);

	const pointLight = new THREE.PointLight(0xffffff, 2);
	particleLight.add(pointLight);
*/
	scene.add( camera );

	// manager

	function loadModel() {

		object.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );

		object.position.y = - 100;
		
		scene.add( object );

		object2.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );

		object2.position.y = 0;
		scene.add( object2 );

		object3.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );

		object3.position.y = -100;
		object3.position.x = 80;

		scene.add( object3 );

		object4.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = texture;

		} );

		object4.position.y = 0;
		object4.position.x = 80;
		scene.add( object4 );


	}

	const manager = new THREE.LoadingManager( loadModel );

	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	// texture

	const textureLoader = new THREE.TextureLoader( manager );
	const texture = textureLoader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/red_texture.jpg' );

	// model

	function onProgress( xhr ) {

		if ( xhr.lengthComputable ) {

			const percentComplete = xhr.loaded / xhr.total * 100;
			console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

		}

	}

	function onError() {}

	const loader = new OBJLoader( manager );
	loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/obj/11.obj', function ( obj ) {

		object = obj;

	}, onProgress, onError );
	loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/obj/22.obj', function ( obj ) {

		object2 = obj;

	}, onProgress, onError );
	loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/obj/3.obj', function ( obj ) {

		object3 = obj;

	}, onProgress, onError );
	loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/obj/4.obj', function ( obj ) {

		object4 = obj;

	}, onProgress, onError );


	//

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0x353535, 1);
	container.appendChild( renderer.domElement );

	createControls( camera );


	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function createControls( camera ) {

	controls = new TrackballControls( camera, renderer.domElement );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.staticMoving = true;


}


//

function animate() {
/*
	var timer = Date.now() * 0.00025;

	particleLight.position.x = Math.sin(timer * 7) * 100;
	particleLight.position.y = Math.cos(timer * 5) * 120;
	particleLight.position.z = Math.cos(timer * 3) * 140;
*/
	controls.update();

	render();

	requestAnimationFrame( animate );	

}

function render() {

	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}