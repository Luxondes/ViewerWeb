import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 0.5;
camera.position.y = -1;


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI - 0.01;
controls.minPolarAngle = 0.01;

controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	RIGHT: THREE.MOUSE.PAN
}


const img = 'https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=s1200';

const geometry = new THREE.PlaneGeometry( 1, 1 );
const texture = new THREE.TextureLoader().load( img );
const material = new THREE.MeshBasicMaterial( { map: texture , side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

const loop = function( time ) {
	//plane.rotation.z = time / 10000;
  requestAnimationFrame(loop);
  renderer.render(scene, camera);
}

loop();