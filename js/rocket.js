import { getScrollPercentage, slowScrollToBottom, slowScrollToTop, easeInOutCuaic, settings } from "./utils.js";

const rocket = document.querySelector('.svg_rocket');
const tooltip_rocket = document.getElementById('tooltip_rocket');
const listDrawingTooltip = document.querySelectorAll('.listDrawingTooltip');
const footer = document.querySelector('footer');
const launchButton = document.querySelector('.launchRocket');
const landingButton = document.querySelector('#landingRocket');

const isPhone = window.innerWidth < 580;

const numberSmoke = 10000;
let generateSmokeZone = false;
let generateSmokeInProgress = false;
let previousScrollPercentage = getScrollPercentage();

let tooltipTimer;

if (isPhone) {
    rocket.style.display = "none";
    tooltip_rocket.style.display = "none";
}

const drawings = document.querySelectorAll(".figure img");
const allDrawingLinkWebsite = {};
for (let i = 0; i < drawings.length; i++) {
    allDrawingLinkWebsite[i] = [
        drawings[i].alt,
        `#drawing${i + 1}`
    ];
    const link = document.createElement("a");
    link.innerHTML = allDrawingLinkWebsite[i][0];
    link.classList.add(allDrawingLinkWebsite[i][1].substring(1));
    listDrawingTooltip[0].appendChild(link);
}

if (!isPhone) {
    document.addEventListener("scroll", function () {
        const scrollPercentage = getScrollPercentage();
        const scrollDirection = scrollPercentage > previousScrollPercentage ? 'down' : 'up';
        const maxTop = window.innerHeight - footer.offsetHeight / 2;
        const newTop = (scrollPercentage / 100) * maxTop;

        if (scrollPercentage >= 100) {
            rocket.style.filter = "none";
            rocket.classList.remove('landing');
            rocket.classList.remove('onspace');
            landingButton.disabled = false;
            generateSmokeInProgress = false;
            generateSmokeZone = true;
            generateSmoke();
        } else {
            rocket.style.filter = "drop-shadow(0 40px 15px rgb(255, 240, 25))";
        }

        if (!generateSmokeInProgress && scrollPercentage > 98 && scrollPercentage < 100) {
            rocket.classList.add('landing');
            rocket.classList.remove('onspace');
            generateSmokeInProgress = true;
            generateSmokeZone = false;
            generateSmoke();
        }
        if (scrollPercentage < 98) {
            rocket.classList.add('onspace');
            rocket.classList.remove('landing');
            generateSmokeInProgress = false;
            generateSmokeZone = true;
            generateSmoke();
        }

        if (scrollPercentage > 99 && scrollDirection === 'down') {
            launchButton.classList.add("show");
        }

        if (scrollPercentage < 99.95 && scrollDirection === 'up') {
            launchButton.classList.remove("show");
        }

        rocket.style.top = newTop + 'px';
        tooltip_rocket.style.top = newTop + 'px';

        previousScrollPercentage = scrollPercentage;
    });
}

rocket.addEventListener('mouseenter', () => {
    tooltip_rocket.style.pointerEvents = "all";
    tooltip_rocket.style.opacity = "1";
});

tooltip_rocket.addEventListener('mouseenter', () => {
    clearTimeout(tooltipTimer);
});

rocket.addEventListener('mouseleave', () => {
    tooltipTimer = setTimeout(() => {
        tooltip_rocket.style.opacity = "0";
        tooltip_rocket.style.pointerEvents = "none";
    }, 300);
});

tooltip_rocket.addEventListener('mouseleave', () => {
    tooltip_rocket.style.opacity = "0";
    tooltip_rocket.style.pointerEvents = "none";
});

launchButton.addEventListener('click', () => {
    const titleWelcome = document.querySelector('.welcome_text');
    const subtitleWelcome = document.querySelector('#welcome p');
    titleWelcome.innerHTML = "Thank you for visiting my page 🤗";
    subtitleWelcome.innerHTML = "";
    document.documentElement.classList.add('smooth-scroll');
    settings.slow = 15000;
    settings.effect = easeInOutCuaic;
    generateSmoke();
    slowScrollToTop();
});

landingButton.addEventListener('click', () => {
    if (getScrollPercentage() !== 100) {
        landingButton.disabled = true;
        document.documentElement.classList.add('smooth-scroll');
        settings.slow = 12000;
        settings.effect = easeInOutCuaic;
        slowScrollToBottom();
    }
});

/**
 *
 * @summary Retourne le pourcentage de défilement
 * @returns {number} Le pourcentage de défilement
 *
 */
function animatePixel(pixelSmoke, rightMax, goToRight) {
    let delay = 4000;
    pixelSmoke.style.right = `${rightMax}px`;
    pixelSmoke.style.backgroundColor = "rgba(207, 207, 207, 0.774)";
    setTimeout(() => {
        pixelSmoke.style.backgroundColor = "rgba(240, 240, 240, 0.774)";
        setTimeout(() => {
            pixelSmoke.style.backgroundColor = "transparent";
        }, 1000);
    }, 1000);
    if (Math.random() < 0.7) {
        setTimeout(function () {
            if (rightMax > 250) {
                pixelSmoke.style.bottom = Math.floor(Math.random() * 71) + 200 + "px";
            }
        }, 500);
    }
    if ((goToRight && rightMax > window.innerWidth - 5) || pixelSmoke.getBoundingClientRect().bottom > window.innerHeight) {
        pixelSmoke.parentNode.removeChild(pixelSmoke);
        return;
    }

    setTimeout(function () {
        pixelSmoke.parentNode.removeChild(pixelSmoke);
    }, delay);
}

function generateSmoke() {
    let smokeCount = 0;

    function generatePixelSmoke() {
        const smokeRocket = document.querySelector(".smokeRocket");
        const blockSmoke = document.createElement("div");
        blockSmoke.classList.add("pixelSmoke");

        const bottom = Math.floor(Math.random() * 16) + 200;
        const rightMin = 60;
        const width_height = Math.floor(Math.random() * 5) + 3;

        blockSmoke.style.right = `${rightMin}px`;
        blockSmoke.style.bottom = `${bottom}px`;
        blockSmoke.style.width = `${width_height}px`;
        blockSmoke.style.height = `${width_height}px`;

        smokeRocket.appendChild(blockSmoke);

        let randomNumber;
        let goToRight = false;
        if (Math.random() < 0.8) {
            randomNumber = Math.floor(Math.random() * 401) + rightMin + 90;
        } else {
            randomNumber = Math.floor(Math.random() * rightMin);
            goToRight = true;
        }

        const rightMax = randomNumber;
        const delay = Math.floor(Math.random() * 1001) + 100;
        setTimeout(() => {
            blockSmoke.style.opacity = "1";
            animatePixel(blockSmoke, rightMax, goToRight);
        }, delay);

        smokeCount++;

        if (smokeCount < numberSmoke && !generateSmokeZone) {
            setTimeout(generatePixelSmoke, 10);
        }
    }
    if (!generateSmokeZone) {
        generatePixelSmoke();
    }
}