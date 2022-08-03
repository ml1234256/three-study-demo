// create scene 场景
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')

// create mesh 物品
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0x00eeee})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// create camera 相机
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3
camera.position.x = 0
camera.position.y = 0
scene.add(camera)

// create renderer 渲染器
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

// render 渲染
renderer.render(scene, camera)

// animate 动画， 物体运动
const clock = new THREE.Clock()
// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     mesh.position.x = Math.cos(elapsedTime)
//     mesh.position.y = Math.sin(elapsedTime)
//     camera.lookAt(mesh.position)
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()

// 通过鼠标移动控制相机视角
const cursor = {
   x: 0,
   y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})
const tick = () => {
    // camera.position.x = cursor.x * 5
    // camera.position.y = cursor.y * 5
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

// 使用环轨控制器, 在'three/examples/jsm/controls/OrbitControls.js'中
// const controls = new OrbitControls(camera, canvas)
// const tick = () => {
//     controls.update()
//     renderer.render(scene, camera)
// }

// tick()

// 设置画布缩放和网页全屏
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // update camera 
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 双击进入全屏，双击退出全屏
window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})