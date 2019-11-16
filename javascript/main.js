let quizEl = document.querySelector("#quiz");
let quizButton = document.querySelector("#quizStart");
let timerEl = document.querySelector("#timer");
let quizInfoEl = document.querySelector("#startingInfo");
let quizResults = document.querySelector("#quizResults");

let titleEl = document.querySelector("#title")
let choicesEl = document.querySelector("#choices");
let firstChoiceEl = document.querySelector("#choices1");
let secondChoiceEl = document.querySelector("#choices2");
let thirdChoiceEl = document.querySelector("#choices3");
let fourthChoiceEl = document.querySelector("#choices4");

let scoreSubmitButton = document.querySelector("highScoreSubmit");
let scoresPageEl = document.querySelector("#highScoresPage");
let scoresInsertEl = document.querySelector("#highScoresDiv");
let scoresLinkEl = document.querySelector("#highScoresLink");
let userNameInput = document.querySelector("#highScore")

let currentQuestionIndex = 0;
let interval;
let timeLeft = 150;

//This function, triggered by a click event, will be responsible for housing the entire quiz and its html generation. Should just be the interval, giving the time allowed for the quiz, and invoke the quizLoop function. Anything else needed?
function startQuiz(){
    interval = setInterval(countdown, 1000);
    quizLoop();
    quizDisplaySwitch();
    showQuestion();
}

//A countdown function that's called when the Start Quiz button is clicked.
function countdown(){
    timerEl.textContent = `${timeLeft} seconds left`;
    timeLeft--;

    if (timeLeft === 0){
        timerEl.textContent = "";
        clearInterval(interval);
        quizEl.innerHTML = "<div class='container'>'The quiz is over, padawan!'</div>";
    }
};

function quizDisplaySwitch() {
    quizInfoEl.style.display = "none";
    quizEl.style.display = "block";
};

function quizDisplaySwitch2() {
    quizInfoEl.style.display = "none";
    quizEl.style.display = "none";
    quizResults.style.display = "block";
};

function quizDisplaySwitch3() {
    quizInfoEl.style.display = "none";
    quizEl.style.display = "none";
    quizResults.style.display = "none";
    scoresPageEl.style.display = "block";
};

//Need to create a function that will be called by startQuiz, which will replace the contents of quizBody with the first question and set of answer choices. Choices will be clickable, and when any of the four are clicked it will replace the html with that of the next question and so on. Will need to also check the selection against the correct answer, and if it isn't that answer, have it deduct 10 seconds from the timer.
function quizLoop() {
} 

function showQuestion() {
    if (currentQuestionIndex === 10) {
        quizDisplaySwitch2();
        clearInterval(interval);
        return;
    }
    titleEl.textContent = questions[currentQuestionIndex].title;
    firstChoiceEl.textContent = questions[currentQuestionIndex].choices[0];
    secondChoiceEl.textContent = questions[currentQuestionIndex].choices[1];
    thirdChoiceEl.textContent = questions[currentQuestionIndex].choices[2];
    fourthChoiceEl.textContent = questions[currentQuestionIndex].choices[3];
    
    debugger;
    scoreSubmitButton.addEventListener("click", function(event) {
        event.preventDefault();
    
        var scoreEntryData = {
            entryName: userNameInput.value.trim(),
            time: timeLeft.value
        };
    
        localStorage.setItem("scoreEntryData", JSON.stringify(scoreEntryData));
    
        var getScoreEntryData = JSON.parse(localStorage.getItem("scoreEntryData"));
    
        var addScoreEntryDataHtml = document.createElement("<div>");
        addScoreEntryDataHtml.innerText = scoreEntryData.entryName + ": " + scoreEntryData.time;
        document.scoresInsertEl.appendChild(addScoreEntryDataHtml);
        quizDisplaySwitch3();
    })
}

function checkAnswer(){
    let dataValue = event.target.getAttribute("data-value");
    
    console.log(dataValue);
    if (dataValue === questions[currentQuestionIndex].answer){
        currentQuestionIndex++;
        showQuestion();
    }else{
        timeLeft -= 15;
        currentQuestionIndex++;
        showQuestion();
    }
    if (timeLeft === 0){
        timerEl.textContent = "";
        clearInterval(interval);
        quizEl.innerHTML = "<div class='container text-light mt-5'><p>The quiz is over, padawan! Try again!</p></div>";
    }
     
}

// scoreSubmitButton.addEventListener("click", function(event){
//     event.preventDefault();

//     var scoreEntryData = {
//         entryName: userNameInput.value.trim(),
//         time: timeLeft.value
//     };

//     localStorage.setItem("scoreEntryData", JSON.stringify(scoreEntryData));

//     var getScoreEntryData = JSON.parse(localStorage.getItem("scoreEntryData"));

//     var addScoreEntryDataHtml = document.createElement("<div>");
//     addScoreEntryDataHtml.innerText = scoreEntryData.entryName + ": " + scoreEntryData.time;
//     document.scoresInsertEl.appendChild(addScoreEntryDataHtml);
//     quizDisplaySwitch3();
// })

quizButton.addEventListener("click", startQuiz);

firstChoiceEl.addEventListener("click", checkAnswer);
secondChoiceEl.addEventListener("click", checkAnswer);
thirdChoiceEl.addEventListener("click", checkAnswer);
fourthChoiceEl.addEventListener("click", checkAnswer);

scoresLinkEl.addEventListener("click", quizDisplaySwitch3);