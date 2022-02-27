import { SocketContext } from "../../context/socket";
import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const GameRGB = () => {

  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { state } = useLocation();

  const [ rgb, setRgb ] = useState({});
  const [ colors, setColors ] = useState([]);
  const [ players, setPlayers ] = useState([]);

  useEffect(() => {

    if (state.access) {
      socket.emit("join-game", id);
    }

    socket.emit("get-rgb-colors");
    socket.emit("get-users-rgb", id);

    socket.on("send-users-rgb", data => {
      setPlayers(data)
    })

    socket.on("send-rgb", data => {
      setRgb(data)
    })

    socket.on("send-colors", data => {
      setColors(data)
    })

    socket.on("get-answer", () => {
      socket.emit("get-rgb-colors");
    })

    return () => {
      socket.emit("leave-game", id);
      socket.off("send-users");
      socket.off("send-rgb");
      socket.off("send-colors");
      socket.off("get-answer");
    } 
  }, [])

  function guessColor(e) {
    socket.emit("send-answer", colors[e.target.getAttribute("data-index")], id);
  }

  return (
    <article className="game-rgb">
      <h1 className="title">RGB Game</h1>
      <div className="rgb">RGB Value: ({rgb.red}, {rgb.green}, {rgb.blue})</div>

      <section className="colors-section">
        <h2 className="color-title">Guess the color of the rgb value:</h2>
        <div className="colors">
        {colors.map((color, index) => {
      
          const backgroundColor = { 
            backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`
          }

          return (
            <div
              data-index={index} 
              key={index}
              style={backgroundColor} 
              onClick={guessColor} 
              className="color">
            </div>
          )
        })}
        </div>
      </section>

      <section className="players">
      {players.map(player => {
          return (
            <div className="player" key={player.id}>
              {player.nickname}: {player.score}
            </div>          
          )
      })}
      </section>
    </article>
  )
}

export default GameRGB;