import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const LobbyPlayers = () => {

  const socket = useContext(SocketContext);
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [ players, setPlayers ] = useState([])
  
  useEffect(() => {
    socket.emit("join-lobby", id)

    socket.on('get-users', users => {
      setPlayers(users);
    })

    socket.on('navigate-game', () => {
      navigate(`/game/${type}/${id}`);
    })

    return () => {
      socket.off('get-users');
      socket.off('navigate-game');
    }
  }, [type])

  function setReady() {
    socket.emit("set-ready", id);
  }

  function leaveLobby() {
    socket.emit("leave-lobby", id);
    navigate("/");
  }

  function startGame() {
    socket.emit("start-game", id);
  }

  return (
    <section className="lobby-players">
      <button onClick={leaveLobby}>Leave Lobby</button>
      <button onClick={startGame}>Start Game</button>

      <div className="player-list">
        {players.map(player => {
          return (
            <div className="player" key={player.id}>
              <p className="nickname">{player.nickname}</p>
              <button 
                className={player.ready ? "ready active" : "ready"} 
                onClick={setReady}>
                  Ready
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LobbyPlayers;