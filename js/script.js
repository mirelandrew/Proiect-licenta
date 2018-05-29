
// implementare navbar slide
const openButton = document.querySelector(".open-slide");
const closeButton = document.querySelector(".btn-close");
const sideMenu = document.querySelector("#side-menu");
const mainDiv = document.querySelector("#main");


openButton.addEventListener("click", openSideMenu);
closeButton.addEventListener("click", closeSideMenu);

function openSideMenu() {
    sideMenu.style.width = '250px';
    mainDiv.style.marginLeft = '250px';
}

function closeSideMenu() {
    sideMenu.style.width = '0px';
    mainDiv.style.marginLeft = '0px';
}


function displayClass() {
const clasaMea = document.querySelector(".sign-class");
const numeNavbar = document.querySelector("#nume");
DBHelper.displayMyClass(clasaMea);
}

displayClass();