import { useParams } from "react-router-dom";
import GameTyping from "../components/Games/GameTyping";
import GameDrawing from "../components/Games/GameDrawing";
import GameRGB from "../components/Games/GameRGB";

const Game = () => {
  const { type } = useParams();

  if (type === "typing") return <GameTyping />
  if (type === "drawing") return <GameDrawing />
  if (type === "rgb") return <GameRGB />
}

export default Game;