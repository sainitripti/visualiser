import * as THREE from '../../node_modules/three/build/three.module.js';

import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';

import { TrackballControls } from '../../node_modules/three/examples/jsm/controls/TrackballControls.js';
import { PCDLoader } from '../../node_modules/three/examples/jsm/loaders/PCDLoader.js';

let container, stats;
let camera, controls, scene, renderer;

init();
//animate();
function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );

	camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.01, 40 );
	camera.position.x = 0.4;
	camera.position.z = - 2;
	camera.up.set( 0, 0, 1 );

	scene.add( camera );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const loader = new PCDLoader();
	
	loader.load( 'https://ghcdn.rawgit.org/mrdoob/three.js/master/examples/models/pcd/binary/Zaghetto.pcd', function ( points ) {

		scene.add( points );

		const center = points.geometry.boundingSphere.center;
		controls.target.set( center.x, center.y, center.z );
		controls.update();
		animatePoints(10);
	} );
	
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );

	controls = new TrackballControls( camera, renderer.domElement );

	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.3;
	controls.panSpeed = 0.2;

	controls.staticMoving = true;

	controls.minDistance = 0.3;
	controls.maxDistance = 0.3 * 100;

	stats = new Stats();
	container.appendChild( stats.dom );

	window.addEventListener( 'resize', onWindowResize );

	window.addEventListener( 'keypress', keyboard );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();

}

function keyboard( ev ) {

	const points = scene.getObjectByName( 'Zaghetto.pcd' );

	switch ( ev.key || String.fromCharCode( ev.keyCode || ev.charCode ) ) {

		case '+':
			points.material.size *= 1.2;
			points.material.needsUpdate = true;
			break;

		case '-':
			points.material.size /= 1.2;
			points.material.needsUpdate = true;
			break;

		case 'c':
			points.material.color.setHex( Math.random() * 0xffffff );
			points.material.needsUpdate = true;
			break;

		case 'z':
			points.scale.x = points.scale.x + 0.001;
			points.scale.y = points.scale.y + 0.001;
			points.scale.z = points.scale.z + 0.001;
			break;

		case 'x':
			points.scale.x = points.scale.x - 0.001;
			points.scale.y = points.scale.y - 0.001;
			points.scale.z = points.scale.z - 0.001;
			break;

	}

}

function animate() {

	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
	stats.update();

}

function animatePoints(ts) {

	var points = scene.getObjectByName( 'Zaghetto.pcd' );	
	var center = new THREE.Vector3(0,0,0);
	var dist = new THREE.Vector3(points.position.x, points.position.y, points.position.z).sub(center);
	var size = 50.0;
	var magnitude = 0.05;
	points.scale.x = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	points.scale.y = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	points.scale.z = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	
	requestAnimationFrame( animatePoints );
	controls.update();
	renderer.render( scene, camera );
	stats.update();
}

