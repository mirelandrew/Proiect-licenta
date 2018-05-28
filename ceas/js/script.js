    "use strict";
    const indicatorSecunda = document.querySelector(".secunda");
    const indicatorMinut = document.querySelector(".minut");
    const indicatorOra = document.querySelector(".ora");
    const indicatorSaptamana = document.querySelector(".ziua");
    const meridian = document.querySelector(".meridian");
    const data = document.querySelector(".data");
    function timpFunctie() {

    const timp = new Date();
    const secunda = timp.getSeconds();
    const minut = timp.getMinutes();
    const ora = timp.getHours();
    const saptamana = timp.getDay();
    const luna = timp.getMonth();
    const an = timp.getFullYear();
    const ziua = timp.getDate();
    
    const saptamanaArr =  ["Duminică","Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"];
     indicatorOra.innerHTML = `${conversie(ora)}`;
     indicatorMinut.innerHTML = `${conversie(minut)}`;
     indicatorSecunda.innerHTML = `${conversie(secunda)}`;
     indicatorSaptamana.innerHTML = saptamanaArr[saptamana];
     meridian.innerHTML = meridianTest(ora);
     data.innerHTML = `${ziua}-${luna+1}-${an}`;
     
    }

    function meridianTest (test) {
        if (test > 12) {
            test = "PM";
        }
        else {
            test = "AM";
        }
        return test;
    }

    function conversie (test) {
        if(test < 10) {
            test = "0" + test;
        }
        return test;
    }

    setInterval(timpFunctie, 1000);