import { gameList } from "../utils/variables";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { useContext } from "react";

const GameList = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  function goToLobby(e) {
    socket.emit("setup-lobby");

    socket.on("send-link", (id) => {
      navigate(`/lobby/${e.target.getAttribute("name")}/${id}`);
    });
  }

  return (
    <article className="gamelist">
      <h2 className="title">Choose a game to play!</h2>
      <section className="games">
        {gameList.map((game) => {
          return (
            <div
              className="game"
              key={game.name}
              onClick={goToLobby}
              name={game.name}
            >
              <img name={game.name} className="game-image" src={game.img} />
              <h3 name={game.name} className="game-title">
                {game.display}
              </h3>
            </div>
          );
        })}
      </section>
    </article>
  );
};

export default GameList;
