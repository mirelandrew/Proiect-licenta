

class DBHelper {
    static link(x) {
        window.location.replace(x);
    }
    
    // FUNCTIE PENTRU LOGIN
    static loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (e) {
                //DACA DATELE SUNT INTRODUSE CORECT ATUNCI REDIRECTIONAM USERUL CATRE PRIMA PAGINA
                setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 300);     
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                // DACA DATELE SUNT INCORECTE ATUNCI ESTE AFISATA EROAREA
                errorBox.innerHTML = `<p class="errorBox"> ${errorMessage} </p>`;
        });
    }

    // FUNCTIE PENTRU LOGOUT 

    static logoutUser() {
        firebase.auth().signOut().then(function() {
        
            // Sign-out successful.
            console.log("logout succes");
             setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 2000);
            
          }).catch(function(error) {
            // An error happened.
            console.log("logout error");
          });
    }

    // FUNCTIE PENTRU CREARE STUDENT 
    static registerUser(email, password, nume, gen, varsta, timpNou) {
        //CREAZA CONTUL
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                var user = firebase.auth().currentUser;
                //FOLOSIND PARAMETRUL UID ATASAT USERULUI PUTEM INCARCA DATE IN CONTUL RESPECTIV
                db.collection("users").doc(user.uid).set({
                    nume: nume,
                    gen: gen,
                    milisecunde: 0,
                    varsta: varsta,
                    lastLogin: timpNou
                    })
                    .then(function() {
                        //DUPA CE DATELE AU FOST INTRODUSE PUTEM REDIRECTIONA STUDENTUL CATRE PRIMA PAGINA
                        console.log("Document successfully written!");
                        DBHelper.link("http://localhost:5500/index.html");
                       // setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 3000);
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });    
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
                errorBox.innerHTML = `<p class="errorBox"> ${errorMessage} </p>`;
            });
    }
    
    //FUNCTIE PENTRU AFISARE DATE STUDENT
    static getUserDetails(nume, varsta, timp, lastLogin, displayPage,spinner) {
        //RETURNAM STAREA CURENTA DE LOGIN
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                //DACA USERUL ESTE LOGAT DOAR ATUNCI PUTEM AFISA PAGINA STUDY
                displayPage.style.display = "grid";
                console.log("there is a logged in user with email: " + user.email + " and the id of: " + user.uid );
                // Display user info
                db.collection("users").doc(user.uid).get()
                .then(function(doc) {
                    if (doc.exists) {
                        nume.innerHTML = doc.data().nume;
                        varsta.innerHTML = doc.data().varsta;
                        timp.innerHTML = DBHelper.parseMillisecondsIntoReadableTime( doc.data().milisecunde);
                        lastLogin.innerHTML = doc.data().lastLogin;
                        console.log("Document data:", doc.data());
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                })
                .catch(function(error) {
                     console.log("Error getting document:", error);
                 });
            } else {
                      console.log("no logged in user");
                        // User is signed out.
                        //DACA USERUL NU ESTE LOGAT ATUNCI NU AFISAM PAGINA SI II FACEM REDIRECT LA PRIMA PAGINA
                   displayPage.style.display = "none";
                   spinner.style.display = "flex"; 
                   setTimeout(function(){ DBHelper.link("http://localhost:5500/index.html"); }, 1500);
            }
        });
    }
    // FUNCTIE PENTRU ACTUALIZAREA TIMPULUI PETRECUT ONLINE DE STUDENT
    static updateTime(diferentaTimp, endSesiune, startSesiune) {
            var user = firebase.auth().currentUser;
            var docRef = db.collection("users").doc(user.uid);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    //returnam timpul din baza de date
                    diferentaTimp = doc.data().milisecunde;

                    //diferenta dintre inceputul sesiunii si sfarsitul acesteia
                    
                    let millisec = endSesiune.getTime() - startSesiune.getTime();
                    // valoarea timpului din baza de date este adunata cu durata dintre inceputul si sfarsitul sesiunii
                    diferentaTimp+=millisec;
                    console.log(DBHelper.parseMillisecondsIntoReadableTime(diferentaTimp));
                    // seteaza ultimul login si timpul total online
                                docRef.update({
                                    lastLogin: timpNou,
                                    milisecunde: diferentaTimp
                                })
                                .then(function() {
                                    console.log("Scris cu succes!!!!");
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                }}).catch(function(error) {
                    console.log("Error getting document:", error);
                    });
                //diferentaTimp += millisec;
    }

    // SCHIMBAM TEXTUL LINKULUI DIN PRIMA PAGINA DIN LOGIN IN CLASA MEA 
    static displayMyClass(className) {
        firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                // User is signed in.
                className.innerHTML = "Clasa mea";
                className.setAttribute("href", "/study.html");
    }
                else {
                    console.log("no logged in user");
                // User is signed out.
                // ...
                }
            });
}
    // CONVERTESTE TIMPUL
    static parseMillisecondsIntoReadableTime(milliseconds){
        //Get hours from milliseconds
        var hours = milliseconds / (1000*60*60);
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
      
        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
      
        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
      
      
        return h + ' : ' + m + ' : ' + s;
      }
    

}

