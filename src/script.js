import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentColorFill from './shaders/colorFill/fragment.glsl'
import vertexColorFill from './shaders/colorFill/vertex.glsl'
import { DoubleSide } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import * as dat from 'dat.gui'

// console.log(ShaderPass)

/**
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
const floorGeometry = new THREE.PlaneGeometry(200, 200, 10, 10)
const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x444466
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.y = 10
floor.position.z = 10
floor.rotation.z = - Math.PI / 2
scene.add(floor)

/**
 * Plane
 */
// Geometry
const geometry = new THREE.CylinderGeometry(0.5, 0.5, variables.pipeLength.value, 100, 100, true)
const material = new THREE.ShaderMaterial({
        vertexShader: vertexColorFill,
        fragmentShader: fragmentColorFill,
        transparent: true,
        uniforms: {
            uTime: { value: 0 },
            pipeLength: { value: variables.pipeLength.value }
        },
        side: DoubleSide
    })
const arc = new THREE.Mesh(geometry, material)
arc.rotation.z = Math.PI / 2
scene.add(arc)

gui.add(material.uniforms.pipeLength, 'value', 100, 175, 0.1).name('Pipe Length')


console.log(arc.position)

console.log(floor.position)

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
camera.position.set( -0.007208426434556429, -84.73211900588136, 20.5198587695649471)
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

// Post Processing
const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)

const glitchPass = new GlitchPass()
glitchPass.enabled = false
glitchPass.goWild = false
effectComposer.addPass(glitchPass)

const rgbShiftPass = new ShaderPass(RGBShiftShader)
effectComposer.addPass(rgbShiftPass)


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
    //  renderer.render(scene, camera)
    effectComposer.render()
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()

