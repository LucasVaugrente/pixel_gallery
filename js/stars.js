const sky = document.querySelector('.sky');
const blackhole = document.querySelector('.blackhole');

const starsNumber = 100;
const maxRightShootingStars = 500;
const maxTopShootingStars = 1500;
let selectedStar = null;
let offsetXStar = 0;
let offsetYStar = 0;
const attractionRadius = 300;
const attractionSpeed = 1;

/**
 *
 * @summary Generate stars on the background
 *
 */
function generateStars() {
    for (let i = 0; i < starsNumber; i++) {
        const star = document.createElement('div');
        star.classList.add('mini-star');
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * (document.documentElement.scrollHeight) + 'px';

        const widthANDheight = Math.random() * 5 + 1;
        star.style.width = widthANDheight + 'px';
        star.style.height = widthANDheight + 'px';

        star.addEventListener('mousedown', onMouseDown);

        sky.appendChild(star);
    }

    const stars = document.querySelectorAll('.mini-star');
    for (let index = 0; index < 20; index++) {
        const star = stars[Math.floor(Math.random() * stars.length)];
        star.style.animation = "twinkle 3s ease-in-out infinite";
    }
}

function generate1ShootingStar() {
    const windowWidth = window.innerWidth;
    const topPosition = Math.random() * document.documentElement.scrollHeight - maxTopShootingStars;
    let leftPosition = Math.random() * 100;

    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    if (windowWidth - (leftPosition / 100 * windowWidth) < maxRightShootingStars) {
        while (windowWidth - (leftPosition / 100 * windowWidth) < maxRightShootingStars) {
            leftPosition = Math.random() * 100;
        }
    }

    shootingStar.style.left = leftPosition + 'vw';
    shootingStar.style.top = topPosition + 'px';

    sky.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 6000);
}

function startGeneratingShootingStars() {
    const delay = Math.random() * (5000 - 1000) + 1000;

    setTimeout(() => {
        generate1ShootingStar();
        startGeneratingShootingStars();
    }, delay);
}

function onMouseDown(e) {
    selectedStar = e.target;
    offsetXStar = e.clientX - selectedStar.getBoundingClientRect().left;
    offsetYStar = e.clientY - selectedStar.getBoundingClientRect().top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
    if (selectedStar) {
        selectedStar.style.left = e.clientX - offsetXStar + window.scrollX + 'px';
        selectedStar.style.top = e.clientY - offsetYStar + window.scrollY + 'px';
    }
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    selectedStar = null;
}

function updateStars() {
    const blackholeRect = blackhole.getBoundingClientRect();
    const blackholeCenter = {
        x: blackholeRect.left + blackholeRect.width / 2,
        y: blackholeRect.top + blackholeRect.height / 2
    };

    const stars = document.querySelectorAll('.mini-star');

    stars.forEach(star => {
        const starRect = star.getBoundingClientRect();
        const starCenter = {
            x: starRect.left + starRect.width / 2,
            y: starRect.top + starRect.height / 2
        };

        const distanceX = blackholeCenter.x - starCenter.x;
        const distanceY = blackholeCenter.y - starCenter.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < attractionRadius) {
            const moveX = (distanceX / distance) * attractionSpeed;
            const moveY = (distanceY / distance) * attractionSpeed;

            const newLeft = parseFloat(star.style.left) + moveX;
            const newTop = parseFloat(star.style.top) + moveY;

            star.style.left = newLeft + 'px';
            star.style.top = newTop + 'px';

            if (distance < 20) {
                star.remove();
            }
        }
    });

    // welcomeText.forEach(word => {
    //     const wordRect = word.getBoundingClientRect();
    //     const wordCenter = {
    //         x: wordRect.left + wordRect.width / 2,
    //         y: wordRect.top + wordRect.height / 2
    //     };

    //     const distanceX = blackholeCenter.x - wordCenter.x;
    //     const distanceY = blackholeCenter.y - wordCenter.y;
    //     const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    //     if (distance < attractionRadius) {
    //         const moveX = (distanceX / distance) * attractionSpeed;
    //         const moveY = (distanceY / distance) * attractionSpeed;


    //         const newLeft = parseFloat(word.style.left) + moveX;
    //         const newTop = parseFloat(word.style.top) + moveY;

    //         word.style.left = newLeft + 'px';
    //         word.style.top = newTop + 'px';

    //         if (distance < 20) {
    //             word.remove();
    //         }
    //     }
    // });

    requestAnimationFrame(updateStars);
}

export { generateStars, updateStars };