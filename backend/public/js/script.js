const menu = document.querySelector(".menu");
const preGame = document.querySelector(".pregame");
const game = document.querySelector(".game");
const gameOver = document.querySelector(".gameover")
const playButton = document.querySelector(".play-button");
const friendsButton = document.querySelector(".friends-button");
const targetText = document.querySelector(".target-text");
const inputText = document.querySelector(".input-text");
const timer = document.querySelector(".timer");
const linkGame = document.querySelector(".link-game");

const socket = io();

friendsButton.addEventListener("click", pregameSetup);

playButton.addEventListener("click", startGame);
inputText.addEventListener("input", checkInput);

function startTimer() {

    let sec = 0;
    let min = 0;
    let hour = 0;

    const intervalId = setInterval(() => {

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

        checkGameOver(intervalId, hour * 3600 + min * 60 + sec);
    }, 1000) 
}

function checkGameOver(intervalId, time) {
    if (time > 100) {
        clearInterval(intervalId);
        inputText.removeEventListener("input", checkInput);
        gameOver.style.display = "flex";
    }
}

function getNewWord() {
    //fetch word
    targetText.innerText = "You"
}

function checkInput(e) {

    socket.emit('chat message', e.target.value);

    if (e.target.value === targetText.innerText) {
        inputText.value = "";
        getNewWord();
    }
}

function startGame() {

    menu.classList.add("hidden"); 
    game.style.display = "flex";

    startTimer();
    getNewWord();
}



function pregameSetup() {
    menu.classList.add("hidden");
    preGame.style.display = "flex";
    socket.emit('get-link');  
}

socket.on('send-link', function(id) {
    linkGame.innerText = window.location.href + id;
});