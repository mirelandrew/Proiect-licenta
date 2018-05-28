// ADD SERVICE WORKER
/*
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function(reg) {
            console.log("serv worker registered", reg);
        })
        .catch(function(err) {
            console.log("error ", err);
        })
    });
  }
*/
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