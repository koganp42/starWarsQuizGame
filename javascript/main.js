let quizEl = document.querySelector("#quiz");
let quizButton = document.querySelector("#quizStart");
let timerEl = document.querySelector("#timer");
let quizResults = document.querySelector("quizResults");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
// let lastQuestionIndex = questions.length - 1;
// let startingQuestionIndex = 0;
let interval;
let timeLeft = 150;

//This function, triggered by a click event, will be responsible for housing the entire quiz and its html generation. Should just be the interval, giving the time allowed for the quiz, and invoke the quizLoop function. Anything else needed?
function startQuiz(){
    interval = setInterval(countdown, 1000);
    //quizLoop function I assume will go here.
    quizLoop();
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

//Need to create a function that will be called by startQuiz, which will replace the contents of quizBody with the first question and set of answer choices. Choices will be clickable, and when any of the four are clicked it will replace the html with that of the next question and so on. Will need to also check the selection against the correct answer, and if it isn't that answer, have it deduct 10 seconds from the timer. 
function quizLoop() {
    //Assigning the key/value pairs to variables of their own with the intention of using the variables in the looping creation of html that contains each question title and its choices. Not sure if this is the right thing to do.
    let quizTitle = questions[i].title;
    let quizChoices = questions[i].choices;
    let quizAnswer = questions[i].answer;
    let lastQuestion = questions.length - 1;
    let currentQuestion = 0;
    
    function generateQuestion(){
        let q = questions[currentQuestion];
        quizEl.innerHTML = 
        `<div class="row" id="questions">${q.title}</div>
        <div class="row choices">${q.choices[0]}</div>
        <div class="row choices">${q.choices[1]}</div>
        <div class="row choices">${q.choices[2]}</div>
        <div class="row choices">${q.choices[3]}</div>`
    }

//I'm assuming I'll need a for loop to loop through the titles and choices, 
    // for (i = 0; i < questions.length; i++){
    //     quizEl.innerHTML = 
    //     `<div class="row" id="questions">${quizTitle}</div>
    //     <div class="row choices">A) ${quizChoices[0]}</div>
    //     <div class="row choices">B) ${quizChoices[1]}</div>
    //     <div class="row choices">C) ${quizChoices[2]}</div>
    //     <div class="row choices">D) ${quizChoices[3]}</div>`;
    // }

    // quizChoices.addEventListener("click", checkAnswer);

    // function checkAnswer(){
    //     if (quizChoices !== quizAnswer){
    //         timeLeft -= 10;

    //     } 
    // }
}


function results(){
    
}

quizButton.addEventListener("click", startQuiz);


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
    // }