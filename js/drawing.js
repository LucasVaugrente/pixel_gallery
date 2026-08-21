import {detectMobile} from "./utils.js";

const link_website = "https://lucasvaugrente.github.io/pixel_gallery/";

const container = document.querySelector('.container');

const isPhone = window.innerWidth < 580;

const burgerMenu = document.getElementById('desktop-burger-menu');
const sideMenu = document.getElementById('side-menu');

const jsonData = {};

fetch(link_website + 'data/drawings.json')
    .then(response => response.json())
    .then(data => {
        jsonData.drawings = data.drawings;
        for (let index = data.drawings.length - 1; index >= 0; index--) {

            const title = data.drawings[index].title;
            const resolution = data.drawings[index].resolution;
            let frames = data.drawings[index].frames !== undefined ? `<p>${data.drawings[index].frames} frames</p>` : "";
            const colors = data.drawings[index].colors;
            const software = data.drawings[index].software;
            const date = data.drawings[index].date;

            if (!isPhone) {
                const div = document.createElement('div');

                div.id = 'drawing' + (index + 1);
                div.classList.add(data.drawings[index].class);
                div.classList.add(data.drawings[index].type);
                div.classList.add(data.drawings[index].format);
                div.classList.add('drawing');
                div.style.backgroundImage = `url(${link_website + data.drawings[index].image})`;

                const classDrawing = data.drawings[index].class;

                div.innerHTML = `
                                <div class="infos">
                                    <p class="title_info">${title}</p>
                                    <p>${resolution}</p>
                                    <p>${colors} colors</p>
                                    ${frames}
                                    <p>Software : ${software}</p>
                                    <p>Release : ${date}</p>
                                    
                                    <button class="seeDrawingButton ${classDrawing}">Open</button>
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

                const infos = document.createElement('div');
                infos.classList.add('infos_mobile');
                infos.innerHTML = `
                                <p class="title_info_mobile">${title}</p>
                                <p>${resolution}</p>
                                <p>${software}</p>
                                <p>${colors} colors</p>
                                ${frames}
                                <p>${date}</p>
                            `;

                container.appendChild(img);
                container.appendChild(infos);
            }
        }
        const modal = document.getElementById("imageViewer");
        const modalImg = document.getElementById("fullImage");
        const infos_drawing = document.getElementById("infos_drawing");

        let scrollPosition = 0;

        const seeButtons = document.querySelectorAll(".seeDrawingButton");

        seeButtons.forEach((button) => {
            if (!detectMobile()) {
                button.addEventListener("click", () => {
                    modalImg.src = button.parentElement.parentElement.style.backgroundImage.split("url(")[1].split(")")[0].replace(/['"]/g, "").replace("../", "");
                    modal.classList.add("show");

                    console.log(document.documentElement)

                    document.documentElement.classList.add("no-scroll");

                    const classDrawing = button.classList[1];
                    const drawingData = jsonData.drawings.find(drawing => drawing.class === classDrawing);

                    const titleText = document.getElementById("title_drawing");

                    const title = drawingData.title;
                    const resolution = drawingData.resolution;
                    const software = drawingData.software;
                    let frames = drawingData.frames !== undefined ? `<p>${drawingData.frames} frames</p>` : "";
                    const colors = drawingData.colors;
                    const date = drawingData.date;
                    const content = drawingData.content;

                    titleText.innerHTML = `${title}`;

                    infos_drawing.innerHTML = `
                                <p>Resolution : ${resolution}</p>
                                <p>Software : ${software}</p>
                                <p>Colors : ${colors}</p>
                                ${frames}
                                <p>Release : ${date}</p>
                                <p class="content">${content}</p>
                            `;

                    scrollPosition = window.scrollY || document.documentElement.scrollTop;

                    burgerMenu.classList.add('hide');
                    burgerMenu.classList.remove('visible');
                    sideMenu.classList.remove('open');
                });
            }
        });

        const close = document.querySelector(".modal .close-modal");
        close.addEventListener("click", () => {
            modal.classList.remove("show");
            window.scrollTo(0, scrollPosition);
            burgerMenu.classList.remove('hide');
            burgerMenu.classList.add('visible');
            document.documentElement.classList.remove("no-scroll");

        });

        const openTab = document.querySelector(".modal .open-new-tab");
        openTab.addEventListener("click", () => {
            if (modalImg.src) {
                window.open(modalImg.src, '_blank');
            }
        });

        const help = document.querySelector(".help-modal");
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

        if (detectMobile()) {
            const infosDrawings = document.querySelectorAll('.infos');
            infosDrawings.forEach(function (infoDrawing) {
                infoDrawing.style.opacity = '1';
            }, "myThisArg");
        }
    })
    .catch(error => console.error(error));