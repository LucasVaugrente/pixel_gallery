const footer = document.querySelector('footer');
const floor_gap = 215;

let scrollTimeout;
let ignoreScrollEvents = false;

export let settings = {
    slow: 1000,
    effect: linearTween,
};

/**
 *
 * @summary Return the scroll percentage
 * @returns {number} Scroll percentage
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
    let scrollPercent = scrollTop / (docHeight - winHeight);
    return scrollPercent * 100;
}

function slowScrollTo(positionTop) {
    ignoreScrollEvents = true;
    scrollTo(positionTop, settings.slow);
    setTimeout(() => ignoreScrollEvents = false, 100);
}

function slowScrollToBottom() {
    const floor = footer.offsetTop - floor_gap;
    ignoreScrollEvents = true;
    scrollTo(floor, settings.slow);
    setTimeout(() => ignoreScrollEvents = false, 100);
}

function slowScrollToTop() {
    const e = document.documentElement;
    let floor = e.scrollHeight - e.scrollTop - e.clientHeight === 0;
    if (floor) {
        ignoreScrollEvents = true;
        scrollTo(0, settings.slow);
        setTimeout(() => ignoreScrollEvents = false, 100);
    }
}

function scrollTo(element, duration) {
    let e = document.documentElement;
    if (e.scrollTop === 0) {
        let t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;
    scrollToX(element, from, to, 0, 1 / duration, 20, settings.effect);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }

    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    scrollTimeout = setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

function linearTween(t) {
    return t;
}

function easeInOutCuaic(t) {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
}

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export {
    getScrollPercentage,
    slowScrollTo,
    slowScrollToBottom,
    slowScrollToTop,
    scrollTo,
    scrollToC,
    scrollToX,
    linearTween,
    easeInOutCuaic,
    detectMobile
};