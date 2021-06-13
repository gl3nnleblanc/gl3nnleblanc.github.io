import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Stats from 'https://mrdoob.github.io/stats.js/build/stats.module.js';

// Global helper classes from three.js
let renderer;
let scene;
let camera;
let raycaster;
let clock;
let stats;

// Global mouse pointer
const pointer = new THREE.Vector2();

// Global timestamp
let t;

// Global colors
const r = 0;
const g = 0;
const b = 0;

// Global pointcloud
let points;

// Global dimensions
const width = 350;
const height = 350;

// Projecting mouse coordinates onto 3D plane
let projX;
let projZ;

// Hermite polynomial of order six for wavefunction-y aesthetic
const hermitePolyOrderSix = (
  (x) => x ** 6
        - 15 * x ** 4
        + 45 * x ** 2
        - 15
);

const pointSize = 0.02;

// Generates geometry of initial point cloud
function generatePointCloudGeometry(color, w, h) {
  const geometry = new THREE.BufferGeometry();
  const numPoints = w * h;
  const positions = new Float32Array(numPoints * 3);
  const colors = new Float32Array(numPoints * 3);

  let k = 0;

  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const u = i / w;
      const v = j / h;
      const x = (u - 0.5);
      const z = (v - 0.5);

      const y = 0;
      positions[3 * k] = x;
      positions[3 * k + 1] = y;
      positions[3 * k + 2] = z;

      const intensity = (y + 0.1) * 5;
      colors[3 * k] = color.r * intensity;
      colors[3 * k + 1] = color.g * intensity;
      colors[3 * k + 2] = color.b * intensity;

      k += 1;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeBoundingBox();

  return geometry;
}

// Generates point cloud at a given time TIME
function generatePointCloud(color, w, h, time) {
  const geometry = generatePointCloudGeometry(color, w, h, time);
  const material = new THREE.PointsMaterial({ size: pointSize, vertexColors: true });

  return new THREE.Points(geometry, material);
}

// Checks for mouse movement
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Initialize helper classes
function init() {
  const canvas = document.querySelector('#c');

  scene = new THREE.Scene();
  clock = new THREE.Clock();
  stats = new Stats();
  canvas.appendChild(stats.dom);

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 2.5, 0);
  camera.lookAt(scene.position);
  camera.updateMatrix();

  document.addEventListener('pointermove', onPointerMove);

  points = generatePointCloud(new THREE.Color(r, g, b), width, height, t);
  points.scale.set(5, 10, 10);
  points.position.set(0, 0, 0);
  scene.add(points);

  raycaster = new THREE.Raycaster();
}

// Updates points
function updatePoints() {
  const positions = points.geometry.attributes.position.array;
  const colors = points.geometry.attributes.color.array;

  const red = Math.sin(2 * Math.PI * (t / 7)) / 2 + 1 / 2;
  const grn = Math.sin(2 * Math.PI * ((t + 3) / 7)) / 2 + 1 / 2;
  const blu = Math.sin(2 * Math.PI * ((t + 5) / 7)) / 2 + 1 / 2;

  let k = 0;
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const u = i / width;
      const v = j / height;
      const x = (u - 0.5);
      const z = (v - 0.5);

      const alpha = (x + x / 2 - (projX / 2)) * 20;
      const beta = (z + z / 2 - (projZ / 2)) * 20;

      const y = Math.exp(-(alpha * alpha + beta * beta) / 2)
        * hermitePolyOrderSix(alpha)
        * hermitePolyOrderSix(beta);
      const yt = y * Math.sin(x - 1.5 * t) * Math.sin(z - 1.5 * t)
        * Math.sin(alpha - 5 * t) * Math.sin(beta - 3 * t) * (1 / 4800);
      positions[3 * k + 1] = yt;

      const intensity = Math.min(
        1 / 20,
        Math.abs(
          y * Math.exp((-alpha * alpha + -beta * beta) / 0.2),
        ),
      ) * 7.5 * ((x * 5) ** 2);

      const offset = (x) => (
        Math.tanh(x + 1);
      );

      colors[3 * k] = red * intensity * offset(yt);
      colors[3 * k + 1] = grn * intensity * offset(yt);
      colors[3 * k + 2] = blu * intensity * offset(yt);

      k += 1;
    }
  }
}

function render() {
  camera.updateMatrixWorld();

  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObject(points);
  if (intersections.length > 0) {
    const intersection = intersections[0];
    projX = intersection.point.x;
    projZ = intersection.point.z;
  }

  t = clock.getElapsedTime();
  updatePoints();
  points.geometry.attributes.position.needsUpdate = true;
  points.geometry.attributes.color.needsUpdate = true;
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

init();
animate();
