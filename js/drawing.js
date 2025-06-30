import { detectMobile } from "./utils.js";

const link_website = "https://lucasvaugrente.github.io/pixel_gallery/";

const container = document.querySelector('.container');

const jsonData = {};

fetch(link_website + 'data/drawings.json')
    .then(response => response.json())
    .then(data => {
        jsonData.drawings = data.drawings;
        for (let index = data.drawings.length - 1; index >= 0; index--) {

            const div = document.createElement('div');

            div.id = 'drawing' + (index + 1);
            div.classList.add(data.drawings[index].class);
            div.classList.add(data.drawings[index].type);
            div.classList.add(data.drawings[index].format);
            div.classList.add('drawing');
            div.style.backgroundImage = `url(${link_website + data.drawings[index].image})`;

            const title = data.drawings[index].title;
            const resolution = data.drawings[index].resolution;
            let frames = data.drawings[index].frames !== undefined ? `${data.drawings[index].frames} frames` : "";

            div.innerHTML = `
                                <span>${title}</span>
                                <div class="infos">
                                    <p>${resolution}</p>
                                    <p>${frames}</p>
                                </div>
                            `;

            container.appendChild(div);
        }
        const modal = document.getElementById("imageViewer");
        const modalImg = document.getElementById("fullImage");
        const captionText = document.getElementById("caption");

        const figures = document.querySelectorAll(".container > div");

        figures.forEach((img) => {
            img.addEventListener("click", (e) => {
                const imagePath = img.style.backgroundImage.split("url(")[1].split(")")[0].replace(/['"]/g, "").replace("../", "");
                modalImg.src = imagePath;

                modal.classList.add("show");

                const classDrawing = img.classList[0];
                const drawingData = jsonData.drawings.find(drawing => drawing.class === classDrawing);

                const title = drawingData.title;
                const resolution = drawingData.resolution;
                const software = drawingData.software;
                let frames = drawingData.frames !== undefined ? `<p>${drawingData.frames} frames</p>` : "";

                captionText.innerHTML = `
                                <h3>Title : ${title}</h3>
                                <p>Resolution : ${resolution}</p>
                                <p>Software : ${software}</p>
                                ${frames}
                            `;
                document.body.classList.add('no-scroll');
            });
        });

        const close = document.querySelector(".modal .close");
        close.addEventListener("click", () => {
            modal.classList.remove("show");
            document.body.classList.remove('no-scroll');
        });

        // add zoom effect on the image when the user clique dessus
        modalImg.addEventListener("click", () => {
            modalImg.classList.toggle("zoomed");
            modalImg.style.transform = modalImg.classList.contains("zoomed") ? "scale(2)" : "scale(1)";
        });

        // Suivi du mouvement de souris pour le zoom dynamique
        modalImg.addEventListener("mousemove", (e) => {
            if (!modalImg.classList.contains("zoomed")) return;

            const rect = modalImg.getBoundingClientRect();

            // Position relative du curseur dans l'image
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            // Pourcentage par rapport à la taille de l'image
            const percentX = (offsetX / rect.width) * 100;
            const percentY = (offsetY / rect.height) * 100;

            // Appliquer comme origine de transformation
            modalImg.style.transformOrigin = `${percentX}% ${percentY}%`;
        });

        let zoomScale = 2; // valeur initiale (doit correspondre à celle dans .zoomed)
        const minScale = 1;
        const maxScale = 5;
        const zoomStep = 0.1;

        modalImg.addEventListener("wheel", (e) => {
            if (!modalImg.classList.contains("zoomed")) return;

            e.preventDefault(); // empêche le scroll de la page

            // deltaY > 0 = scroll vers le bas → dézoome
            if (e.deltaY > 0) {
                zoomScale = Math.max(minScale, zoomScale - zoomStep);
            } else {
                zoomScale = Math.min(maxScale, zoomScale + zoomStep);
            }

            modalImg.style.transform = `scale(${zoomScale})`;
        });


        // reset zoom et transform-origin si on ferme la modal
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
            console.log(infosDrawings);

            infosDrawings.forEach(function (infoDrawing) {
                infoDrawing.style.opacity = '1';
            }, "myThisArg");
        }
    })
    .catch(error => console.error(error));

const filtersSelectReponsive = document.getElementById('filtersSelectReponsive');
const filters = document.querySelector('.filters');

filtersSelectReponsive.addEventListener('click', () => {
    filters.classList.toggle('show');
    filtersSelectReponsive.classList.toggle('open');

    if (filters.classList.contains('show')) {
        filtersSelectReponsive.textContent = 'Filters ▲';
    } else {
        filtersSelectReponsive.textContent = 'Filters ▼';
    }
});