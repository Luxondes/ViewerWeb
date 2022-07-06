import * as THREE from 'three';
import { OrbitControls } from '../lib/OrbitControls.js';
// import * as HMC from './heightMapCanvas.js';

export function main(){
  
  let canvasG = document.getElementById("heightgrd");
  let colorTexture = new THREE.CanvasTexture(canvasG);
  let ctxG = canvasG.getContext("2d");

  let mires = []; 
  for (let i = 1; i < 8; i++) {
    let img = new Image();
    img.src = "../img/mir_0" + i + ".jpg";
    mires.push(img)
  }
  let mires_index;

  window.addEventListener("load", ()=>{
    createGradMap();
  }, false);
  
  createGradMap();
  function createGradMap() {
    mires_index = 0;
    ctxG.drawImage(mires[mires_index], 0, 0, 64, 256);
    colorTexture.needsUpdate = true;
  }
  
  canvasG.addEventListener("click", ()=>{
    updateGradMap();
  }, false);
  
  function updateGradMap() {
    mires_index = (mires_index + 1) % 7;
    ctxG.clearRect(0, 0, 64, 256);
    ctxG.drawImage(mires[mires_index], 0, 0, 64, 256);
    colorTexture.needsUpdate = true;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 40, 60);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvas";
  // renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI/2+0.02;

  const gC = 0x660066;
  let grid = new THREE.GridHelper(50, 25, gC, gC);


  const image = document.getElementById("img");
  let imageSrc = image.src;
  grid.position.y = -3;
  scene.add( grid );

  const xsize = document.getElementById("Xsize");
  let xsizehtml = xsize.innerHTML;

  const ysize = document.getElementById("Ysize");
  let ysizehtml = ysize.innerHTML;
  
  let geometry = new THREE.PlaneGeometry( 50, ysizehtml/xsizehtml*50 );
  let texture = new THREE.TextureLoader().load( imageSrc );
  let material = new THREE.MeshBasicMaterial( { map: texture , side: THREE.DoubleSide} );
  let plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -2;
  scene.add( plane );

  window.addEventListener( 'resize', onWindowResize, false );

  let g = new THREE.PlaneBufferGeometry(50, 50, 10, 10);
  g.rotateX(-Math.PI * 0.5);
  
  let uniforms = {
    colorTexture: {value: colorTexture}
  }
  let m = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    onBeforeCompile: shader => {
      shader.uniforms.colorTexture = uniforms.colorTexture;
      shader.vertexShader = `
        varying vec3 vPos;
        ${shader.vertexShader}
      `.replace(
        `#include <fog_vertex>`,
        `#include <fog_vertex>
        vPos = vec3(position);
        `
      );
      shader.fragmentShader = `
      uniform float limits;
      uniform sampler2D colorTexture;
        
        varying vec3 vPos;
        ${shader.fragmentShader}
      `.replace(
        `vec4 diffuseColor = vec4( diffuse, opacity );`,
        `
        float h = vPos.y;
        vec4 diffuseColor = texture2D(colorTexture, vec2(0, h));
        `
        );
      }
    })
    
    let o = new THREE.Mesh(g, m);
    scene.add(o);
    
    setRandHeight();
    function setRandHeight(){
      let pos = g.attributes.position;
      let uv = g.attributes.uv;
      for (let i = 0; i < 121; i++) {
        let uvX = uv.getX(i);
        let uvY = uv.getY(i);
        pos.setY(i, noise.simplex3(uvX, uvY, 0)*1.5);
      }
      pos.needsUpdate = true;
    }

  if (document.getElementById ("stat")) {
    document.body.removeChild(document.getElementById ("stat"));
  }
  const stats = new Stats();
  stats.showPanel( 0 );
  stats.domElement.style.cssText = 'position:absolute;bottom:0px;right:160px;';
  stats.domElement.id = "stat";
  document.body.appendChild( stats.dom );

  if (document.getElementById ("stat2")) {
    document.body.removeChild(document.getElementById ("stat2"));
  }
  const stats2 = new Stats();
  stats2.showPanel( 1 );
  stats2.domElement.style.cssText = 'position:absolute;bottom:0px;right:80px;';
  stats2.domElement.id = "stat2";
  document.body.appendChild( stats2.dom );

  if (document.getElementById ("stat3")) {
    document.body.removeChild(document.getElementById ("stat3"));
  }
  const stats3 = new Stats();
  stats3.showPanel( 2 );
  stats3.domElement.style.cssText = 'position:absolute;bottom:0px;right:0px;';
  stats3.domElement.id = "stat3";
  document.body.appendChild( stats3.dom );

  
  renderer.setAnimationLoop(()=>{
    renderer.render(scene, camera);
    stats.update()
    stats2.update()
    stats3.update()
  })
  
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
}
main();