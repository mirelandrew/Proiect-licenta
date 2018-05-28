
const curs1 = document.querySelector(".curs1");
const curs2 = document.querySelector(".curs2");
const iframeCurs = document.getElementsByTagName("iframe")[0];
const logOutButton = document.querySelector(".logout");
const timp = new Date();
const timpNou = timp.toLocaleString();
let startSesiune = new Date();
let diferentaTimp;


curs1.addEventListener("click", function () {
    iframeCurs.src="http://localhost:5500/ceas/ceas.html";
});

curs2.addEventListener("click", function () {
    iframeCurs.src="http://localhost:5500/calculator/index.html";
});

//functia care verifica starea logarii userului este invocata imediat

let loggedInUser = (function() {
          const displayPage = document.querySelector(".wrapper");
          const nume = document.querySelector("#nume-utilizator");
          const varsta = document.querySelector("#varsta-utilizator");
          const ore = document.querySelector("#timp-online-utilizator");
          const lastLogin = document.querySelector("#last-login-utilizator");
          const spinner = document.querySelector(".spinner");
          DBHelper.getUserDetails(nume,varsta,ore,lastLogin,displayPage,spinner);
})();
//INVOCA IMEDIAT FUNCTIA loggedInUser
loggedInUser;
//BUTON PENTRU LOGOUT ATASAT FUNCTIE logOutUser
logOutButton.addEventListener("click", logOut);

// FUNCTIA DE LOGOUT
function logOut() {
    let endSesiune = new Date();
    DBHelper.updateTime(diferentaTimp,endSesiune,startSesiune);
    setTimeout(() => {
        DBHelper.logoutUser();
    }, 1000);
    

}





  





