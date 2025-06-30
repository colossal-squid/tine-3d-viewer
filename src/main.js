import * as THREE from 'three';
import { Raycaster, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const raycaster = new Raycaster();
const mouse = new Vector2();
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
mtlLoader.load('All_Objects3.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/tine-3d-viewer/assets/');
  objLoader.load('All_Objects3.obj', (object) => {
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

// window.camera = camera
// window.controls = controls

function onPointerClick(event) {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Check intersection with scene children
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    const name = obj.name || obj.parent?.name
    console.log("Clicked:", name);
    switch (name) {
      // zine station buttons
      case 'object_31':
        playAudio(`/tine-3d-viewer/assets/audio/Lea.mp3`)
        break
      case 'object_32':
        playAudio(`/tine-3d-viewer/assets/audio/Levi.mp3`)
        break
      case 'object_33':
        playAudio(`/tine-3d-viewer/assets/audio/Mira.mp3`)
        break
      case 'object_34':
         playAudio(`/tine-3d-viewer/assets/audio/audio-2.mp3`)
         break
      case 'object_35':
         playAudio(`/tine-3d-viewer/assets/audio/audio-2.mp3`)
         break
      case 'object_36':
         playAudio(`/tine-3d-viewer/assets/audio/audio-2.mp3`)
         break
       
        break;
      // puzzle station
      case 'object_1':
      case 'object_26':
      case 'object_27':
      case 'object_28':
      case 'object_30':
         playAudio(`/tine-3d-viewer/assets/audio/audio-1.mp3`)
      case 'object_29':
        playAudio(`/tine-3d-viewer/assets/audio/audio-2.mp3`)
        break;

      default:
        break;
    }
  }
}


// set up audio
const audio = new Audio();
audio.volume = 1.0;

function playAudio(url) {
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio.src = url;
  audio.play().catch((err) => {
    console.error("Failed to play audio:", err);
  });
}

window.addEventListener('pointerdown', onPointerClick);