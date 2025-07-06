import { generateStars, updateStars } from "./stars.js";

generateStars();
// updateStars();

window.addEventListener("load", () => {

    const imageUrls = [
        "img/rocket/rocket_animation_small.png",
        "img/rocket/rocket_animation.png",
        "img/rocket/rocket.png",
        "img/icon.png",
        "img/footer_left.png",
        "img/footer.gif",
        "img/github_logo.png",
        "img/close.png",
        "img/projects/accident.png",
        "img/projects/alone.png",
        "img/projects/bike_ride.png",
        "img/projects/bottle.gif",
        "img/projects/cat.png",
        "img/projects/door.png",
        "img/projects/echoes_of_stillness.png",
        "img/projects/flow.png",
        "img/projects/get_lucky.png",
        "img/projects/hope.gif",
        "img/projects/jet_fuel.png",
        "img/projects/lalaland.png",
        "img/projects/little_nightmare.png",
        "img/projects/mont_saint_michel.png",
        "img/projects/mood_ghibli.png",
        "img/projects/outer_wilds_system.png",
        "img/projects/purple_blackhole.png",
        "img/projects/red_cosmos.png",
        "img/projects/ride.png",
        "img/projects/some_clouds.png",
        "img/projects/spirited_away.png",
        "img/projects/stan_portal.png",
        "img/projects/sunrise.gif",
        "img/projects/unknown_dream.png",
        "img/projects/weekend.png",
        "img/projects/where.gif",
        "img/projects/whispers_of_the_smoke.gif",
        "img/projects/working.png",
        "img/projects/mariogalaxy.png",
    ];


    let loadedCount = 0;

    const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
            document.getElementById("loader").style.display = "none";
        }
    };

    imageUrls.forEach((url) => {
        const img = new Image();
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
        img.src = url;
    });
});
