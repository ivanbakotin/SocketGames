import { gameList } from "../utils/variables";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { useContext } from "react";
import Header from "./Header.js";

const GameList = () => {

  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  function goToLobby(e) {
    socket.emit("get-link");

    socket.on('send-link', id => {
      navigate(`/lobby/${e.target.getAttribute("name")}/${id}`);
    });
  }

  return (
    <>
    <Header />
    <section className="gamelist">
      <h1>Choose a game to play!</h1>
      {gameList.map(game => {
        return (
          <div 
            key={game.name}
            onClick={goToLobby} 
            name={game.name} 
            className="game">
            {game.display}
          </div>
        )
      })}
    </section>
    </>
  )
}

export default GameList;