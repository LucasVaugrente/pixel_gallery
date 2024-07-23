const body = document.querySelector('body');
const header = document.querySelector('header');
const welcomeText = document.querySelectorAll('.welcome_text h1');
const rocket = document.querySelector('.svg_rocket');
const tooltip_rocket = document.getElementById('tooltip_rocket');
const tooltip_rocket_text = document.querySelector('.tooltip-text');
const listDrawingTooltip = document.querySelectorAll('.listDrawingTooltip a');
const footer = document.querySelector('footer');
const launchButton = document.querySelector('.launchRocket');
const landingButton = document.querySelector('#landingRocket');
const sky = document.querySelector('.sky');
const drawingInProgress = document.querySelector(".inProgress");
const blackholeBlock = document.querySelector('.blackholeBlock');
const blackhole = document.querySelector('.blackhole');
const attractionRadius = 300;
const attractionSpeed = 1;


const numberSmoke = 10000;
let generateSmokeZone = false;
let generateSmokeInProgress = false;
let scroll_count = 0;
let previousScrollPercentage = getScrollPercentage();

const drawings = document.querySelectorAll(".drawing");
const allDrawingLinkWebsite = {};
for (let i = 0; i < drawings.length - 1; i++) {
    allDrawingLinkWebsite[i] = [
        drawings[i].innerText,
        `#drawing${i + 1}`
    ];
}

let indexLetter = 0;
let tooltipTimer;
let rocketHovered = false;

const starsNumber = 100;
const maxRightShootingStars = 500;
const maxTopShootingStars = 1500;
let selectedStar = null;
let offsetXStar = 0;
let offsetYStar = 0;

generateStars();

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
    tooltip_rocket.style.top = newTop - 40 + 'px';

    scroll_count = scrollPercentage;
    previousScrollPercentage = scrollPercentage;
});

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

let slow;
let effect;
let isScrollingAutomatically = false;
let scrollTimeout;
let ignoreScrollEvents = false;

listDrawingTooltip.forEach(link => {
    link.addEventListener('click', event => {
        effect = linearTween;
        slow = 1000;
        const idDrawing = document.querySelector("#" + event.target.className);
        slowScrollTo(idDrawing.offsetTop - 100);
    })
})

launchButton.addEventListener('click', () => {
    const titleWelcome = document.querySelector('header h1');
    const subtitleWelcome = document.querySelector('header p');
    titleWelcome.innerHTML = "Thank you for visiting my page 🤗";
    subtitleWelcome.innerHTML = "";
    document.documentElement.classList.add('smooth-scroll');
    slow = 15000;
    effect = easeInOutCuaic;
    
    generateSmoke();
    slowScrollToTop();
});

landingButton.addEventListener('click', () => {
    if (getScrollPercentage() !== 100) {
        landingButton.disabled = true;
        document.documentElement.classList.add('smooth-scroll');
        slow = 12000;
        effect = easeInOutCuaic;
        animateLandButton();
        slowScrollToBottom();
    }
});

drawingInProgress.addEventListener('mouseenter', () => {
    const title = drawingInProgress.querySelector("h2");
    title.innerHTML = "🤫";
});

drawingInProgress.addEventListener('mouseleave', () => {
    const title = drawingInProgress.querySelector("h2");
    title.innerHTML = "Drawing in progress...";
});

if (detectMobile()) {
    const titlesDrawing = document.querySelectorAll('.drawing h3');
    titlesDrawing.forEach(function (titleDrawing, currentIndex) {
        titleDrawing.style.opacity = '1';
    }, "myThisArg");
}

/* ######################################################################################################### */
/* ##############################################  FONCTIONS  ############################################## */
/* ######################################################################################################### */

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
        star.style.top = Math.random() * document.documentElement.scrollHeight + 'px';

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

// function generate1ShootingStar() {
//     const windowWidth = window.innerWidth;
//     const topPosition = Math.random() * document.documentElement.scrollHeight - maxTopShootingStars;
//     let leftPosition = Math.random() * 100;

//     const shootingStar = document.createElement('div');
//     shootingStar.classList.add('shooting-star');

//     if (windowWidth - (leftPosition / 100 * windowWidth) < maxRightShootingStars) {
//         while (windowWidth - (leftPosition / 100 * windowWidth) < maxRightShootingStars) {
//             leftPosition = Math.random() * 100;
//         }
//     }

//     shootingStar.style.left = leftPosition + 'vw';
//     shootingStar.style.top = topPosition + 'px';

//     sky.appendChild(shootingStar);

//     setTimeout(() => {
//         shootingStar.remove();
//     }, 6000);
// }

// function startGeneratingShootingStars() {
//     const delay = Math.random() * (5000 - 1000) + 1000;

