// Szene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lichtquellen
const light = new THREE.AmbientLight(0x404040, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// 3D-Objekte - Beispiel "Minecraft-Block"
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Kamera Position
camera.position.z = 5;

// Animationen (Text & Bewegungen)
function animate() {
    requestAnimationFrame(animate);
    
    // Cube Rotation für die Animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

// GSAP Animationen für Text
function createText(text, position) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.color = 'white';
    div.style.fontSize = '36px';
    div.style.fontFamily = 'Arial';
    div.style.top = position.y + 'px';
    div.style.left = position.x + 'px';
    div.innerHTML = text;
    document.body.appendChild(div);

    // Effekt mit GSAP
    gsap.fromTo(div, {
        opacity: 0,
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "back.out(1.7)"
    });

    return div;
}

// Text für den Trailer
const welcomeText = createText("Welcome to Eternal Survival", {x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 50});
gsap.to(welcomeText, {opacity: 0, duration: 1, delay: 3, ease: "power1.out"});

// Kamerafahrten und Effekt
gsap.to(camera.position, {
    z: 15,
    duration: 5,
    delay: 2,
    ease: "power2.inOut"
});

// Beispiel für weitere Kamerabewegungen oder Übergänge (p. Beispiel für "Mining"-Szene)
setTimeout(() => {
    const mineText = createText("Mining in Progress...", {x: window.innerWidth / 2 - 180, y: window.innerHeight / 2 - 100});
    gsap.to(mineText, {opacity: 0, duration: 1, delay: 4, ease: "power1.out"});

    // Wechselt die Kamera auf eine andere Position nach "Mining"
    gsap.to(camera.position, {
        z: 25,
        duration: 5,
        delay: 5,
        ease: "power2.inOut"
    });
}, 4000);

// Fenstergröße anpassen
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
