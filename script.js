function init() {
    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(50, 50, 100);
    camera.lookAt(new THREE.Vector3(50, 50, 0));

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('terrain-container').appendChild(renderer.domElement);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('grass.png');
    const dirtTexture = textureLoader.load('dirt.png');

    // Create terrain
    const terrainWidth = 50;
    const terrainDepth = 50;
    const cubeSize = 2;

    for (let x = 0; x < terrainWidth; x++) {
        for (let z = 0; z < terrainDepth; z++) {
            // Create a cube
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const material = new THREE.MeshBasicMaterial({
                map: dirtTexture,
                side: THREE.DoubleSide
            });

            // Create cube mesh
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x * cubeSize - (terrainWidth * cubeSize) / 2, cubeSize / 2, z * cubeSize - (terrainDepth * cubeSize) / 2);

            // Add cube to scene
            scene.add(cube);

            // Add grass on top of each cube
            const topGeometry = new THREE.BoxGeometry(cubeSize, cubeSize / 10, cubeSize);
            const topMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
            const topCube = new THREE.Mesh(topGeometry, topMaterial);
            topCube.position.set(cube.position.x, cube.position.y + cubeSize / 2 + (cubeSize / 10) / 2, cube.position.z);
            scene.add(topCube);
        }
    }

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(50, 50, 50);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

window.onload = init;
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
