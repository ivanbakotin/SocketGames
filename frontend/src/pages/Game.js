import { useParams } from "react-router-dom";
import GameTicTacToe from "../components/Games/GameTicTacToe";
import GameRGB from "../components/Games/GameRGB";

const Game = () => {
  const { type } = useParams();

  if (type === "tictactoe") return <GameTicTacToe />;
  if (type === "rgb") return <GameRGB />;
};

export default Game;
