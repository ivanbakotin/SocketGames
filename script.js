const game = document.querySelector(".game");
const menu = document.querySelector(".menu");
const leaderboard = document.querySelector(".leaderboard");
const leaderboardButton = document.querySelector(".leaderboard-button");
const playButton = document.querySelector(".play-button");
const targetText = document.querySelector(".target-text");
const inputText = document.querySelector(".input-text");
const timer = document.querySelector(".timer");

playButton.addEventListener("click", displayGame);
inputText.addEventListener("input", checkInput);

function startTimer() {

    let sec = 0;
    let min = 0;
    let hour = 0;

    setInterval(() => {

        sec++;

        if (sec > 59) {
            sec = 0;
            min++;

            if (min > 59) {
                min = 0;
                hour++;
            }
        }

        (hour.toString().length === 1) ? hour = "0" + hour : null; 
        (min.toString().length === 1) ? min = "0" + min : null;    
        (sec.toString().length === 1) ? sec = "0" + sec : null;  

        timer.innerText = hour + ":" + min + ":" + sec;
    }, 1000) 
}

function getNewWord() {
    //fetch word
    targetText.innerText = "You"
}

function checkInput(e) {
    if (e.target.value === targetText.innerText) {
        getNewWord();
    }
}

function displayGame() {

    menu.classList.add("hidden"); 
    game.style.display = "flex";

    startTimer();
    getNewWord();
}
