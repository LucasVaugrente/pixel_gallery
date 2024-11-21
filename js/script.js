import {generateStars, updateStars} from "./stars.js";
import {detectMobile} from "./utils.js";

generateStars();
updateStars();

const drawingInProgress = document.querySelector(".inProgress");

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