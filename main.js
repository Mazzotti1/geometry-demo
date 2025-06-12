import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const buttons = [];
for(let i = 0; i < 3; i++) {
  const geom = new THREE.CircleGeometry(0.5, 0.5, 0.5);
  const mat = new THREE.MeshStandardMaterial({color: 0x0077ff});
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.x = (i - 1) * 1.2;
  scene.add(mesh);
  buttons.push(mesh);
}

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

buttons.forEach((btn, i) => {
  
  const up = { y: btn.position.y + 0.3 };
  const down = { y: btn.position.y - 0.3 };

  let valueToUp = i % 2 == 0 ? 1000 : 2000

  function floatUp() {
    new TWEEN.Tween(btn.position)
      .to(up, valueToUp)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onComplete(floatDown)
      .start();
  }

  let valueToDown = i % 2 == 0 ? 1000 : 2000

  function floatDown() {
    new TWEEN.Tween(btn.position)
      .to(down, valueToDown)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onComplete(floatUp)
      .start();
    }
  floatUp();

  window.addEventListener('click', (e) => {
    const mouse = new THREE.Vector2(
    (e.clientX / innerWidth) * 2 - 1,
    -(e.clientY / innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(buttons);
      if(intersects.length) {
        const m = intersects[0].object.material;
        new TWEEN.Tween(m.color)
          .to({ r: 1, g: 0, b: 0 }, 500)
          .yoyo(true).repeat(1)
          .start();
      }
    });

  let hoveredObject = null;

  window.addEventListener('mousemove', (e) => {
    const mouse = new THREE.Vector2(
      (e.clientX / innerWidth) * 2 - 1,
      -(e.clientY / innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(buttons);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      if (hoveredObject !== object) {
        if (hoveredObject) {
          new TWEEN.Tween(hoveredObject.material.color)
            .to({ r: 1, g: 1, b: 1 }, 300) 
            .start();
        }

        hoveredObject = object;
        new TWEEN.Tween(object.material.color)
          .to({ r: 0, g: 1, b: 0 }, 300) 
          .start();
      }
    } else {
      if (hoveredObject) {
        new TWEEN.Tween(hoveredObject.material.color)
          .to({ r: 0, g: 0.2, b: 1 }, 300)
          .start();
        hoveredObject = null;
      }
    }
  });

});

  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    renderer.render(scene, camera);
  }
animate();