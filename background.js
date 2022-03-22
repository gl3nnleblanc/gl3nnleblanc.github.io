import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Stats from 'https://mrdoob.github.io/stats.js/build/stats.module.js';

// Global helper classes from three.js
let renderer;
let scene;
let camera;
let raycaster;
let stats;

// Global mouse pointer
const pointer = new THREE.Vector2();

// Global timestamps
let t;
let tClick;

// Global colors
const r = 0;
const g = 0;
const b = 0;

// Global pointcloud
let points;

// Global dimensions
const width = 250;
const height = 250;

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

const hermitePolyOrderFive = (
  (x) => x ** 5
        - 10 * x ** 3
        + 15 * x
);

const pointSize = 0.01;

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
      const z = (v - 0.5) * (h / w);

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

// Checks for mouse click
function onPointerClick() {
  tClick = 0;
}

// Checks for window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize helper classes
function init() {
  const canvas = document.querySelector('#c');

  scene = new THREE.Scene();
  t = 0;
  tClick = 20;
  stats = new Stats();
  canvas.appendChild(stats.dom);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 2.5, 0);
  camera.lookAt(scene.position);
  camera.updateMatrix();

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('click', onPointerClick);

  points = generatePointCloud(new THREE.Color(r, g, b), width, height, t);
  points.scale.set(5, 10, 10);
  points.position.set(0, 0, 0);
  scene.add(points);

  raycaster = new THREE.Raycaster();
}

// Updates points
function updatePoints() {
  const colors = points.geometry.attributes.color.array;
  let n = 0;
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const x = ((i / width) - 0.5);
      const z = ((j / height) - 0.5);

      const alpha = (x - (projX / 2)) * 10;
      const beta = (z - (projZ / 2)) * 10 * (16 / 9);

      const radius = Math.sqrt(alpha ** 2 + beta ** 2) / 10;

      const click = Math.exp(-(alpha * alpha + beta * beta) / 5) * Math.sin(1 / (tClick + 0.318))
        * hermitePolyOrderFive(radius) * 10;

      const red = Math.sin(hermitePolyOrderFive(alpha)
        * hermitePolyOrderFive(beta) + t);

      const grn = Math.sin(hermitePolyOrderFive(alpha)
        * hermitePolyOrderFive(beta) + 0.4 * t + 3);

      const blu = Math.sin(hermitePolyOrderSix(beta)
        * hermitePolyOrderSix(alpha) + t + 5);

      colors[3 * n] = red * click;
      colors[3 * n + 1] = grn * click;
      colors[3 * n + 2] = blu * click;

      n += 1;
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

  updatePoints(t);
  tClick += 0.1;
  t += 0.1;
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
