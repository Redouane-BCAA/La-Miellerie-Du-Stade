// HEADER max 1040screen
const burgerMenu = document.querySelector(".burger-menu");
const navbarList = document.querySelector(".navbar-list");

burgerMenu.addEventListener("click", () => {
    navbarList.classList.toggle("active");
});

document.querySelectorAll(".navbar-list a").forEach(link => {
    link.addEventListener("click", () => {
        navbarList.classList.remove("active");
    });
});