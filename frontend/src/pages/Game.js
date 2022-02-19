import { useParams } from "react-router-dom";
import GameTyping from "../components/GameTyping"
import GameDrawing from "../components/GameDrawing"

const Game = () => {
  const { type } = useParams();

  if (type === "typing") return <GameTyping />
  if (type === "drawing") return <GameDrawing />
}

export default Game;