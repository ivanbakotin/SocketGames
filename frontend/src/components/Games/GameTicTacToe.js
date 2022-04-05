import { SocketContext } from "../../context/socket";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameTicTacToe = () => {
  const socket = useContext(SocketContext);
  const { id } = useParams();

  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("tic-tac-toe-setup", id);

    socket.on("get-players", (data) => {
      setPlayers(data);
    });

    socket.on("update-board", (data) => {
      socket.emit("set-board", data);
    });

    socket.on("send-move", () => {
      socket.emit("set-move", id);
    });

    socket.on("move-made-tic", (data) => {
      setBoard(data);
    });

    socket.on("game-over-tic", () => {
      socket.emit("reset-game-tic", id);
    });

    return () => {
      socket.emit("leave-lobby", id);
      socket.off("move-made-tic");
      socket.off("game-over-tic");
      socket.off("get-players");
    };
  }, []);

  function makeMove(e) {
    socket.emit("make-move-tic", e.target.getAttribute("name"), id);
  }

  return (
    <article className="tic-tac-toe">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="score">
        {players[0]?.nickname}: {players[0]?.score} - {players[1]?.score} :
        {players[1]?.nickname}
      </div>

      <div className="move">
        Player move:{" "}
        {players[0]?.move ? players[0]?.nickname : players[1]?.nickname}
      </div>

      <section className="board">
        {board.map((tile, index) => {
          return (
            <div
              className={
                tile.sign
                  ? tile.sign == "X"
                    ? "tile X-sign"
                    : "tile O-sign"
                  : "tile"
              }
              onClick={makeMove}
              key={index}
              name={index}
            ></div>
          );
        })}
      </section>
    </article>
  );
};

export default GameTicTacToe;
