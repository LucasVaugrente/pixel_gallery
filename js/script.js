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
    titlesDrawing.forEach(function (titleDrawing) {
        titleDrawing.style.opacity = '1';
    }, "myThisArg");
}

const modal = document.getElementById("imageViewer");
const modalImg = document.getElementById("fullImage");
const captionText = document.getElementById("caption");

const figures = document.querySelectorAll(".column_images figure img");

figures.forEach((img) => {
    img.addEventListener("click", (e) => {
        modal.style.display = "block";
        modalImg.src = e.target.src;
        captionText.innerText = e.target.alt;
        modalImg.classList.remove("zoomed"); // Assurer un état de départ sans zoom
    });
});

const close = document.querySelector(".modal .close");
close.addEventListener("click", () => {
    modal.style.display = "none";
});

modalImg.addEventListener("click", () => {
    if (modalImg.classList.contains("zoomed")) {
        modalImg.classList.remove("zoomed"); // Sortir du zoom
    } else {
        modalImg.classList.add("zoomed"); // Appliquer le zoom
    }
});
