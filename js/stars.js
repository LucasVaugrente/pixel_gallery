(() => {
    const c = document.getElementById('starfield');
    const ctx = c.getContext('2d', { alpha: true });

    const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];


    const DENSITY = 0.0005;
    const SIZE_MIN = 1, SIZE_MAX = 3;
    const TWINKLE = 0.8;

    const sizeStars = Math.random() * (3 - 1) + 1;

    const PARALLAX = 0.15;
    const LERP = 0.12;

    let stars = [], W = 0, H = 0, DPR = 1;

    let scrollTargetY = 0;
    let scrollSmoothedY = 0;

    function resetSize() {
        W = window.innerWidth;
        H = window.innerHeight;

        DPR = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
        c.width = Math.round(W * DPR);
        c.height = Math.round(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const n = Math.round(W * H * DENSITY);
        stars = Array.from({ length: n }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            s: Math.floor(Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN),
            p: Math.random() * Math.PI * 2,
            a: 0.6 + Math.random() * 0.4
        }));
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function draw(t) {
        scrollSmoothedY = lerp(scrollSmoothedY, scrollTargetY, LERP);

        let yOff = -scrollSmoothedY * PARALLAX;
        yOff = ((yOff % H) + H) % H;

        ctx.clearRect(0, 0, W, H);

        for (const st of stars) {
            const tw = (Math.cos(st.p + t * 0.001 * TWINKLE) + 1) / 2;
            const alpha = Math.min(1, Math.max(0.2, 0.4 * tw + 0.6 * st.a));
            ctx.globalAlpha = alpha;
            ctx.fillStyle = colors[st.s % colors.length];

            let y = st.y + yOff;
            if (y >= H) y -= H;
            if (y < 0) y += H;

            ctx.fillRect((st.x | 0), (y | 0), sizeStars, sizeStars);

            if (y < sizeStars) ctx.fillRect((st.x | 0), ((y + H) | 0), sizeStars, sizeStars);
            else if (y > H - sizeStars) ctx.fillRect((st.x | 0), ((y - H) | 0), sizeStars, sizeStars);
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    window.addEventListener('scroll', () => {
        scrollTargetY = window.scrollY || window.pageYOffset || 0;
    }, { passive: true });

    resetSize();
    window.addEventListener('resize', resetSize, { passive: true });
    requestAnimationFrame(draw);
})();