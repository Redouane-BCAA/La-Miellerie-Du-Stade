// ************** HEADER *******************
const burgerMenu = document.querySelector(".burger-menu");
const navbarList = document.querySelector(".navbar-list");

burgerMenu.addEventListener("click", () => {
    navbarList.classList.toggle("active");
    burgerMenu.classList.toggle("cross");
    burgerMenu.classList.toggle("active");
});

document.querySelectorAll(".navbar-list a").forEach(link => {
    link.addEventListener("click", () => {
        navbarList.classList.remove("active");
        burgerMenu.classList.remove("cross");
    });
});

// *******************SLIDER******************
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const pagination = document.querySelector('.pagination');

    let currentIndex = 0;
    let intervalId;

    function showSlide(index) {
        slides.style.transform = `translateX(${-index * 100}%)`;
        updatePagination(index);
    }

    function updatePagination(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % 3;
        showSlide(currentIndex);
    }

    function startAutoRotation() {
        intervalId = setInterval(nextSlide, 3000);
    }

    function stopAutoRotation() {
        clearInterval(intervalId);
    }

    // pagination dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            stopAutoRotation();
            currentIndex = i;
            showSlide(currentIndex);
            startAutoRotation();
        });
        pagination.appendChild(dot);
    }

    startAutoRotation();
});

//***********Create/display Products*************
async function fetchData() {
    const response = await fetch('assets/data/product.json');
    const data = await response.json();

    function createCard(item, container) {
        const card = document.createElement('div');
        card.className = 'card';

        const cardImage = document.createElement('img');
        cardImage.src = item.image;
        cardImage.alt = item.alt;
        card.appendChild(cardImage);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        card.appendChild(cardContent);

        const title = document.createElement('h2');
        title.innerHTML = `${item.titre} <span class="price">${item.prix}€</span>`;
        cardContent.appendChild(title);

        const description = document.createElement('p');
        description.textContent = item.description;
        cardContent.appendChild(description);

        container.appendChild(card);
    }

    data.products.forEach((product) => {
        const containerId = `${product.type}_container`;
        const productContainer = document.getElementById(containerId);

        product.items.forEach((item) => {
            createCard(item, productContainer);
        });
    });
}

fetchData().catch((error) =>
    console.error('Une erreur s\'est produite lors du chargement des données:', error)
);

