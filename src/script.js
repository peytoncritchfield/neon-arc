import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentColorFill from './shaders/colorFill/fragment.glsl'
import vertexColorFill from './shaders/colorFill/vertex.glsl'
import { DoubleSide } from 'three'




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene({
    color: 'white'
})

// floor
const floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10)
const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x444466
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.y = 10
floor.rotation.z = - Math.PI / 2
scene.add(floor)

/**
 * Plane
 */
// Geometry
const planeGeometry = new THREE.PlaneGeometry(0.5, 100, 150, 150)
const material = new THREE.ShaderMaterial({
        vertexShader: vertexColorFill,
        fragmentShader: fragmentColorFill,
        transparent: true,
        uniforms: {
            uTime: { value: 0 }
        },
        side: DoubleSide
    })
const plane = new THREE.Mesh(planeGeometry, material)
plane.rotation.z = Math.PI / 2
scene.add(plane)

// class CustomSinCurve extends THREE.Curve {

// 	constructor( scale = 1 ) {

// 		super();

// 		this.scale = scale;

// 	}

// 	getPoint( t, optionalTarget = new THREE.Vector3() ) {

// 		const tx = t;
// 		const ty = 0;
// 		const tz = 0;

// 		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

// 	}

// }

// // Material
// const material = new THREE.ShaderMaterial({
//     vertexShader: vertexColorFill,
//     fragmentShader: fragmentColorFill,
//     transparent: true,
//     uniforms: {
//         uTime: { value: 0 }
//     }
// })

// const path = new CustomSinCurve( 200 );
// const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

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
camera.position.set( 7.561865800270487, -28.57197697916383, 34.969755283259886)
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
renderer.setClearColor('#AAAAAA')

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
    //  console.log(camera.position)

     // Update ColorFill
     material.uniforms.uTime.value = elapsedTime

     // Update controls
     controls.update()

     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()

