//Random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
userInput.focus();
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
//Display random quotes
const renderNewQuote = async () => {
    //Fetch content from quote api url
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    //Array of chars in quote
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
        
    });
    quoteSection.innerHTML += arr.join("");

};

//Logic to compare input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    //Array of user input chars
    let userInputChars = userInput.value.split("");
    
    //Loop through each char in quote
    quoteChars.forEach((char, index) => {
        //Check chars with quote chars
        char.classList.remove("active");
        
        if (index == userInput.value.length) {
            char.classList.add("active");
            // char.classList.add("active");
        }
        

        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
            // char.classList.add("active");
        }
        //If user hasn't entered anything or backspaced
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
                
            } else {
                char.classList.remove("fail");
                
            }
        }
        //if user entered wrong char
        else {
            if (!char.classList.contains("fail")) {
                //increament and displaying mistakes
                mistakes++;
                
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        //Return true if all chars are correct
        // let check = quoteChars.every((element) => {
        //     return element.classList.contains("success");
        // });

        // //End test if all chars are correct
        // if (check ) {
        //     displayResult();
        // }
        

    });

});

//Update timer
userInput.onkeydown = function (){
        
        // console.log(userInput.value.length)
        // quote[userInput.value.length]
        // let span = quote[0];
        // span.classList.add("this")
        // console.log(document.querySelector("#quote"))

        // chars.forEach(span =>span.classList.remove("active"));
        // chars[charIndex].classList.add("active");
    
            if((userInput.value.length)+1 == (quote.length))
            {
                console.log("this");
                displayResult();
            }
            
                
            
        
        
    }


function updateTimer() {
    if (time == 0 ){
        
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

//Set timer
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

//End test
const displayResult = () => {
    //Display result div
    document.querySelector(".result").style.display = "flex";
    document.querySelector("#quote").style.display = "none";
    document.querySelector(".stats").style.display = "none";

    clearInterval(timer);
    // document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};

//Start test
timeReduce();
mistakes = 0;
timer = "";
updateTimer();

// const startTest = () => {
//     mistakes = 0;
//     timer = "";
//     userInput.disabled = false;
//     // timeReduce();
//     // document.getElementById("start-test").style.display = "none";
//     // document.getElementById("stop-test").style.display = "block";
// };

window.onload = () => {
    userInput.value = "";
    // document.getElementById("start-test").style.display = "block";
    // document.getElementById("stop-test").style.display = "none";
    userInput.disabled = false;
    renderNewQuote();
}