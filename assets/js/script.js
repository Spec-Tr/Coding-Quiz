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

// Attaching objects to HTML elements by IDs
var landingPage = document.getElementById("landing");
landingPage.style.display = "flex";

var quizPage = document.getElementById("quiz");
quizPage.style.display = "none";

var gameOverPage = document.getElementById("gameover");
gameOverPage.style.display = "none";

var completePage = document.getElementById("complete");
completePage.style.display = "none";

var scoreboardPage = document.getElementById("scoreboard");
scoreboardPage.style.display = "none";

var countdown = document.getElementById("timer");

var questionTitle = document.getElementById("question-text");

var whichAnswer = [];
whichAnswer = document.querySelectorAll(".answer");

var whichQuestion = 0;

var timeRemaining = 120;
var score = null;
var finalScore;
var timeInterval;

function startQuiz() {
    whichQuestion = 0; // Resets to the first question for replay
    timeRemaining = 120; // Resets the timer for replay
    landingPage.style.display = "none";
    quizPage.style.display = "flex";
    gameOverPage.style.display = "none";
    completePage.style.display = "none";
    scoreboardPage.style.display = "none";

    clearInterval(timeInterval);

    timeInterval = setInterval(function () {
        if (timeRemaining > 1) {
            countdown.textContent = timeRemaining + " seconds remaining";
            timeRemaining--;
        } else if (timeRemaining === 1) {
            countdown.textContent = timeRemaining + " second remaining";
            timeRemaining--;
        } else {
            countdown.textContent = "Time's Up!";
            clearInterval(timeInterval);
            finish(timeRemaining);
        }
    }, 1000);

    display(whichQuestion);

    // Remove previous event listeners
    whichAnswer.forEach(function (answer) {
        answer.removeEventListener("click", checkAns);
    });

    // Add new event listeners
    whichAnswer.forEach(function (answer) {
        answer.addEventListener("click", checkAns);
    });
}



function display(index) {
    var ques = quiz[index];
    questionTitle.textContent = ques.question

    for (var i = 0; i < whichAnswer.length; i++){
        whichAnswer[i].textContent = ques.multipleChoice[i];
    }
}

function checkAns() {
    var userSelect = this.textContent;
    ques = quiz[whichQuestion];
    if (userSelect === ques.correct) {
        whichQuestion++;
        if (whichQuestion < quiz.length)  {
            display(whichQuestion);
        } else {
            finish(timeRemaining);
        }
    } else {
        timeRemaining -= 5;
    }
}
var playAgain = document.querySelector(".redux")

function updateLeaderboard() {
    var leaderboardList = document.getElementById("rankings");
    
    // Reset the highscores array to an empty array if not already initialized
    highscores = highscores || [];

    // Log the highscores array to check its contents before updating the leaderboard
    console.log("Highscores inside updateLeaderboard:", highscores);

    // Create an HTML string to represent the leaderboard
    var leaderboardHTML = highscores.map(entry => `<li>${entry.name} - Score: ${entry.score}</li>`).join("");

    // Log the generated HTML string
    console.log("Generated HTML:", leaderboardHTML);

    // Set the innerHTML of the leaderboard with the generated HTML
    leaderboardList.innerHTML = leaderboardHTML;
}




function finish(time) {
    if (time > 0) {
        var score = calcScore(timeRemaining);
        finalScore = score;
        quizPage.style.display = "none";
        completePage.style.display = "flex";
        
        return score;
    } else {
        gameOverPage.style.display = "flex";
        quizPage.style.display = "none";

        // Log a message to the console to check if the finish function is being called
        console.log("Finish function called");

        // Log the highscores array to check its contents before updating the leaderboard
        console.log("Highscores before update:", highscores);

        // Clear the existing leaderboard content
        var leaderboardList = document.getElementById("rankings");
        leaderboardList.innerHTML = "";

        // Update the leaderboard
        updateLeaderboard();

        // Then start the quiz
        playAgain.addEventListener("click", startQuiz);
    }
}










// Move playAgain event listener outside of the finish function
var playAgain = document.querySelector("#redux");
playAgain.addEventListener("click", startQuiz);


// Move playAgain event listener outside of the finish function
var playAgain = document.querySelector("#redux");
playAgain.addEventListener("click", startQuiz);

function calcScore(time) {
    var score = time;
    console.log(score);
    return score;
}
let highscores = [];

var nameElement = document.querySelector("#hiscore");
var submitElement = document.querySelector("#record");

document.getElementById("record").addEventListener("click", function (event) {
    event.preventDefault();

    var entry = {
        name: nameElement.value,
        score: finalScore
    };

    // Retrieve existing highscores from local storage
    highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // Add the new entry
    highscores.push(entry);

    // Sort the highscores
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Log the updated highscores
    console.log("Highscores after update:", highscores);

    // Store the updated highscores in local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    // Display the highscores
    updateLeaderboard();

    // Show the scoreboard and hide the completePage
    scoreboardPage.style.display = "flex";
    completePage.style.display = "none";

    // Add an event listener for the "Play Again" button
    var again2 = document.querySelector("#redux");
    again2.addEventListener("click", startQuiz);
});

function updateLeaderboard() {
    var leaderboardList = document.getElementById("rankings");
    
    // Clear existing content
    leaderboardList.innerHTML = "";

    // Append entries individually
    for (var i = 0; i < highscores.length; i++) {
        var listEl = document.createElement("li");
        listEl.textContent = highscores[i].name + " - Score:" + highscores[i].score;
        leaderboardList.appendChild(listEl);
    }
}

    
var startButton = document.querySelector("#begin");
var startPage = document.getElementById("landing");
startButton.addEventListener("click", function() {
    startQuiz()
})