let quizEl = document.querySelector("#quiz");
let quizButton = document.querySelector("#quizStart");
let timerEl = document.querySelector("#timer");
let interval;
let timeLeft = 5;

function startQuiz(){
    interval = setInterval(countdown, 1000);
}

function countdown(){
    timerEl.textContent = "You have "+ timeLeft + " seconds left.";
    timeLeft--;

    if (timeLeft === 0){
        timerEl.textContent = "";
        clearInterval(interval);
        quizEl.innerHTML = "<div class='container'>'The quiz is over, padawan!'</div>";
    }
}

quizButton.addEventListener("click", startQuiz);