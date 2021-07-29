import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentColorFill from './shaders/colorFill/fragment.glsl'
import vertexColorFill from './shaders/colorFill/vertex.glsl'
import * as dat from 'dat.gui'

let scrollY = 0;
let clientHeight = window.document.body.clientHeight;
let reactiveLength = 0;

window.addEventListener("scroll", function () {
    scrollY = window.scrollY;
    clientHeight = window.document.body.clientHeight;
})

const gui = new dat.GUI({ width: 340 })


const variables = {
    pipeLength: {
        value: 120
    }
}

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene({
    color: 'white'
})


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
                reactiveLength: {
                    value: reactiveLength
                },
                pipeLength: { value: variables.pipeLength.value }
            },
        })
const tubeMesh = new THREE.Mesh( tubeGeometry, tubeMaterial );
scene.add( tubeMesh );

 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set( -0.007208426434556429, -204.73211900588136, 20.5198587695649471)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
     // Update ColorFill
     tubeMaterial.uniforms.uTime.value = elapsedTime;
     tubeMaterial.uniforms.reactiveLength.value = ((scrollY / clientHeight) * 100);

     // Update controls
     controls.update()

     renderer.render(scene, camera)
 
     window.requestAnimationFrame(tick)
 }
 
 tick()

