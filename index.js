import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Stats from 'https://mrdoob.github.io/stats.js/build/stats.module.js';

let renderer, scene, camera, clock, stats;
let pointer = new THREE.Vector2();

let geometry;

let t;


let width = 100;
let height = 300;

const pointSize = 0.05;


function generatePointCloudGeometry( color, width, height) {
    const geometry = new THREE.BufferGeometry();
    const numPoints = width * height;

    const positions = new Float32Array( numPoints * 3 );
    const colors = new Float32Array( numPoints * 3 );

    let k = 0;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const u = i / width;
            const v = j / height;
            const x = u - 0.5;
            //const y = (Math.cos(u * Math.PI * 4) + Math.sin( v * Math.PI * 8)) / 20;
            const y = 0;
            const z = v - 0.5;

            positions[3 * k] = x;
            positions[3 * k + 1] = y;
            positions[3 * k + 2] = z;

            const intensity = ( y + 0.1 ) * 5;
            colors[3 * k] = color.r * intensity;
            colors[3 * k + 1] = color.g * intensity;
            colors[3 * k + 2] = color.b * intensity;

            k++;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingBox();

    return geometry;
}


function generatePointCloud(color, width, height, t) {
    geometry = generatePointCloudGeometry(color, width, height, t);
    const material = new THREE.PointsMaterial({size: pointSize, vertexColors: true});

    return new THREE.Points(geometry, material);
}


function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function init() {
  const canvas = document.querySelector('#c');

  scene = new THREE.Scene();
  clock = new THREE.Clock();
  stats = new Stats();

  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);

  const near = 8;
  const far = 12;
  const factor = 4.5;
  camera = new THREE.OrthographicCamera(-window.innerWidth / factor, window.innerWidth / factor, window.innerHeight / factor, -window.innerHeight / factor, 1, 1000);
  camera.position.set(0, 10, 0);
  camera.lookAt(scene.position);
  camera.updateMatrix();

  document.addEventListener('pointermove', onPointerMove);
}


function render() {
    t = clock.getElapsedTime();
    const r = Math.sin(t / (11 * Math.PI));
    const g = Math.cos(t / (3 * Math.PI));
    const b = Math.sin(t / (7 * Math.PI));
    const points = generatePointCloud( new THREE.Color(r, g, b), width, height, t);
    points.scale.set(5, 10, 10);
    points.position.set(0, 0, 0);
    scene.add(points);

    renderer.render(scene, camera);
}


function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}


init();
animate();
