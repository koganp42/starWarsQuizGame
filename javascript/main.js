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
}

function quizDisplaySwitch() {
    quizInfoEl.style.display = "none";
    quizEl.style.display = "block";
}

function quizDisplaySwitch2() {
    quizInfoEl.style.display = "none";
    quizEl.style.display = "none";
    quizResults.style.display = "block";
}


//Need to create a function that will be called by startQuiz, which will replace the contents of quizBody with the first question and set of answer choices. Choices will be clickable, and when any of the four are clicked it will replace the html with that of the next question and so on. Will need to also check the selection against the correct answer, and if it isn't that answer, have it deduct 10 seconds from the timer.
function quizLoop() {
    //Assigning the key/value pairs to variables of their own with the intention of using the variables in the looping creation of html that contains each question title and its choices. Not sure if this is the right thing to do.
    
    
    
    //choicesEl.addEventListener("click", nextQuestion);
    
    
} 

function showQuestion() {
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
    if (timeLeft === 0){
        timerEl.textContent = "";
        clearInterval(interval);
        quizEl.innerHTML = "<div class='container'><p>The quiz is over, padawan! Try again!</p></div>";;
    }
    // if (currentQuestionIndex === 10) {
    //     quizDisplaySwitch2();
    //     clearInterval(interval);
    // } 
}
function results(){
    
}

quizButton.addEventListener("click", startQuiz);

firstChoiceEl.addEventListener("click", checkAnswer);
secondChoiceEl.addEventListener("click", checkAnswer);
thirdChoiceEl.addEventListener("click", checkAnswer);
fourthChoiceEl.addEventListener("click", checkAnswer);
// quizEl.innerHTML = 
// `<div class="row" id="questions">${q.title}</div>
    // <div class="row choices">${q.choices[0]}</div>
    // <div class="row choices">${q.choices[1]}</div>
    // <div class="row choices">${q.choices[2]}</div>
    // <div class="row choices">${q.choices[3]}</div>`

//The code commented out below was based on an example I found online for generating quiz questions through js using my questions object. I'm not sure if it'll actually work, so I've commented it out and tried a different way above this line.
    // function quizLoop(){
    //     const output = [];
    //     questions.forEach(
    //         (currentTitle, titleNumber) => {
    //             const choices = [];
    //             for(letter in currentTitle.choices){
    //                 choices.push(
    //                     `<label>
    //                         <input type="radio" name="title${titleNumber}" value="${letter}">
    //                         ${letter} : 
    //                         ${currentTitle.choices[letter]}
    //                     </label>`
    //                 );
    //             }
    //         output.push(
    //             `<div class="title"> ${currentTitle.title} </div>
    //             <div class="choices"> ${choices.join('')} </div`
    //         );
    //         }
    //     );
    //     quizEl.innerHTML = output.join('');
    // 