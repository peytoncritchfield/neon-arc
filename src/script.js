import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentColorFill from './shaders/colorFill/fragment.glsl'
import vertexColorFill from './shaders/colorFill/vertex.glsl'
import { DoubleSide } from 'three'
import * as dat from 'dat.gui'

let scrollY = 0;
let clientHeight = window.document.body.clientHeight;
let reactiveLength = 0;

window.addEventListener("scroll", function () {
    scrollY = window.scrollY;
    clientHeight = window.document.body.clientHeight;
})
/**
 * 
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })


const variables = {
    pipeLength: {
        value: 120
    }
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene({
    color: 'white'
})

// floor
// const floorGeometry = new THREE.PlaneGeometry(200, 200, 10, 10)
// const floorMaterial = new THREE.MeshBasicMaterial({
//     color: 0x444466
// })
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.position.y = 10
// floor.position.z = 10
// floor.rotation.z = - Math.PI / 2
// scene.add(floor)

// Test Geometry of Square with unique vertices
// const squareGeometry = new THREE.BufferGeometry();

// const vertices = new Float32Array( [
// 	-1.0, -1.0,  1.0,
// 	 1.0, -1.0,  1.0,
// 	 1.0,  1.0,  1.0,

// 	 1.0,  1.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	-1.0, -1.0,  1.0,

//     2.0,  10.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	-1.0, -1.0,  1.0,

//     0.0,  10.0,  1.0,
// 	-1.0,  3.0,  1.0,
// 	-1.0, -1.0,  1.0
// ] );

// squareGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const squareMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const square = new THREE.Mesh( squareGeometry, squareMaterial );
// square.position.z = 30
// square.rotation.x = Math.PI / 2
// scene.add(square)

// path of line
// const path = new THREE.Path();

// path.lineTo( 0, 0.8 );
// path.quadraticCurveTo( 0, 2, 0.2, 2 );
// path.lineTo( 20, 20 );

// const points = path.getPoints();

// const linePathGeometry = new THREE.BufferGeometry().setFromPoints( points );
// const linePathMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );

// const line = new THREE.Line( linePathGeometry, linePathMaterial );
// scene.add( line );

// Extrude Geometry
// const length = 12, width = 8;

// const shape = new THREE.Shape();
// shape.moveTo( 0,1 );
// shape.lineTo( 0, width );
// shape.lineTo( length, width );
// shape.lineTo( length, 0 );
// shape.lineTo( 0, 0 );

// const extrudeSettings = {
// 	steps: 3,
// 	depth: 500,
// 	bevelEnabled: true,
// 	bevelThickness: 10,
// 	bevelSize: 2,
// 	bevelOffset: 0,
// 	bevelSegments: 5
// };

// const extrudeGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
// const ExtrudeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const extrusion = new THREE.Mesh( extrudeGeometry, ExtrudeMaterial ) ;
// extrusion.rotation.y = Math.PI / 2
// scene.add( extrusion );


// Tube Geometry



/**
 * Plane
 */
// Arc Geometry
// const geometry = new THREE.CylinderGeometry(0.5, 0.5, variables.pipeLength.value, 100, 100, true)
// const material = new THREE.ShaderMaterial({
//         vertexShader: vertexColorFill,
//         fragmentShader: fragmentColorFill,
//         transparent: true,
//         uniforms: {
//             uTime: { value: 0 },
//             pipeLength: { value: variables.pipeLength.value }
//         },
//         side: DoubleSide
//     })
// const arc = new THREE.Mesh(geometry, material)
// arc.rotation.z = Math.PI / 2
// scene.add(arc)

// gui.add(material.uniforms.pipeLength, 'value', 100, 175, 0.1).name('Pipe Length')



// Tube Geometry
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = Math.cos( 2 * Math.PI * t);

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

const path = new CustomSinCurve( 100 );
const tubeGeometry = new THREE.TubeGeometry( path, 100, 2, 8, false );
const tubeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexColorFill,
            fragmentShader: fragmentColorFill,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                reactiveLength,
                pipeLength: { value: variables.pipeLength.value }
            },
        })
const tubeMesh = new THREE.Mesh( tubeGeometry, tubeMaterial );
scene.add( tubeMesh );



// // Material
// const material = new THREE.ShaderMaterial({
//     vertexShader: vertexColorFill,
//     fragmentShader: fragmentColorFill,
//     transparent: true,
//     uniforms: {
//         uTime: { value: 0 }
//     }
// })


// const cylinderGeometry = new THREE.CylinderGeometry(5, 20, 1000, 20, 20, true)
// const cylinderMaterial = new THREE.ShaderMaterial({
//         vertexShader: vertexColorFill,
//         fragmentShader: fragmentColorFill,
//         transparent: true,
//         uniforms: {
//             uTime: { value: 0 }
//         }
//     })
// const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
// scene.add(cylinder)



// Mesh
// const plane = new THREE.Mesh(geometry, material)
// scene.add(plane)

// const axesHelper = new THREE.AxesHelper( 5 );
// axesHelper.scale.set(10, 10, 10)
// axesHelper.position.z = 5
// scene.add( axesHelper );

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set( -0.007208426434556429, -204.73211900588136, 20.5198587695649471)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor('#AAAAAA')

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     reactiveLength = ((scrollY / clientHeight) * 100);
     const elapsedTime = clock.getElapsedTime()
 
    //  console.log(camera.position)

     // Update ColorFill
     tubeMaterial.uniforms.uTime.value = elapsedTime

     // Update controls
     controls.update()

     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()

