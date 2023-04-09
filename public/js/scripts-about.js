const container = document.getElementById('3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('/sewing_machine.glb', function (gltf) {
    scene.add(gltf.scene);

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame(animate);

        gltf.scene.rotation.x += 0.01;
        gltf.scene.rotation.y += 0.01;

        controls.update();

        renderer.render(scene, camera);
    };

    animate();
});
