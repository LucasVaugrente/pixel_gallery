const body = document.querySelector('body');

const starsNumber = 70;
let scroll_count = 0;
const lineHeader = 10;
const lineFooter = 90;

// Stars generation (random positions)
for (let i = 0; i < starsNumber; i++) {
    const star = document.createElement('div');
    star.classList.add('mini-star');
    star.style.left = Math.random() * 98 + 'vw';
    star.style.top = Math.random() * document.documentElement.scrollHeight + 'px';

    const widthANDheight = Math.random() * 5 + 1;
    star.style.width = widthANDheight + 'px';
    star.style.height = widthANDheight + 'px';

    body.appendChild(star);
}

let stars = document.querySelectorAll('.mini-star');
for (let index = 0; index < 20; index++) {
    let star = stars[Math.floor(Math.random() * stars.length)];
    star.style.animation = "twinkle 3s ease-in-out infinite";
}