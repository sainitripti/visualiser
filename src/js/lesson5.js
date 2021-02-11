import * as THREE from '../../node_modules/three/build/three.module.js';

import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';

import { TrackballControls } from '../../node_modules/three/examples/jsm/controls/TrackballControls.js';
import { PCDLoader } from '../../node_modules/three/examples/jsm/loaders/PCDLoader.js';

let container, stats;
let camera, controls, scene, renderer, threeD;

init();
//animate();

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );

	camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.001, 500 );
	camera.position.x = 100;
	camera.position.y= 100;
	camera.position.z = 250;

	scene.add( camera );

	threeD = document.getElementById('r3d');
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	threeD.appendChild( renderer.domElement );

	const loader = new PCDLoader();
	
	loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/1.pcd', function ( points ) {

		scene.add( points );

		const center = points.geometry.boundingSphere.center;
		controls.target.set( center.x, center.y, center.z );
		controls.update();
		loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/2.pcd', function ( points2 ) {

			scene.add( points2 );

			const center = points2.geometry.boundingSphere.center;
			controls.target.set( center.x, center.y, center.z );
			controls.update();
			//animatePoints(10);

			loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/3.pcd', function ( points3 ) {

				scene.add( points3 );

				const center = points3.geometry.boundingSphere.center;
				controls.target.set( center.x, center.y, center.z );
				controls.update();
				//animatePoints(10);

				sleep(500).then(() => {

					loader.load( 'https://ghcdn.rawgit.org/sainitripti/visualiser/master/data/4.pcd', function ( points4 ) {

						scene.add( points4 );
						const center = points4.geometry.boundingSphere.center;
						controls.target.set( center.x, center.y, center.z );
						controls.update();
						animatePoints(10);
					} );
				});		
			} );
		} );
		//animatePoints(10);
	} );

	
	
	container = document.createElement( 'div' );
	threeD.appendChild( container );
	container.appendChild( renderer.domElement );

	controls = new TrackballControls( camera, renderer.domElement );

	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.3;
	controls.panSpeed = 0.2;

	controls.staticMoving = true;

	controls.minDistance = 0.3;
	controls.maxDistance = 0.3 * 600;

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

	const points = scene.getObjectByName( '1.pcd' );
	const points2 = scene.getObjectByName( '2.pcd' );
	const points3 = scene.getObjectByName( '3.pcd' );
	const points4 = scene.getObjectByName( '4.pcd' );

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
			points.material.color.setHex( 0xff0000 );
			points.material.needsUpdate = true;
			points2.material.color.setHex( 0x00ff00 );
			points2.material.needsUpdate = true;
			points3.material.color.setHex( 0x0000ff );
			points3.material.needsUpdate = true;
			points4.material.color.setHex( 0xffffff );
			points4.material.needsUpdate = true;

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

	var points = scene.getObjectByName( '1.pcd' );	
	var points2 = scene.getObjectByName( '2.pcd' );	
	var points3 = scene.getObjectByName( '3.pcd' );	
	var points4 = scene.getObjectByName( '4.pcd' );	

	var center = new THREE.Vector3(0,0,0);
	var dist = new THREE.Vector3(points.position.x, points.position.y, points.position.z).sub(center);
	var size = 50.0;
	var magnitude = 0.05;
	points.scale.x = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	points.scale.y = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	points.scale.z = 1 + Math.sin(dist.length()/size + (ts/200)) * magnitude;
	
	var dist2 = new THREE.Vector3(points2.position.x, points2.position.y, points2.position.z).sub(center);
	points2.scale.x = 1 + Math.sin(dist2.length()/size + (ts/200)) * magnitude;
	points2.scale.y = 1 + Math.sin(dist2.length()/size + (ts/200)) * magnitude;
	points2.scale.z = 1 + Math.sin(dist2.length()/size + (ts/200)) * magnitude;
	
	var dist3 = new THREE.Vector3(points3.position.x, points3.position.y, points3.position.z).sub(center);
	points3.scale.x = 1 + Math.sin(dist3.length()/size + (ts/200)) * magnitude;
	points3.scale.y = 1 + Math.sin(dist3.length()/size + (ts/200)) * magnitude;
	points3.scale.z = 1 + Math.sin(dist3.length()/size + (ts/200)) * magnitude;
	
	var dist4 = new THREE.Vector3(points4.position.x, points4.position.y, points4.position.z).sub(center);
	points4.scale.x = 1 + Math.sin(dist4.length()/size + (ts/200)) * magnitude;
	points4.scale.y = 1 + Math.sin(dist4.length()/size + (ts/200)) * magnitude;
	points4.scale.z = 1 + Math.sin(dist4.length()/size + (ts/200)) * magnitude;
	
	requestAnimationFrame( animatePoints );
	controls.update();
	renderer.render( scene, camera );
	stats.update();
}

