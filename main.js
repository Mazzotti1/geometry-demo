import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Cubos
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-3, 0.8, 0);
scene.add(cube);

const cubeLarge = cube.clone();
cubeLarge.scale.set(2, 2, 2);
cubeLarge.position.z = -3;
scene.add(cubeLarge);

cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);

// Esferas
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1.2, 0);
scene.add(sphere);

const sphereLarge = sphere.clone();
sphereLarge.scale.set(2, 2, 2);
sphereLarge.position.z = -3;
scene.add(sphereLarge);

// Cones
const coneGeometry = new THREE.ConeGeometry(0.7, 2, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(3, 1.2, 0);
scene.add(cone);

const coneRotated = cone.clone();
coneRotated.rotation.x = Math.PI / 2;
coneRotated.position.x += 2;
scene.add(coneRotated);

const coneLarge = cone.clone();
coneLarge.scale.set(2, 2, 2);
coneLarge.position.z = -3;
scene.add(coneLarge);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
