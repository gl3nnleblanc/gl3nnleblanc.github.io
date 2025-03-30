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
const tClickInit = 10;

// Global colors
const r = 0;
const g = 0;
const b = 0;

// Global pointcloud
let points;

// Global dimensions and simulation parameters
const width = 250;
const height = 250;
const dampingFactor = 0.99; // Controls how quickly ripples fade
const propagationSpeed = 0.2; // Controls ripple speed
const mouseForce = 2.0; // Strength of mouse interaction

// Buffers for wave simulation
let currentBuffer;
let previousBuffer;
let velocityBuffer;

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

const pointSize = 0.02;

// Initialize wave simulation buffers
function initializeBuffers() {
  currentBuffer = new Float32Array(width * height);
  previousBuffer = new Float32Array(width * height);
  velocityBuffer = new Float32Array(width * height);
}

// Update wave simulation
function updateWaveSimulation() {
  const dt = 1.0;
  const dx = 1.0;
  const c = propagationSpeed;
  const dampingTerm = dampingFactor;
  
  for (let i = 1; i < width - 1; i++) {
    for (let j = 1; j < height - 1; j++) {
      const idx = i + j * width;
      
      // 2D Wave equation discretization
      const laplacian = (
        previousBuffer[idx - 1] + 
        previousBuffer[idx + 1] + 
        previousBuffer[idx - width] + 
        previousBuffer[idx + width] - 
        4 * previousBuffer[idx]
      ) / (dx * dx);
      
      // Update velocity using wave equation
      velocityBuffer[idx] = velocityBuffer[idx] * dampingTerm + c * c * laplacian * dt;
      
      // Update position
      currentBuffer[idx] = previousBuffer[idx] + velocityBuffer[idx] * dt;
    }
  }
  
  // Swap buffers
  [previousBuffer, currentBuffer] = [currentBuffer, previousBuffer];
}

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

// Modified updatePoints function
function updatePoints() {
  const colors = points.geometry.attributes.color.array;
  let n = 0;
  
  updateWaveSimulation();
  
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      const x = ((i / width) - 0.5);
      const z = ((j / height) - 0.5);
      const idx = i + j * width;

      const waveHeight = currentBuffer[idx];
      
      // Calculate base intensity using Hermite polynomial
      const radius = Math.sqrt(x * x + z * z);
      const baseIntensity = Math.abs(hermitePolyOrderSix(radius * 2)) * 0.1;
      
      // Only show colors where there's wave activity
      const waveIntensity = Math.abs(waveHeight);
      if (waveIntensity < 0.001) {
        colors[3 * n] = 0;
        colors[3 * n + 1] = 0;
        colors[3 * n + 2] = 0;
      } else {
        // Dynamic rainbow colors based on wave properties
        const intensity = waveIntensity + baseIntensity;
        // Use wave height and velocity to create dynamic phase shifts
        const basePhase = Math.atan2(velocityBuffer[idx], waveHeight) + radius * 5;
        
        colors[3 * n] = Math.abs(Math.sin(basePhase)) * intensity;
        colors[3 * n + 1] = Math.abs(Math.sin(basePhase + 2.094)) * intensity;
        colors[3 * n + 2] = Math.abs(Math.sin(basePhase + 4.189)) * intensity;
      }

      n += 1;
    }
  }
}

// Modified onPointerMove
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Add energy to wave simulation at mouse position
  const intersections = raycaster.intersectObject(points);
  if (intersections.length > 0) {
    const intersection = intersections[0];
    const x = Math.floor((intersection.point.x / 5 + 0.5) * width);
    const z = Math.floor((intersection.point.z / 5 + 0.5) * height);
    
    if (x >= 0 && x < width && z >= 0 && z < height) {
      const idx = x + z * width;
      velocityBuffer[idx] += mouseForce;
    }
  }
}

// Checks for mouse click
function onPointerClick() {
  tClick = tClickInit;
}

// Checks for window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Modified init function
function init() {
  const canvas = document.querySelector('#c');

  scene = new THREE.Scene();
  t = 0;
  tClick = tClickInit;
  stats = new Stats();
  canvas.appendChild(stats.dom);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4);
  camera.position.set(0, 2.5, 0);
  camera.lookAt(scene.position);
  camera.updateMatrix();

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('click', onPointerClick);

  points = generatePointCloud(new THREE.Color(r, g, b), width, height, t);
  points.scale.set(5, 5, 5);
  points.position.set(0, 0, 0);
  scene.add(points);

  raycaster = new THREE.Raycaster();

  initializeBuffers();
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
  tClick += 0.2;
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
