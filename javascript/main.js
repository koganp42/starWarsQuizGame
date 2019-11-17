//Here I've globally declared all variables used to store the html elements I act on.
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

let scoreSubmitButton = document.querySelector("#highScoreSubmit");
let scoresPageEl = document.querySelector("#highScoresPage");
let scoresInsertEl = document.querySelector("#highScoresDiv");
let scoresLinkEl = document.querySelector("#highScoresLink");
let userNameInput = document.querySelector("#highScore")

let currentQuestionIndex = 0;
let interval;
let timeLeft = 150;
let scoreArray = [];

//This function, triggered by a click event, is responsible for housing the entire quiz and its html generation. 

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

//Three display switches for the initial quiz start, after the quiz is over, and the high scores page. The last can be triggered by either clicking the View High Scores link or once the user submits their name and score.
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
    console.log(scoreArray);
    populateScoreDivs();
        //The code below is a remnant of when I was able to successfully create a highscore entry but could not store it.
        //let addScoreEntryDataHtml = document.createElement("div");
        // addScoreEntryDataHtml.innerText = getScoreArray.scoreEntryData.entryName + ": " + scoreArray.scoreEntryData.time;
        // scoresInsertEl.appendChild(addScoreEntryDataHtml);
};

//I don't know why this function is necessary, but removing it breaks the quiz.
function quizLoop() {
} 

//This function is used to cycle through the quiz questions and display them, as well as to go 
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
    if (timeLeft <= 0){
        timerEl.textContent = "";
        clearInterval(interval);
        quizEl.innerHTML = "<div class='container text-light mt-5'><p>The quiz is over, padawan! Try again!</p></div>";
    }
     
}

function populateScoreDivs (){
    let scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    for(let i = 0; i < scoreArray.length; i++) {
        let newScoreDiv = document.createElement("div");
        newScoreDiv.innerText = scoreArray[i].scoreEntryData.entryName + ": " + scoreArray[i].scoreEntryData.time + " seconds";
    };
}

scoreSubmitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    //storing the user's entry as an object named scoreEntryData.
    let scoreEntryData = {
        entryName: userNameInput.value.trim(),
        time: timeLeft
    };
    
    let scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    if (scoreArray === null){
        scoreArray = [];
        scoreArray.push(scoreEntryData);
    } else {
        scoreArray.push(scoreEntryData);
    };
    // scoreArray.push(scoreEntryData);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
    

    //Storing the individual entry on local storage. I should probably be adding the entry to the array and storing that array, then displaying that array.

    quizDisplaySwitch3();
})


console.log(localStorage);
quizButton.addEventListener("click", startQuiz);

firstChoiceEl.addEventListener("click", checkAnswer);
secondChoiceEl.addEventListener("click", checkAnswer);
thirdChoiceEl.addEventListener("click", checkAnswer);
fourthChoiceEl.addEventListener("click", checkAnswer);

scoresLinkEl.addEventListener("click", quizDisplaySwitch3);