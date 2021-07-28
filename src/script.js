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
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import * as dat from 'dat.gui'

// console.log(SMAAPass)

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })


const variables = {
    arcLength: {
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

/**
 * Plane
 */
// Geometry
const geometry = new THREE.CylinderGeometry(0.2, 0.2, variables.arcLength.value, 100, 100, true)
const material = new THREE.ShaderMaterial({
        vertexShader: vertexColorFill,
        fragmentShader: fragmentColorFill,
        transparent: true,
        uniforms: {
            uTime: { value: 0 },
            arcLength: { value: variables.arcLength.value }
        },
        side: DoubleSide
    })
const arc = new THREE.Mesh(geometry, material)
arc.rotation.z = Math.PI / 2
scene.add(arc)

const arcFolder = gui.addFolder('Arc')
arcFolder.add(material.uniforms.arcLength, 'value', 100, 175, 0.1).name('Arc Length')


console.log(arc.position)


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

    // update composer
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setSize(sizes.width, sizes.height)

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set( 48.26, -6.28, 36.57)
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



////// Post Processing

// Render Target

let RenderTargetClass = null

if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2)
{
    RenderTargetClass = THREE.WebGLMultisampleRenderTarget
    console.log("Multi")
}
else
{
    RenderTargetClass = THREE.WebGLRenderTarget
    console.log("Not Multi")
}

const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    }
)

// Composer
const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

//Passes
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
rgbShiftPass.enabled = true
effectComposer.addPass(rgbShiftPass)

const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.enabled = true
unrealBloomPass.strength = .3
unrealBloomPass.radius = .2
unrealBloomPass.threshold = 0.0
effectComposer.addPass(unrealBloomPass)

const rgbFolder = gui.addFolder('RGB Shift')
rgbFolder.add(rgbShiftPass, 'enabled').name('rgb shift pass')

const bloomFolder = gui.addFolder('Bloom Pass')
bloomFolder.add(unrealBloomPass, 'enabled').name('bloom pass')
bloomFolder.add(unrealBloomPass, 'strength', 0, 2, 0.01).name('Strength')
bloomFolder.add(unrealBloomPass, 'radius', 0, 2, 0.01).name('Radius')
bloomFolder.add(unrealBloomPass, 'threshold', 0, 1, 0.01).name('Threshold')

// Tint pass
const TintShader = {
    uniforms: 
    {
        tDiffuse: { value: null },
        uTint: { value: null }
    },
    vertexShader: `

        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        
            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;
    
        varying vec2 vUv;
        
        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;
            gl_FragColor = color;
        }
    `
}
const tintPass = new ShaderPass(TintShader)
tintPass.material.uniforms.uTint.value = new THREE.Vector3(0.9, 0.9, 0.9)
tintPass.enabled = true
effectComposer.addPass(tintPass)

const tintPassFolder = gui.addFolder('Tint Pass')
tintPassFolder.add(tintPass, 'enabled').name('Tint Pass Enabled')
tintPassFolder.add(tintPass.material.uniforms.uTint.value, 'x', -1, 1, 0.001).name('Red Tint')
tintPassFolder.add(tintPass.material.uniforms.uTint.value, 'y', -1, 1, 0.001).name('Green Tint')
tintPassFolder.add(tintPass.material.uniforms.uTint.value, 'z', -1, 1, 0.001).name('Blue Tint')


// Displacement pass
const DisplacementShader = {
    uniforms:
    {
        tDiffuse: { value: null },
        uTime: { value: null }
    },
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;

        varying vec2 vUv;

        void main()
        {
            vec2 newUv = vec2(
                vUv.x,
                vUv.y + sin(vUv.x * 10.0 + uTime) * 0.02
            );
            vec4 color = texture2D(tDiffuse, newUv);

            gl_FragColor = color;
        }
    `
}

const displacementPass = new ShaderPass(DisplacementShader)
displacementPass.material.uniforms.uTime.value = 0
displacementPass.enabled = true
effectComposer.addPass(displacementPass)



if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)
console.log('using smaa')
}
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
     
     displacementPass.uniforms.uTime.value = elapsedTime

     // Update controls
     controls.update()

     // Render
    //  renderer.render(scene, camera)
    effectComposer.render()
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()

