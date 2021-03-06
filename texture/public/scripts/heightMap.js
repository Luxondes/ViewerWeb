import * as THREE from 'three';
import { OrbitControls } from '../lib/OrbitControls.js';






var heatVertex = `
    uniform sampler2D heightMap;
    uniform float heightRatio;
    uniform float heightBias;
    varying vec2 vUv;
    varying float hValue;
    void main() {
      vUv = uv;
      vec3 pos = position;
      hValue = texture2D(heightMap, vUv).r;
      pos.y = hValue * heightRatio;
      pos.y += heightBias;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

      gl_PointSize = 30. * (1. / - mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  var heatFragment = `
    uniform sampler2D gradientMap;
    varying float hValue;

    void main() {
      float v = clamp(hValue, 0., 1.);
      vec3 col = texture2D(gradientMap, vec2(0, v)).rgb;
      gl_FragColor = vec4(col, 1.) ;
    }
  `;
  
  var canvasH = document.getElementById("heightmap");
  canvasH.addEventListener("click", () => {
    createHeightMap();
  }, false);
  var heightMap = new THREE.CanvasTexture(canvasH);
  var ctx = canvasH.getContext("2d");
  
  //console.log(heightMap);
  createHeightMap();
  function createHeightMap() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 100; i++) {
      var x = Math.floor(Math.random() * 255);
      var y = Math.floor(Math.random() * 255);
      var radius = 50;
      let grd = ctx.createRadialGradient(x, y, 1, x, y, radius);
      var h8 = Math.floor(Math.random() * 255);
      grd.addColorStop(0, "rgb(" + h8 + "," + h8 + "," + h8 + ")");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 256, 256);
    }
    heightMap.needsUpdate = true;
  }
  
  var canvasG = document.getElementById("heightgrd");
  canvasG.addEventListener("click", ()=>{
    createGradMap();
  }, false);
  var gradientMap = new THREE.CanvasTexture(canvasG);
  var ctxG = canvasG.getContext("2d");
  
  createGradMap();
  function createGradMap() {
    console.log("grad");
    let grd = ctxG.createLinearGradient(0,255, 0, 0);
    var colorAmount = 3 + THREE.MathUtils.randInt(0, 3);
    var colorStep = 1. / colorAmount; 
    for (let i = 0; i <= colorAmount; i++){
      let r = THREE.MathUtils.randInt(0,255);
      let g = THREE.MathUtils.randInt(0,255);
      let b = THREE.MathUtils.randInt(0,255);
      grd.addColorStop(colorStep * i,'rgb(' + r + ',' + g + ',' + b +')');
    }
    ctxG.fillStyle = grd;
    ctxG.fillRect(0, 0, 64, 256)
    gradientMap.needsUpdate = true;
  }













const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 20, 40);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI/2-0.01;

const gC = 0x660066;
scene.add(new THREE.GridHelper(50, 25, gC, gC));

let geometry = new THREE.PlaneGeometry( 50, 50 );
let texture = new THREE.TextureLoader().load( '../img/nuitEtoile.jpg' );
let material = new THREE.MeshBasicMaterial( { map: texture , side: THREE.DoubleSide} );
let plane = new THREE.Mesh( geometry, material );
plane.rotation.x = -Math.PI / 2;
plane.position.y = 1;
scene.add( plane );

var planeGeometry = new THREE.PlaneBufferGeometry(50, 50, 500, 500);
planeGeometry.rotateX(-Math.PI * 0.5);

var heat = new THREE.Points(planeGeometry, new THREE.ShaderMaterial({
  uniforms: {
    heightMap: {value: heightMap},
    heightRatio: {value: 10},
    heightBias: {value: 10},
    gradientMap: {value: gradientMap}
  },
  vertexShader: heatVertex,
  fragmentShader: heatFragment
}));

scene.add(heat);

window.addEventListener( 'resize', onWindowResize, false );


const stats = new Stats();
stats.showPanel( 0 );
stats.domElement.style.cssText = 'position:absolute;top:0px;right:0px;';
document.body.appendChild( stats.dom );

const stats2 = new Stats();
stats2.showPanel( 1 );
stats2.domElement.style.cssText = 'position:absolute;top:48px;right:0px;';
document.body.appendChild( stats2.dom );

const stats3 = new Stats();
stats3.showPanel( 2 );
stats3.domElement.style.cssText = 'position:absolute;top:96px;right:0px;';
document.body.appendChild( stats3.dom );


render();
function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  stats.update()
  stats2.update()
  stats3.update()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}