import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';


const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('../static/draco/');
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
  '../static/models/firstModel.glb',
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    model.position.set(0, 0, 0);
    scene.add(model);
  },
)

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(directionalLightHelper);
directionalLight.position.set(1,3,-3);
scene.add(ambientLight, directionalLight);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshStandardMaterial({
    color:'grey',
    side:THREE.DoubleSide,
    roughness: 0.3,
    metalness: 0.4
  })
)
plane.rotation.x = Math.PI * 0.5;
scene.add(plane);

const sizes ={
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
camera.position.y = 5
// camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

function tick(){
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();