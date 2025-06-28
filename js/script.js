import { generateStars, updateStars } from "./stars.js";
import { detectMobile } from "./utils.js";

generateStars();
// updateStars();

if (detectMobile()) {
    const titlesDrawing = document.querySelectorAll('.drawing h3');
    titlesDrawing.forEach(function (titleDrawing) {
        titleDrawing.style.opacity = '1';
    }, "myThisArg");
}