import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const LobbyPlayers = () => {

  const socket = useContext(SocketContext);
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [ players, setPlayers ] = useState([])
  const [ user, setUser ] = useState({})
  
  useEffect(() => {
    socket.emit("send-users", id);
    socket.emit("get-user");

    socket.on("receive-user", data => {
      setUser(data);
    })

    socket.on('get-users', users => {
      setPlayers(users);
    })

    socket.on('navigate-game', () => {
      navigate(`/game/${type}/${id}`, { state: { access: true }});
    })

    socket.on('kicked', () => {
      navigate(`/`);
    })

    return () => {
      socket.off('get-users');
      socket.off('navigate-game');
      socket.off("kicked");
      socket.off("receive-user");
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

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.host}/waitingroom/${type}/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
 
  return (
    <section className="lobby-players">
      
      <h2 className="lobby-players-header">Game Lobby</h2>

      <div className="lobby-link">
        <div>{`${window.location.host}/waitingroom/${type}/${id}`}</div>
        <button onClick={copyLink}>Copy Link</button>
      </div>

      <button onClick={leaveLobby}>Leave Lobby</button>
      <button onClick={startGame}>Start Game</button>

      <div className="player-list">
        {players.map(player => {
          return (
            <div className="player" key={player.lobby.id}>

              <p className="nickname">{player.nickname}</p>
              
              <button 
                className={player.lobby.ready ? "ready active" : "ready"} 
                onClick={socket.id == player.lobby.id ? setReady : null}>
                  {player.lobby.ready ? "Ready" : "Not Ready"}
              </button>

              {user?.host && user.id != player.lobby.id &&
              <>
              <button 
                className={player.lobby.mute ? "mute active" : "mute"}
                name={player.lobby.id} 
                onClick={setMute}>
                {player.lobby.mute ? "Muted" : "Not Muted"}
              </button>

              <button 
                className="kick"
                name={player.lobby.id} 
                onClick={kickPlayer}>
                Kick
              </button>
              </>}

            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LobbyPlayers;