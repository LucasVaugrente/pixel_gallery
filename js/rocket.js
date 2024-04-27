const rocket = document.querySelector('.svg_rocket');
const tooltip_rocket = document.getElementById('tooltip_rocket')
const tooltip_rocket_text = document.querySelector('.tooltip-text')
const footer = document.querySelector('footer');

const maxTop = window.innerHeight - footer.offsetHeight / 1.5;

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

    setInterval(updateBackground, 1000);
}

const textTooltipBegin = "Vous pouvez me suivre tout au long du périple en me survolant :)";

let indexLetter = 0;

function animateText(tooltipText) {
    if (indexLetter < tooltipText.length) {
        tooltip_rocket_text.textContent += tooltipText[indexLetter];
        indexLetter++;
        setTimeout(animateText(textTooltipBegin), 100);
    }
}

function eraseText() {
    tooltip_rocket_text.textContent = ""
}

rocket.addEventListener('mouseenter', () => {
    tooltip_rocket.style.opacity = "1";
    animateText(textTooltipBegin)
});

rocket.addEventListener('mouseleave', () => {
    tooltip_rocket.style.opacity = "";
    eraseText()
    indexLetter = 0;
});

updateFrames()