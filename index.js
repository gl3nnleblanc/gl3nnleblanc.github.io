import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let renderer, scene, camera, clock;
let pointer = new THREE.Vector2();

let width = 80;
let height = 100;

const pointSize = 0.05;


function generatePointCloudGeometry( color, width, length ) {
    const geometry = new THREE.BufferGeometry();
    const numPoints = width * length;

    const positions = new Float32Array( numPoints * 3 );
    const colors = new Float32Array( numPoints * 3 );

    let k = 0;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const u = i / width;
            const v = j / length;
            const x = u - 0.5;
            const y = (Math.cos(u * Math.PI * 4) + Math.sin( v * Math.PI * 8)) / 20;
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


function generatePointCloud(color, width, length) {
    const geometry = generatePointCloudGeometry(color, width, length);
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

  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
  camera.position.z = 2;

  document.addEventListener('pointermove', onPointerMove);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue
  const cube = new THREE.Mesh(geometry, material);

  const points = generatePointCloud( new THREE.Color(1, 0, 0), width, height);
  points.scale.set(5, 10, 10);
  points.position.set(-5, 0, 0);
  scene.add(points);

}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
