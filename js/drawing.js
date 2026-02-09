import { detectMobile } from "./utils.js";

const link_website = "https://lucasvaugrente.github.io/pixel_gallery/";

const container = document.querySelector('.container');

const isPhone = window.innerWidth < 580;

const filtersSelectReponsive = document.getElementById('filtersSelectReponsive');
const filters = document.querySelector('.filters');
const container_button_filters_resp = document.querySelector('.container_button_filters_resp');

const jsonData = {};

fetch(link_website + 'data/drawings.json')
    .then(response => response.json())
    .then(data => {
        jsonData.drawings = data.drawings;
        for (let index = data.drawings.length - 1; index >= 0; index--) {

            if (!isPhone) {
                const div = document.createElement('div');

                div.id = 'drawing' + (index + 1);
                div.classList.add(data.drawings[index].class);
                div.classList.add(data.drawings[index].type);
                div.classList.add(data.drawings[index].format);
                div.classList.add('drawing');
                div.style.backgroundImage = `url(${link_website + data.drawings[index].image})`;

                const title = data.drawings[index].title;
                const resolution = data.drawings[index].resolution;
                let frames = data.drawings[index].frames !== undefined ? `<p>${data.drawings[index].frames} frames</p>` : "";
                const colors = data.drawings[index].colors;
                const software = data.drawings[index].software;

                const classDrawing = data.drawings[index].class;

                div.innerHTML = `
                                <div class="infos">
                                    <p class="title_info">${title}</p>
                                    <p>${resolution}</p>
                                    <p>${colors} colors</p>
                                    ${frames}
                                    <p>Software : ${software}</p>
                                    
                                    <button class="seeDrawingButton ${classDrawing}">See</button>
                                </div>
                            `;
                container.appendChild(div);
            } else {
                const img = document.createElement('img');

                img.classList.add('mobile-drawing');
                img.classList.add(data.drawings[index].class);
                img.classList.add(data.drawings[index].type);
                img.classList.add(data.drawings[index].format);
                img.src = link_website + data.drawings[index].image;

                const title = data.drawings[index].title;
                const resolution = data.drawings[index].resolution;
                let frames = data.drawings[index].frames !== undefined ? `<p>${data.drawings[index].frames} frames</p>` : "";
                const colors = data.drawings[index].colors;
                const software = data.drawings[index].software;

                const infos = document.createElement('div');
                infos.classList.add('infos_mobile');
                infos.innerHTML = `
                                <p class="title_info_mobile">${title}</p>
                                <p>${resolution}</p>
                                <p>${colors} colors</p>
                                ${frames}
                                <p>${software}</p>
                            `;

                container.appendChild(img);
                container.appendChild(infos);
            }
        }
        const modal = document.getElementById("imageViewer");
        const modalImg = document.getElementById("fullImage");
        const infos_drawing = document.getElementById("infos_drawing");

        const seeButtons = document.querySelectorAll(".seeDrawingButton");

        seeButtons.forEach((button) => {
            if (!detectMobile()) {
                button.addEventListener("click", () => {
                    modalImg.src = button.parentElement.parentElement.style.backgroundImage.split("url(")[1].split(")")[0].replace(/['"]/g, "").replace("../", "");
                    modal.classList.add("show");

                    const classDrawing = button.classList[1];
                    const drawingData = jsonData.drawings.find(drawing => drawing.class === classDrawing);

                    const titleText = document.getElementById("title_drawing");

                    const title = drawingData.title;
                    const resolution = drawingData.resolution;
                    const software = drawingData.software;
                    let frames = drawingData.frames !== undefined ? `<p>${drawingData.frames} frames</p>` : "";
                    const colors = drawingData.colors;

                    titleText.innerHTML = `${title}.png`;

                    infos_drawing.innerHTML = `
                                <p>Resolution : ${resolution}</p>
                                <p>Software : ${software}</p>
                                <p>Colors : ${colors}</p>
                                ${frames}
                            `;

                    filters.classList.add('modalDisplayed');
                });
            }
        });

        const close = document.querySelector(".modal .close");
        close.addEventListener("click", () => {
            modal.classList.remove("show");
            filters.classList.remove('modalDisplayed');
        });

        const openTab = document.querySelector(".modal .open_tab");
        openTab.addEventListener("click", () => {
            if (modalImg.src) {
                window.open(modalImg.src, '_blank');
            }
        });

        const help = document.querySelector(".help");
        const help_modal = document.getElementById("help_modal");
        help.addEventListener("click", () => {
            help_modal.classList.add("show");
        });

        const close_help = document.querySelector(".close_help");
        close_help.addEventListener("click", () => {
            help_modal.classList.remove("show");
        });

        modalImg.addEventListener("click", () => {
            modalImg.classList.toggle("zoomed");
            modalImg.style.transform = modalImg.classList.contains("zoomed") ? "scale(2)" : "scale(1)";
        });

        modalImg.addEventListener("mousemove", (e) => {
            if (!modalImg.classList.contains("zoomed")) return;

            const rect = modalImg.getBoundingClientRect();

            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const percentX = (offsetX / rect.width) * 100;
            const percentY = (offsetY / rect.height) * 100;

            modalImg.style.transformOrigin = `${percentX}% ${percentY}%`;
        });

        let zoomScale = 2;
        const minScale = 1;
        const maxScale = 5;
        const zoomStep = 0.1;

        modalImg.addEventListener("wheel", (e) => {
            if (!modalImg.classList.contains("zoomed")) return;

            e.preventDefault();

            if (e.deltaY > 0) {
                zoomScale = Math.max(minScale, zoomScale - zoomStep);
            } else {
                zoomScale = Math.min(maxScale, zoomScale + zoomStep);
            }

            modalImg.style.transform = `scale(${zoomScale})`;
        });

        close.addEventListener("click", () => {
            modalImg.classList.remove("zoomed");
            modalImg.style.transformOrigin = "center center";
        });

        const filterButtons = document.querySelectorAll('.filter-button');
        const drawings = document.querySelectorAll('.drawing');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                if (filter === 'all') {
                    filterButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    drawings.forEach(drawing => drawing.style.display = 'block');
                    return;
                }

                button.classList.toggle('selected');

                document.querySelector('[data-filter="all"]').classList.remove('selected');

                const activeGroups = {};
                const activeFilters = [];

                filterButtons.forEach(btn => {
                    if (btn.classList.contains('selected')) {
                        const g = btn.getAttribute('data-group');
                        const f = btn.getAttribute('data-filter');
                        if (!activeGroups[g]) activeGroups[g] = [];
                        activeGroups[g].push(f);
                        activeFilters.push(f)
                    }
                });

                if (activeFilters.length === 5 || Object.keys(activeGroups).length === 0) {
                    document.querySelector('[data-filter="all"]').classList.add('selected');
                    filterButtons.forEach(btn => {
                        if (btn !== document.querySelector('[data-filter="all"]')) {
                            btn.classList.remove('selected');
                        }
                    });
                    drawings.forEach(drawing => drawing.style.display = 'block');
                    return;
                }

                drawings.forEach(drawing => {
                    let visible = true;
                    for (const group in activeGroups) {
                        const filters = activeGroups[group];
                        const hasOne = filters.some(f => drawing.classList.contains(f));
                        if (!hasOne) {
                            visible = false;
                            break;
                        }
                    }
                    drawing.style.display = visible ? 'block' : 'none';
                });
            });
        });


        if (detectMobile()) {
            const infosDrawings = document.querySelectorAll('.infos');
            infosDrawings.forEach(function (infoDrawing) {
                infoDrawing.style.opacity = '1';
            }, "myThisArg");
        }
    })
    .catch(error => console.error(error));



