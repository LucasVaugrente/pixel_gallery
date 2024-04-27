const body = document.querySelector('body');
const rocket = document.querySelector('.svg_rocket');
const tooltip_rocket = document.getElementById('tooltip_rocket')
const tooltip_rocket_text = document.querySelector('.tooltip-text')
const footer = document.querySelector('footer');

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

document.addEventListener("scroll", function () {
    const scrollPercentage = getScrollPercentage();

    const newTop = (scrollPercentage / 100) * maxTop;

    // Vérification du sens du scroll
    if (scrollPercentage > scroll_count) {
        // console.log("b");
    } 
    else {
        // console.log("m");
    }

    if (scrollPercentage === 100) {
        rocket.classList.remove('animation');
    } else {
        rocket.classList.add('animation');
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
function updateFrames() {

    function updateBackground() {
        let index = Math.floor(Math.random() * 10) + 1;
        rocket.style.backgroundImage = `url('img/rocket/rocket${index}.png')`;
    }

    setInterval(updateBackground, 100);
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

updateFrames()