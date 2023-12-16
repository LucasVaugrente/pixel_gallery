let scroll_count = 0;

const rocket = document.querySelector('.svg_fusee');

const maxLeft = window.innerWidth - rocket.offsetWidth - 30;
const maxTop = window.innerHeight - rocket.offsetHeight - 30;

document.addEventListener("scroll", function () {

    const scrollPercentage = getScrollPercentage();

    const newLeft = (scrollPercentage / 100) * maxLeft;
    const newTop = (scrollPercentage / 100) * maxTop;

    // Vérification du sens du scroll
    if (scrollPercentage > scroll_count) {
        if (scrollPercentage < 2) {
            rocket.style.transform = "rotate(0deg)";
        }
    
        if (scrollPercentage > 94) {
            rocket.style.transform = "rotate(0deg)";
        } 

        if(scrollPercentage > 2 && scrollPercentage < 94) {
            rocket.style.transform = "rotate(135deg)";
        }
    } 
    else {
        if (scrollPercentage < 2) {
            rocket.style.transform = "rotate(0deg)";
        }

        if (scrollPercentage > 94) {
            rocket.style.transform = "rotate(0deg)";
        }
        
        if(scrollPercentage > 2 && scrollPercentage < 94) {
            rocket.style.transform = "rotate(-45deg)";
        }
    }

    rocket.style.left = newLeft + 'px';
    rocket.style.top = newTop + 'px';

    scroll_count = scrollPercentage;
});

const containers = document.querySelectorAll('.dessin');

containers.forEach(dessin => {
    const fermer = document.querySelector(".fermer");
    const image = document.querySelector(".image_projet");
    let isActive = false;

    dessin.addEventListener("click", function (event) {
        // if (event.target !== fermer) {
            // if (!isActive) {
                console.log(image);
                image.classList.add("active");
                fermer.classList.add("active");
                isActive = true;
            // }
        // }
    });

    fermer.addEventListener("click", function (event) {
        event.stopPropagation();
        image.classList.toggle("active");
        fermer.classList.toggle("active");
        isActive = false;
    });
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
 * @summary Met à jour les frames de la fusée lorsqu'on scroll
 * 
 */ 
function updateFrames() {}