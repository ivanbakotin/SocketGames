import { useParams } from "react-router-dom";
import GameTyping from "../components/Games/GameTyping"
import GameDrawing from "../components/Games/GameDrawing"

const Game = () => {
  const { type } = useParams();

  if (type === "typing") return <GameTyping />
  if (type === "drawing") return <GameDrawing />
}

export default Game;