document.addEventListener('DOMContentLoaded', function () {
    let rocket = document.querySelector('.svg_fusee');
    let containers = document.querySelectorAll('.dessin');

    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);


    document.addEventListener('scroll', function () {

        let containers_tab = [];

        containers.forEach(element => {
            containers_tab.push([element.classList, element.getBoundingClientRect().top]);
        });

        console.log(containers_tab);

        let rocket_rect = rocket.getBoundingClientRect();

        let rocket_bottom = rocket_rect.top + rocket_rect.height;

        for (let index = 0; index < containers_tab.length; index++) {

            if (rocket_bottom > containers_tab[index][1] && containers_tab[index + 1] !== undefined) {

                if (rocket_bottom < containers_tab[index + 1][1]) {

                    if (containers_tab[index][0].contains("droite")) {
                        rocket.classList.add('rocket_left');
                    }

                    if (containers_tab[index][0].contains("gauche")) {
                        rocket.classList.remove('rocket_left');
                    }
                }
            } else {
                if(rocket_bottom > containers_tab[4][1]) {
                    if (containers_tab[index][0].contains("droite")) {
                        rocket.classList.add('rocket_left');
                    }

                    if (containers_tab[index][0].contains("gauche")) {
                        rocket.classList.remove('rocket_left');
                    }
                }
            }
        }
    });
});

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
