import { useParams } from "react-router-dom";
import GameTyping from "./GameTyping"
import GameDrawing from "./GameDrawing"

const Game = () => {
  const { type } = useParams();

  if (type === "typing") return <GameTyping />
  if (type === "drawing") return <GameDrawing />
}

export default Game;