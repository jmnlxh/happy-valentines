const heartContainer = document.getElementById('heart-container');
const opacities = [0.9, 0.3, 0.2, 0.5, 0.8];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const randomOpacity = opacities[Math.floor(Math.random() * opacities.length)];
    heart.style.opacity = randomOpacity;

    heartContainer.appendChild(heart);

    heart.onclick = () => {
        createFireworks(x, y);
        heart.remove();
    };

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function createFireworks(x, y) {
    const numberOfHearts = 13;
    const scatterDistance = 110;

    for (let i = 0; i < numberOfHearts; i++) {
        const smallHeart = document.createElement('div');
        smallHeart.classList.add('small-heart');

        const angle = (i / numberOfHearts) * (Math.PI * 2);
        const heartX = 16 * Math.sin(angle) ** 3;
        const heartY = - (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

        const offsetX = heartX * (scatterDistance / 20);
        const offsetY = heartY * (scatterDistance / 20);

        smallHeart.style.left = `${x}px`;
        smallHeart.style.top = `${y}px`;

        heartContainer.appendChild(smallHeart);

        setTimeout(() => {
            smallHeart.style.transition = 'transform 1s ease, opacity 1s ease';
            smallHeart.style.transform = `translate(${offsetX}px, ${offsetY}px)`; 
        }, 10);

        setTimeout(() => {
            smallHeart.style.opacity = '0';
            setTimeout(() => {
                smallHeart.remove();
            }, 1000);
        }, 1000);
    }
}

function spawnHearts() {
    createHeart();
    setTimeout(spawnHearts, 220);
}

spawnHearts();

