//References
let timeLeft = document.querySelector(".lefted-lime");
let quizContainer = document.getElementById("included");
let nextBtn = document.getElementById("next-question");
let countOfQuestion = document.querySelector(".questions-count");
let displayContainer = document.getElementById("questions-display");
let scoreContainer = document.querySelector(".showing-score");
let restart = document.getElementById("start-over");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".question-starting");
let startButton = document.getElementById("start-btn");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which sport is known as the 'king of sports'?",
        options: ["Soccer", "Basketball", "Cricket", "Tennis"],
        correct: "Soccer",
    },
    {
        id: "1",
        question: "In which sport can you perform a slam dunk?",
        options: ["Volleyball", "Basketball", "Rugby", "Badminton"],
        correct: "Basketball",
    },
    {
        id: "2",
        question: "Who is often referred to as 'the greatest' in the history of boxing?",
        options: ["Muhammad Ali", "Mike Tyson", "Floyd Mayweather", "Manny Pacquiao"],
        correct: "Muhammad Ali",
    },
    {
        id: "3",
        question: "Which country hosted the 2016 Summer Olympics?",
        options: ["United States", "Brazil", "China", "Russia"],
        correct: "Brazil",
    },
    {
        id: "4",
        question: "Which sport is played in a rink and involves hitting a puck with sticks?",
        options: ["Field Hockey", "Ice Hockey", "Roller Hockey", "Lacrosse"],
        correct: "Ice Hockey",
    },
    {
        id: "5",
        question: "Who won the FIFA World Cup in 2018?",
        options: ["France", "Germany", "Brazil", "Spain"],
        correct: "France",
    },
    {
        id: "6",
        question: "Which athlete is known as 'The Lightning Bolt' and holds multiple world records in track and field?",
        options: ["Usain Bolt", "Carl Lewis", "Michael Johnson", "Jesse Owens"],
        correct: "Usain Bolt",
    },
    {
        id: "7",
        question: "Which sport is known for its terms 'love,' 'deuce,' and 'ace'?",
        options: ["Tennis", "Golf", "Table Tennis", "Cricket"],
        correct: "Tennis",
    },
    {
        id: "8",
        question: "Which team has won the most Super Bowl championships in NFL history?",
        options: ["Dallas Cowboys", "Green Bay Packers", "Pittsburgh Steelers", "New England Patriots"],
        correct: "Pittsburgh Steelers",
    },
    {
        id: "9",
        question: "In which country did the sport of volleyball originate?",
        options: ["United States", "Brazil", "Japan", "Italy"],
        correct: "United States",
    },
];


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};