filtersSelectReponsive.addEventListener('click', () => {
    filters.classList.toggle('show');
    filtersSelectReponsive.classList.toggle('open');

    if (filters.classList.contains('show')) {
        filtersSelectReponsive.textContent = 'Filters ▲';
    } else {
        filtersSelectReponsive.textContent = 'Filters ▼';
    }
});

let mobileSentinel = null;
let desktopSentinel = null;

function createSentinelBefore(targetEl, className) {
    const s = document.createElement('div');
    s.className = className;
    s.style.position = 'relative';
    s.style.width = '100%';
    s.style.height = '1px';
    s.style.pointerEvents = 'none';
    targetEl.parentNode.insertBefore(s, targetEl);
    return s;
}

if (window.innerWidth < 940) {
    mobileSentinel = createSentinelBefore(container_button_filters_resp, 'sticky-sentinel-mobile');

    const ioMobile = new IntersectionObserver(
        (entries) => {
            const e = entries[0];
            const stuck = e.intersectionRatio === 0;
            container_button_filters_resp.classList.toggle('ontop', stuck);
        },
        {
            root: null,
            threshold: [0, 1],
        }
    );

    ioMobile.observe(mobileSentinel);
} else {
    desktopSentinel = createSentinelBefore(filters, 'sticky-sentinel-desktop');

    const ioDesktop = new IntersectionObserver(
        (entries) => {
            const e = entries[0];
            const stuck = e.intersectionRatio === 0;
            filters.classList.toggle('ontop', stuck);
        },
        { root: null, threshold: [0, 1] }
    );

    ioDesktop.observe(desktopSentinel);
}