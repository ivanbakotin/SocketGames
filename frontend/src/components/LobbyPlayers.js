import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const LobbyPlayers = () => {

  const socket = useContext(SocketContext);
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [ players, setPlayers ] = useState([])
  
  useEffect(() => {
    socket.emit("send-users", id)

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

  function setMute(e) {
    socket.emit("set-mute", e.target.name, id);
  }

  function kickPlayer(e) {
    socket.emit("kick-player", e.target.name, id);
  }

  return (
    <section className="lobby-players">
      <h2 className="lobby-players-header">Game Lobby</h2>
      <button onClick={leaveLobby}>Leave Lobby</button>
      <button onClick={startGame}>Start Game</button>

      <div className="player-list">
        {players.map(player => {
          console.log(player)
          return (
            <div className="player" key={player.lobby.id}>
              <p className="nickname">{player.nickname}</p>
              <button 
                className={player.lobby.ready ? "ready active" : "ready"} 
                onClick={socket.id == player.id ? setReady : null}>
                  Ready
              </button>
              {(!player?.lobby?.host && (socket.id != player.lobby.id)) && 
              <>
              <button name={player.lobby.id} onClick={setMute}>Mute</button>
              <button name={player.lobby.id} onClick={kickPlayer}>Kick</button>
              </>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LobbyPlayers;