const game = document.querySelector(".game");
const menu = document.querySelector(".menu");
const leaderboard = document.querySelector(".leaderboard");
const leaderboardButton = document.querySelector(".leaderboard-button");
const playButton = document.querySelector(".play-button");

playButton.addEventListener("click", displayGame);

function displayGame() {
    menu.classList.add("hidden"); 
}
