let scroll_count = 0;

document.addEventListener("scroll", function () {
    const scrollPercentage = getScrollPercentage();
    const rocket = document.querySelector('.svg_fusee');

    const maxLeft = window.innerWidth - rocket.offsetWidth - 30;
    const maxTop = window.innerHeight - rocket.offsetHeight - 30;

    const newLeft = (scrollPercentage / 100) * maxLeft;
    const newTop = (scrollPercentage / 100) * maxTop;

    if (scrollPercentage > scroll_count) {
        console.log("-- BAS --");

        if (scrollPercentage < 2) {
            rocket.classList.add("fusee_depart");
        }
    
        if (scrollPercentage > 94) {
            rocket.classList.add("fusee_arrivee");
        } 

        if(scrollPercentage > 2 && scrollPercentage < 94) {
            console.log("anim bas");
            rocket.classList.add("rotate_bottom");
            rocket.classList.remove("rotate_top");
        }

    } else {

        console.log("-- HAUT --");
        if (scrollPercentage < 2) {
            rocket.classList.add("fusee_depart");
        }

        if (scrollPercentage > 94) {
            rocket.classList.add("fusee_arrivee");
        }
        
        if(scrollPercentage > 2 && scrollPercentage < 94) {
            console.log("anim haut");
            rocket.classList.add("rotate_top");
            rocket.classList.remove("rotate_bottom");
        }
    }

    rocket.style.left = newLeft + 'px';
    rocket.style.top = newTop + 'px';

    scroll_count = scrollPercentage;
});

function goLeft(scrollPercentage) {
    const rocket = document.querySelector('.svg_fusee');
    const maxLeft = window.innerWidth - rocket.offsetWidth;
    const newLeft = (scrollPercentage / 100) * maxLeft;
    rocket.style.left = newLeft + 'px';
}

function goRight(scrollPercentage) {
    const rocket = document.querySelector('.svg_fusee');
    const maxLeft = window.innerWidth - rocket.offsetWidth;
    const newLeft = (scrollPercentage / 100) * maxLeft;
    rocket.style.left = newLeft + 'px';
}

/**
 * 
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
