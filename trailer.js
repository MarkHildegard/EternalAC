// Szene und Kamera Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lichtquellen
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Minecraft-Block als Beispiel
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const block = new THREE.Mesh(geometry, material);
block.position.set(0, 0, 0);
scene.add(block);

// Lade Minecraft-Spieler-Modelle (Vorab vorbereitete Modelle als Beispiel)
const loader = new THREE.GLTFLoader();
let playerModel;
loader.load('player_model.glb', function (gltf) {
    playerModel = gltf.scene;
    playerModel.scale.set(0.5, 0.5, 0.5);
    playerModel.position.set(-3, 0, 0);
    scene.add(playerModel);
}, undefined, function (error) {
    console.error(error);
});

// Kamera Setup
camera.position.z = 10;

// Kampfanimationen
function animateFight() {
    if (playerModel) {
        gsap.to(playerModel.rotation, { y: Math.PI * 2, duration: 2, repeat: -1, ease: "none" }); // Spieler dreht sich
    }
    gsap.to(block.position, { x: 2, duration: 1, yoyo: true, repeat: -1 }); // Block bewegt sich hin und her
}

// Kampftext anzeigen
function displayFightText() {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.color = 'white';
    div.style.fontSize = '50px';
    div.style.fontFamily = 'Arial';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.innerHTML = "Epic Battle!";
    document.body.appendChild(div);

    // Textanimation mit GSAP
    gsap.fromTo(div, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" });
    gsap.to(div, { opacity: 0, duration: 1, delay: 3 });
}

// Animation der gesamten Szene
function animate() {
    requestAnimationFrame(animate);

    if (playerModel) {
        playerModel.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
animate();

// Kampf starten
setTimeout(() => {
    animateFight();
    displayFightText();
}, 2000);

// Resize-Handling für Responsivität
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
