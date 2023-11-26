let scroll_count = 0;

document.addEventListener("scroll", function () {
    const scrollPercentage = getScrollPercentage();
    const rocket = document.querySelector('.svg_fusee');

    const maxLeft = window.innerWidth - rocket.offsetWidth - 30;
    const maxTop = window.innerHeight - rocket.offsetHeight - 30;

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
    } else {
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