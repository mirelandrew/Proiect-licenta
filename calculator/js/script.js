const display = document.querySelector(".calc-display");
const buton = document.querySelectorAll(".btn");
const del = document.querySelector(".del");
del.addEventListener("click", function() {
    display.innerHTML = "";
});
buton.forEach(x => x.addEventListener("click", function () {
    let valoare = this.getAttribute("value");
    display.innerHTML+=valoare;
         if (this.getAttribute("class") == "btn egal"){
            let rezultat = eval(display.textContent);
            if( rezultat.toString().length > 10 ) {
               let rezultatNou = parseFloat(rezultat).toFixed(8);
               display.innerHTML = rezultatNou;
            } else {
            display.innerHTML = rezultat;
            }
         }
    })
);