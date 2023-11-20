document.addEventListener('DOMContentLoaded', function () {

    let rocket = document.querySelector('.fusee');

    let containers = document.querySelectorAll('.dessin');

    // log the style left of rocket
    console.log(rocket.style.left);

    document.addEventListener('scroll', function () {

        let rocket_bottom = Math.floor(rocket.getBoundingClientRect().bottom);

        let container_top = Math.floor(containers[0].getBoundingClientRect().bottom);

        if (container_top < rocket_bottom) {
            /// rotate rocket 45 deg with scroll count
            let scroll_count = Math.floor(window.scrollY);
            rocket.style.transform = 'rotate(' + scroll_count + 'deg)';

        }

    });
});