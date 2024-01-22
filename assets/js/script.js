// Quiz data
var quiz = [
    {
        question: `What does HTML stand for?`, 
        multipleChoice: ["Happy-Time Magic Land", "Hate That Monkey Lover", "Hyper-Text Markup Language", "Help! They Might Languish"],
        correct: "Hyper-Text Markup Language"
    },
    {
        question: `What does CSS stand for?`, 
        multipleChoice: ["CRUD, Systems & Servers", "Can't Stand Snakes", "Corny Silly Senators", "Cascading Style Sheet"],
        correct: "Cascading Style Sheet"
    },
    {
        question: `What does DOM stand for?`, 
        multipleChoice: ["Document Object Model", "Dreary Opulent Manatee", "Don't Only Mop", "Dirty Old Man"],
        correct: "Document Object Model"
    }
];

// DOM elements
var landingPage = document.getElementById("landing");
var quizPage = document.getElementById("quiz");
var gameOverPage = document.getElementById("gameover");
var completePage = document.getElementById("complete");
var scoreboardPage = document.getElementById("scoreboard");
var countdown = document.getElementById("timer");
var questionTitle = document.getElementById("question-text");
var whichAnswer = document.querySelectorAll(".answer");
var whichQuestion = 0;
var timeRemaining = 120;
var finalScore;
var timeInterval;

// Event listeners
var playAgain = document.querySelector("#redux");
playAgain.addEventListener("click", startQuiz);

// Initialize highscores array
let highscores = [];

// Function to start the quiz
function startQuiz() {
    // Reset quiz state
    whichQuestion = 0;
    timeRemaining = 120;
    clearInterval(timeInterval);

    // Display quiz page
    showElement(quizPage);
    
    // Start timer
    startTimer();

    // Display first question
    display(whichQuestion);

    // Add event listeners
    whichAnswer.forEach(function (answer) {
        answer.addEventListener("click", checkAns);
    });
}

// Function to display a question
function display(index) {
    var ques = quiz[index];
    questionTitle.textContent = ques.question;

    for (var i = 0; i < whichAnswer.length; i++){
        whichAnswer[i].textContent = ques.multipleChoice[i];
    }
}

// Function to check the selected answer
function checkAns() {
    var userSelect = this.textContent;
    ques = quiz[whichQuestion];
    
    if (userSelect === ques.correct) {
        whichQuestion++;
        if (whichQuestion < quiz.length) {
            display(whichQuestion);
        } else {
            finish(timeRemaining);
        }
    } else {
        timeRemaining -= 5;
    }
}

// Function to finish the quiz
function finish(time) {
    if (time > 0) {
        finalScore = calcScore(timeRemaining);
        hideElement(quizPage);
        showElement(completePage);
    } else {
        showElement(gameOverPage);
        hideElement(quizPage);
        clearElement(document.getElementById("rankings"));
        updateLeaderboard();
        playAgain.addEventListener("click", startQuiz);
    }
}

// Function to start the timer
function startTimer() {
    timeInterval = setInterval(function () {
        if (timeRemaining > 1) {
            countdown.textContent = timeRemaining + (timeRemaining > 1 ? " seconds remaining" : " second remaining");
            timeRemaining--;
        } else {
            countdown.textContent = "Time's Up!";
            clearInterval(timeInterval);
            finish(timeRemaining);
        }
    }, 1000);
}

// Function to calculate the score
function calcScore(time) {
    return time;
}

// Function to update the leaderboard
function updateLeaderboard() {
    var leaderboardList = document.getElementById("rankings");
    highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ name: nameElement.value, score: finalScore });
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    leaderboardList.innerHTML = highscores.map(entry => `<li>${entry.name} - Score: ${entry.score}</li>`).join("");
}

// Function to show an element
function showElement(element) {
    element.style.display = "flex";
}

// Function to hide an element
function hideElement(element) {
    element.style.display = "none";
}

// Initial setup
var nameElement = document.querySelector("#hiscore");
var submitElement = document.querySelector("#record");
document.getElementById("record").addEventListener("click", function (event) {
    event.preventDefault();
    updateLeaderboard();
    showElement(scoreboardPage);
    hideElement(completePage);
});
var startButton = document.querySelector("#begin");
startButton.addEventListener("click", startQuiz);