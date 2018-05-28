//CACHE DOM 
//CACHE ELEMENTS
const inputs = document.querySelector(".inputs");
const loginButton = document.querySelector("#login");
const registerButton = document.querySelector("#register");
const errorBox = document.querySelector(".errorMsg");
const showRegisterForm = document.querySelector("#show-register-form");
const timp = new Date();
const timpNou = timp.toLocaleString();

//La apasarea butonului apelam functia login
loginButton.addEventListener("click", login);

//La apasarea butonului apelam functia displayRegisterForm
showRegisterForm.addEventListener("click", displayRegisterForm);


// La apasarea butonului apelam functia register
registerButton.addEventListener("click", register);



// FUNCTIA ATASATA BUTONULUI loginButton
function login() {
    //CACHE LOGIN DOM
    const loginPassword = document.querySelector("#login-password").value;
    const loginEmail = document.querySelector("#login-email").value;
    //APELAM FUNCTIA DIN CONTROLLER PENTRU LOGAREA USERULUI
    DBHelper.loginUser(loginEmail, loginPassword);
}


// FUNCTIA ATASATA BUTONULUI registerButton
function register() {
    // CACHE Register DOM
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;
    const passwordConfirm = document.querySelector("#register-password-confirm").value;
    const nume = document.querySelector("#nume").value;
    const varsta = document.querySelector("#varsta").value;
    const gen = document.querySelector("#gen").value;

    if(password == passwordConfirm){
        //DACA PAROLELE SUNT IDENTICE ATUNCI APELAM FUNCTIA registerStudent din clasa User
        DBHelper.registerUser(email, password, nume, gen, varsta, timpNou);
        //DBHelper.registerUser(email, password);
    }
    else {
        //DACA NU, SE AFISEAZA EROAREA
        errorBox.innerHTML = `<p class="errorBox"> Passwords don't match! </p>`;
    }
}

function displayRegisterForm() {
        console.log("clicked");

        //CACHE displayRegisterForm DOM
        
        const registerSection = document.querySelector(".register-section");
        const loginSection = document.querySelector(".login-section");
        const registerPara = document.querySelector(".register-para");

        //STILURILE APLICATE PENTRU A SE AFISA registerForm
        registerSection.style.display = "block";
        loginSection.style.display = "none";
        showRegisterForm.style.display = "none";
        registerPara.innerHTML = "înregistrează-mă acum";
}

