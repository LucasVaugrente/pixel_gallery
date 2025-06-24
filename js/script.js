import {generateStars, updateStars} from "./stars.js";
import {detectMobile} from "./utils.js";

generateStars();
updateStars();

if (detectMobile()) {
    const titlesDrawing = document.querySelectorAll('.drawing h3');
    titlesDrawing.forEach(function (titleDrawing) {
        titleDrawing.style.opacity = '1';
    }, "myThisArg");
}

const modal = document.getElementById("imageViewer");
const modalImg = document.getElementById("fullImage");
const captionText = document.getElementById("caption");

const figures = document.querySelectorAll(".container div");

figures.forEach((img) => {
    img.addEventListener("click", (e) => {
        const imagePath = window.getComputedStyle(e.target).background.split("url(")[1].split(")")[0].replace(/['"]/g, "").replace("../", "");        
        modal.style.display = "block";
        modalImg.src = imagePath;
        captionText.innerText = e.target.innerText;
        modalImg.classList.remove("zoomed");
    });
});

const close = document.querySelector(".modal .close");
close.addEventListener("click", () => {
    modal.style.display = "none";
});

modalImg.addEventListener("click", () => {
    if (modalImg.classList.contains("zoomed")) {
        modalImg.classList.remove("zoomed");
    } else {
        modalImg.classList.add("zoomed");
    }
});
