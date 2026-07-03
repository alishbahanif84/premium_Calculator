// =============================
// Elements
// =============================

const display = document.getElementById("result");

const buttons = document.querySelectorAll(".buttons button");

const historyList = document.getElementById("history-list");

const clearHistory = document.getElementById("clear-history");

const themeBtn = document.getElementById("theme-btn");


// =============================
// Calculator
// =============================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch (value) {

            case "C":
                display.value = "";
                break;

            case "⌫":
                display.value = display.value.slice(0, -1);
                break;

            case "=":

                calculate();

                break;

            default:

                display.value += value;

        }

    });

});


// =============================
// Calculate Function
// =============================

function calculate() {

    if (display.value === "") return;

    try {

        let expression = display.value.replace(/%/g, "/100");

        let answer = eval(expression);

        if (!isFinite(answer)) {

            display.value = "Error";

            return;

        }

        addHistory(display.value, answer);

        display.value = answer;

    }

    catch {

        display.value = "Error";

    }

}


// =============================
// History
// =============================

function addHistory(exp, ans) {

    const li = document.createElement("li");

    li.innerHTML = `${exp} = <strong>${ans}</strong>`;

    historyList.prepend(li);

}


clearHistory.addEventListener("click", () => {

    historyList.innerHTML = "";

});


// =============================
// Keyboard Support
// =============================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (
        "0123456789+-*/.%".includes(key)
    ) {

        display.value += key;

    }

    else if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        display.value = display.value.slice(0, -1);

    }

    else if (key === "Delete" || key === "Escape") {

        display.value = "";

    }

});


// =============================
// Theme Toggle
// =============================

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    else {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


// =============================
// Button Click Animation
// =============================

buttons.forEach(btn => {

    btn.addEventListener("mousedown", () => {

        btn.style.transform = "scale(.90)";

    });

    btn.addEventListener("mouseup", () => {

        btn.style.transform = "scale(1)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });

});


// =============================
// Prevent Multiple Operators
// =============================

const operators = ["+", "-", "*", "/", "."];

document.addEventListener("keydown", (e) => {

    const last = display.value.slice(-1);

    if (operators.includes(last) && operators.includes(e.key)) {

        e.preventDefault();

    }

});


// =============================
// Click History to Reuse
// =============================

historyList.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {

        display.value = e.target.innerText.split("=")[0].trim();

    }

});
// Live Clock

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString();

document.getElementById("date").innerHTML=

now.toDateString();

}

setInterval(updateClock,1000);

updateClock();


// Color Themes

const colors=document.querySelectorAll(".theme-colors span");

colors.forEach(color=>{

color.addEventListener("click",()=>{

document.documentElement.style.setProperty(

'--orange',

color.dataset.color

);

document.documentElement.style.setProperty(

'--orange2',

color.dataset.color

);

colors.forEach(c=>c.classList.remove("active"));

color.classList.add("active");

});

});