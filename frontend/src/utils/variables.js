import rgbImage from "../assets/rgbgame.webp";
import ticImage from "../assets/tictactoegame.webp";

export const gameList = [
  {
    img: ticImage,
    maxplayers: 2,
    display: "Tic Tac Toe",
    name: "tictactoe",
    description:
      "Tic-tac-toe is a game for two players who take turns marking the spaces in a three-by-three grid with X or O. ",
    instructions:
      "The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. ",
  },
  {
    img: rgbImage,
    maxplayers: 4,
    display: "RGB Guesser",
    name: "rgb",
    description:
      "A game where you try to guess what color corresponds to the displayed RGB value.",
    instructions:
      "R-Red, G-Green, B-Blue. Higher the number stronger the corresponding color.",
  },
];
