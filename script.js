const body = document.querySelector('body');
const rocket = document.querySelector('.svg_rocket');
const tooltip_rocket = document.getElementById('tooltip_rocket')
const tooltip_rocket_text = document.querySelector('.tooltip-text')
const footer = document.querySelector('footer');
const launchButton = document.querySelector('.launchRocket');

function animatePixel(pixelSmoke, rightMax) {
    pixelSmoke.style.right = `${rightMax}px`;
    pixelSmoke.style.backgroundColor = "rgba(114, 114, 114, 0.37)";
    setTimeout(() => {
        pixelSmoke.style.backgroundColor = "rgba(190, 190, 190, 0.192)";
        setTimeout(() => {
            pixelSmoke.style.backgroundColor = "transparent";
            setTimeout(() => {
                pixelSmoke.parentNode.removeChild(pixelSmoke);
            }, 1000);
        }, 1000);
    }, 1000);
    if (Math.random() < 0.5) {
        setTimeout(function() {
            pixelSmoke.style.bottom = Math.floor(Math.random() * 51) + 300 + "px";
        }, 500);
    }
    setTimeout(function() {
        // pixelSmoke.parentNode.removeChild(pixelSmoke);
    }, 3000);
}

function generateSmoke() {
    for (let index = 0; index < 1000; index++) {
        const smokeRocket = document.querySelector(".smokeRocket");
        const blockSmoke = document.createElement("div");
        blockSmoke.classList.add("pixelSmoke");
    
        const bottom = Math.floor(Math.random() * 51) + 250;
        const rightMin = 1000;
        const width_height = Math.floor(Math.random() * 11) + 5;

        blockSmoke.style.right = `${rightMin}px`;
        blockSmoke.style.bottom = `${bottom}px`;
        blockSmoke.style.width = `${width_height}px`;
        blockSmoke.style.height = `${width_height}px`;
    
        smokeRocket.appendChild(blockSmoke);

        let randomNumber;
        if (Math.random() < 0.5) {
            randomNumber = Math.floor(Math.random() * 401) + 1000;
        } else {
            randomNumber = Math.floor(Math.random() * 401) + 600;
        }
        
        const rightMax = randomNumber;
        const delay = Math.floor(Math.random() * 1001) + 1000;
        setTimeout(() => {
            blockSmoke.style.opacity = "1";
            animatePixel(blockSmoke, rightMax);
        }, delay);
    }
}

// generateSmoke()

const landing = false;

const maxTop = window.innerHeight - footer.offsetHeight / 1.5;

const starsNumber = 70;
let scroll_count = 0;
const lineHeader = 10;
const lineFooter = 90;

// Stars generation (random positions)
for (let i = 0; i < starsNumber; i++) {
    const star = document.createElement('div');
    star.classList.add('mini-star');
    star.style.left = Math.random() * 98 + 'vw';
    star.style.top = Math.random() * document.documentElement.scrollHeight + 'px';

    const widthANDheight = Math.random() * 5 + 1;
    star.style.width = widthANDheight + 'px';
    star.style.height = widthANDheight + 'px';

    body.appendChild(star);
}

let stars = document.querySelectorAll('.mini-star');
for (let index = 0; index < 20; index++) {
    let star = stars[Math.floor(Math.random() * stars.length)];
    star.style.animation = "twinkle 3s ease-in-out infinite";
}

const rocketFrameImages = [
    'img/rocket/rocket1.png',
    'img/rocket/rocket2.png',
    'img/rocket/rocket3.png',
    'img/rocket/rocket4.png',
    'img/rocket/rocket5.png',
    'img/rocket/rocket6.png',
    'img/rocket/rocket7.png',
    'img/rocket/rocket8.png',
    'img/rocket/rocket9.png',
    'img/rocket/rocket10.png'
];


function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

preloadImages(rocketFrameImages);

updateFrames(true)

document.addEventListener("scroll", function () {
    const scrollPercentage = getScrollPercentage();

    const newTop = (scrollPercentage / 100) * maxTop;

    if (scrollPercentage === 100) {
        rocket.style.filter = "none";
        rocket.style.backgroundImage = `url('img/rocket/rocket.png')`;
        rocket.classList.remove('animation');
        updateFrames(false);
        launchButton.classList.add("visible")
    } else {
        rocket.style.filter = "drop-shadow(0 40px 15px rgb(255, 240, 25))";
        rocket.classList.add('animation');
        launchButton.classList.remove("visible")
        updateFrames(true); // Activer l'animation lorsque vous n'êtes pas en bas de la page
    }

    rocket.style.top = newTop + 'px';
    tooltip_rocket.style.top = newTop + 'px';

    scroll_count = scrollPercentage;
});

/**
 * 
 * @summary Retourne le pourcentage de défilement
 * @returns {number} Le pourcentage de défilement
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

/**
 * 
 * @summary Met à jour les frames de la fusée
 * 
 */ 
function updateFrames(active) {
    if (active && scroll_count !== 100) {
        function updateBackground() {
            let index = Math.floor(Math.random() * rocketFrameImages.length);
            rocket.style.backgroundImage = `url('${rocketFrameImages[index]}')`;
        }
        // Vous pouvez également vérifier si l'intervalle est déjà en cours pour éviter de le réinitialiser à chaque fois.
        if (!updateFrames.intervalId) {
            updateFrames.intervalId = setInterval(updateBackground, 100);
        }
    } else {
        clearInterval(updateFrames.intervalId);
        updateFrames.intervalId = null;
    }
}

const textTooltipBegin = "Vous pouvez me suivre tout au long du périple en me survolant :)";

let indexLetter = 0;

function animateText() {
    if (indexLetter < textTooltipBegin.length) {
        tooltip_rocket_text.textContent += textTooltipBegin[indexLetter];
        indexLetter++;
        setTimeout(animateText, 100);
    }
}

function eraseText() {
    tooltip_rocket_text.textContent = ""
}

rocket.addEventListener('mouseenter', () => {
    tooltip_rocket.style.opacity = "1";
    animateText()
});

rocket.addEventListener('mouseleave', () => {
    tooltip_rocket.style.opacity = "";
    eraseText()
    indexLetter = 0;
});

/**
 * 
 * @summary Détecte si l'utilisateur est sur un appareil mobile
 * 
 */ 
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

if(detectMobile()) {
    const titlesDrawing = document.querySelectorAll('.drawing h3');
    titlesDrawing.forEach(function (titleDrawing, currentIndex) {
        titleDrawing.style.opacity = '1';
    }, "myThisArg");
}

launchButton.addEventListener('click', () => {
    const titleWelcome = document.querySelector('header h1');
    const subtitleWelcome = document.querySelector('header p');
    titleWelcome.innerHTML = "Oh... are you back ? 👀";
    subtitleWelcome.innerHTML = "Thank you for visiting my page 🤗";
    document.documentElement.classList.add('smooth-scroll');

    slowScrollToTop();
});

const slow = 10000;
const effect = easeInOutCuaic;

function slowScrollToTop() {
    const e = document.documentElement;
    let floor = e.scrollHeight - e.scrollTop - e.clientHeight === 0;
    if (floor) {
      scrollTo(0, slow);
    }
}

// Element to move + duration in milliseconds
function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
      var t = e.scrollTop;
      ++e.scrollTop;
      e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
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

    setTimeout(function() {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}


function easeInOutCuaic(t) {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
  }