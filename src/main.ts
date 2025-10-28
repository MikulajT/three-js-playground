import * as THREE from 'three';

// Create renderer
const canvas = document.querySelector('#c') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

// Create camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Move the camera back so we can view the scene
camera.position.z = 4;

// Create scene
const scene = new THREE.Scene();

// Add light
{
  const color = 0xFFFFFF;
  const intensity = 5;
  const light = new THREE.DirectionalLight( color, intensity );
  light.position.set( - 1, 2, 4 );
  scene.add( light );
}

// Create box
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry: THREE.BoxGeometry, color: THREE.ColorRepresentation, x: number) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

// Animate the cube
function render(time: number) {
		time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)){
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

		cubes.forEach( ( cube, ndx ) => {

			const speed = 3 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );
}
requestAnimationFrame(render);

function resizeRendererToDisplaySize(renderer : THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

/// Line
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector2( -10, 0 ) );
// points.push( new THREE.Vector2( 0, 10 ) );
// points.push( new THREE.Vector2( 10, 0 ) );
// points.push( new THREE.Vector2( 10, 0 ) );
// points.push( new THREE.Vector2( 0, -10 ) );
// points.push( new THREE.Vector2( -10, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );

// scene.add( line );
// renderer.render( scene, camera );