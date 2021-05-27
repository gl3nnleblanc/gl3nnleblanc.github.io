import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import Stats from 'https://mrdoob.github.io/stats.js/build/stats.module.js';

let renderer, scene, camera, clock, stats;
let pointer = new THREE.Vector2();


let t;

let r = 0;
let g = 0;
let b = 0;

let points;


let width = 250;
let height = 250;

const pointSize = 0.02;


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
            const x = (u - 0.5);
            const z = (v - 0.5);

            const a = (u - pointer.x) * 10;
            const b = (v - pointer.y) * 10;


            const y = 0;
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
    const geometry = generatePointCloudGeometry(color, width, height, t);
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
  canvas.appendChild(stats.dom);

  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 2.5, 0);
  camera.lookAt(scene.position);
  camera.updateMatrix();

  document.addEventListener('pointermove', onPointerMove);

  points = generatePointCloud( new THREE.Color(r, g, b), width, height, t);
  points.scale.set(5, 10, 10);
  points.position.set(0, 0, 0);
  scene.add(points);
}

function updatePoints() {
    const positions = points.geometry.attributes.position.array;
    const colors = points.geometry.attributes.color.array;

    const r = Math.sin(2 * Math.PI * t / 7) / 2 + 1/2;
    const g = Math.sin(2 * Math.PI * (t + 3) / 7) / 2 + 1/2;
    const b = Math.sin(2 * Math.PI * (t + 5) / 7) / 2 + 1/2;

    let k = 0;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const u = i / width;
            const v = j / height;
            const x = (u - 0.5);
            const z = (v - 0.5);


            const a = (x+x/2 - (pointer.x / 2)) * 20;
            const b = (z+z/2 + (pointer.y / 2)) * 20;


            const y = (Math.exp(-a*a / 2) * (Math.pow(a, 6) - 15 * Math.pow(a, 4) + 45 * Math.pow(a, 2) - 15)) *
                (Math.exp(-b*b / 2) * (Math.pow(b, 6) - 15 * Math.pow(b, 4) + 45 * Math.pow(b, 2) - 15))
            const yt = y * Math.sin(x - 1.5*t) * Math.sin(z - 1.5*t) / 4800
            positions[3 * k + 1] = yt;

            const intensity = Math.min(1/20, Math.abs(y*Math.exp((-a*a + -b*b)/1.2))) * 20
            colors[3 * k] = r * intensity;
            colors[3 * k + 1] = g * intensity;
            colors[3 * k + 2] = b * intensity;

            k++;
        }
    }
}


function render() {
    camera.updateMatrixWorld();
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
