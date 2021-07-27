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
// const floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10)
// const floorMaterial = new THREE.MeshBasicMaterial({
//     side: DoubleSide
// })
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.position.z = 10
// scene.add(floor)

/**
 * Plane
 */
// Geometry
const planeGeometry = new THREE.PlaneGeometry(1, 20, 512, 512)


// Material
const material = new THREE.ShaderMaterial({
    vertexShader: vertexColorFill,
    fragmentShader: fragmentColorFill,
    transparent: true,
    uniforms: {
        uTime: { value: 0 }
    },
    side: DoubleSide
})

// Mesh
const plane = new THREE.Mesh(planeGeometry, material)
scene.add(plane)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set( -0.1495845580327776, 0.48533407690156233, 17.41059859408952)
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
renderer.setClearColor('#f3f3f3')

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
    // console.log(camera.position)

    // console.log(fragmentColorFill.vModelPosition)

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

