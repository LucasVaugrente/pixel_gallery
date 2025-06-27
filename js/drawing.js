const link_website = "http://127.0.0.1:5500/";

const container = document.querySelector('.container');

fetch(link_website + 'data/drawings.json')
    .then(response => response.json())
    .then(data => {
        for (let index = data.drawings.length - 1; index >= 0; index--) {

            const div = document.createElement('div');

            div.id = 'drawing' + (index + 1);
            div.classList.add(data.drawings[index].class);
            div.classList.add('drawing');
            div.style.backgroundImage = `url(${link_website + data.drawings[index].image})`;
            div.innerHTML = `<span>${data.drawings[index].title}</span><p>${data.drawings[index].resolution}</p>`;

            container.appendChild(div);

            const modal = document.getElementById("imageViewer");
            const modalImg = document.getElementById("fullImage");
            const captionText = document.getElementById("caption");

            const figures = document.querySelectorAll(".container div");

            figures.forEach((img) => {
                img.addEventListener("click", (e) => {
                    const imagePath = window.getComputedStyle(e.target).background.split("url(")[1].split(")")[0].replace(/['"]/g, "").replace("../", "");
                    modal.classList.add("show");
                    modalImg.src = imagePath;
                    captionText.innerText = e.target.innerText;
                    document.body.classList.add('no-scroll');
                });
            });

            const close = document.querySelector(".modal .close");
            close.addEventListener("click", () => {
                modal.classList.remove("show");
                document.body.classList.remove('no-scroll');
            });

            modalImg.addEventListener("click", () => {
                if (modalImg.classList.contains("zoomed")) {
                    modalImg.classList.remove("zoomed");
                } else {
                    modalImg.classList.add("zoomed");
                }
            });
        }

    })
    .catch(error => console.error(error));

