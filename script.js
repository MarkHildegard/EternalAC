// script.js
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const attackMessage = document.getElementById('attack-message');
const server = document.getElementById('server');
const projectile = document.getElementById('projectile');

startBtn.addEventListener('click', startAttack);
stopBtn.addEventListener('click', stopAttack);

let attackInterval, projectileInterval;

function startAttack() {
    attackMessage.style.display = 'block';
    server.style.display = 'block';
    server.classList.add('slide-in');
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';

    // Simulate the attack
    attackInterval = setInterval(() => {
        projectile.style.display = 'block';
        launchProjectile();
        setTimeout(() => {
            projectile.classList.add('blocked');
            logAttack("Blocked an attack!");
        }, 3000);
    }, 4000);

    // Defeat the server after some time
    setTimeout(() => {
        server.classList.add('defeated');
        logAttack("Server Defeated! Attack Successful!");
        clearInterval(attackInterval);
    }, 12000);
}

function stopAttack() {
    clearInterval(attackInterval);
    projectile.style.display = 'none';
    attackMessage.style.display = 'none';
    server.style.display = 'none';
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
}

function launchProjectile() {
    projectile.style.left = `${Math.random() * 100 + 10}%`;  // Randomize the projectile's starting position
    projectile.style.top = `${Math.random() * 100 + 10}%`;
    projectile.style.animation = 'shootProjectile 1s infinite linear';
}

function logAttack(message) {
    attackMessage.innerHTML = message;
}
