import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(
  607.9385464750143,
  986.9735957231749,
  -1446.9637215666992); 

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(
  -50.28250353927154,
  228.57187695974653,
  91.18285080525294
)

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const mtlLoader = new MTLLoader();
mtlLoader.setPath('/tine-3d-viewer/assets/');
mtlLoader.load('All_Objects.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/tine-3d-viewer/assets/');
  objLoader.load('All_Objects.obj', (object) => {
    object.scale.set(1, 1, 1);
    scene.add(object);
  });
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
window.camera = camera
window.controls = controls