//     setTimeout(() => {
//         generate1ShootingStar();
//         startGeneratingShootingStars();
//     }, delay);
// }

// startGeneratingShootingStars();

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

/**
 * 
 * @summary Return the scroll percentage
 * @returns {scrollPercent} Scroll percentage
 *
 */
function getScrollPercentage() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
    );

    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    return scrollPercent * 100;
}

function animateLandButton() {
    for (let index = 0; index < 20; index++) {
        const wind_line = document.createElement("span");
        const left = Math.random() * (300 - 2) + 10;
        const height = Math.random() * (20 - 10) + 10;
        const bottom = Math.random() * 50 - 50;

        wind_line.style.height = `${height}px`;
        wind_line.style.bottom = `${bottom}px`;
        wind_line.style.left = `${left}px`;

        wind_line.classList.add("windLine");
        wind_line.classList.add("animated");
        landingButton.appendChild(wind_line);
        setTimeout(() => {
            landingButton.removeChild(wind_line);
        }, 2000);
    }
}

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

    welcomeText.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordCenter = {
            x: wordRect.left + wordRect.width / 2,
            y: wordRect.top + wordRect.height / 2
        };

        const distanceX = blackholeCenter.x - wordCenter.x;
        const distanceY = blackholeCenter.y - wordCenter.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < attractionRadius) {
            const moveX = (distanceX / distance) * attractionSpeed;
            const moveY = (distanceY / distance) * attractionSpeed;


            const newLeft = parseFloat(word.style.left) + moveX;
            const newTop = parseFloat(word.style.top) + moveY;

            word.style.left = newLeft + 'px';
            word.style.top = newTop + 'px';

            if (distance < 20) {
                word.remove();
            }
        }
    });

    requestAnimationFrame(updateStars);
}

updateStars();

function slowScrollTo(positionTop) {
    ignoreScrollEvents = true;
    scrollTo(positionTop, slow);
    setTimeout(() => ignoreScrollEvents = false, 100);
}

function slowScrollToBottom() {
    const floor = footer.offsetTop - 270;
    ignoreScrollEvents = true;
    scrollTo(floor, slow);
    setTimeout(() => ignoreScrollEvents = false, 100);
}

function slowScrollToTop() {
    const e = document.documentElement;
    let floor = e.scrollHeight - e.scrollTop - e.clientHeight === 0;
    if (floor) {
        ignoreScrollEvents = true;
        scrollTo(0, slow);
        setTimeout(() => ignoreScrollEvents = false, 100);
    }
}

function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;
    scrollToX(element, from, to, 0, 1 / duration, 20, effect);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }

    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    scrollTimeout = setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

function linearTween(t) {
    return t;
}

function easeInQuad(t) {
    return t * t;
}

function easeOutQuad(t) {
    return -t * (t - 2);
}

function easeInOutQuad(t) {
    t /= 0.5;
    if (t < 1) return t * t / 2;
    t--;
    return (t * (t - 2) - 1) / 2;
}

function easeInCuaic(t) {
    return t * t * t;
}

function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
}

function easeInOutCuaic(t) {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
}

function easeInQuart(t) {
    return t * t * t * t;
}

function easeOutQuart(t) {
    t--;
    return -(t * t * t * t - 1);
}

function easeInOutQuart(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t * t * t;
    t -= 2;
    return -(t * t * t * t - 2) / 2;
}

function easeInQuint(t) {
    return t * t * t * t * t;
}

function easeOutQuint(t) {
    t--;
    return t * t * t * t * t + 1;
}

function easeInOutQuint(t) {
    t /= 0.5;
    if (t < 1) return t * t * t * t * t / 2;
    t -= 2;
    return (t * t * t * t * t + 2) / 2;
}

function easeInSine(t) {
    return -Math.cos(t / (Math.PI / 2)) + 1;
}

function easeOutSine(t) {
    return Math.sin(t / (Math.PI / 2));
}

function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeInExpo(t) {
    return Math.pow(2, 10 * (t - 1));
}

function easeOutExpo(t) {
    return -Math.pow(2, -10 * t) + 1;
}

function easeInOutExpo(t) {
    t /= 0.5;
    if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2;
    t--;
    return (-Math.pow(2, -10 * t) + 2) / 2;
}

function easeInCirc(t) {
    return -Math.sqrt(1 - t * t) - 1;
}

function easeOutCirc(t) {
    t--;
    return Math.sqrt(1 - t * t);
}

function easeInOutCirc(t) {
    t /= 0.5;
    if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
    t -= 2;
    return (Math.sqrt(1 - t * t) + 1) / 2;
}

/* ################ DETECT ON MOBILE ################ */
function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}