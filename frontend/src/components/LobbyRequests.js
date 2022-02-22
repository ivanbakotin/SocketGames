import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LobbyRequests = () => {

  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [ players, setPlayers ] = useState([]);

  useEffect(() => {
    socket.on("player-waiting", data => {
      setPlayers(prev => [...prev, data])
    })

    return () => {
      socket.off("player-waiting");
    }
  }, [])

  function acceptRequest(e) {
    socket.emit("accept-request", e.target.name, id);
  }
  
  return (
    <section className="lobby-requests">
      {players.map(player => {
        return (
          <div>
            <div>{player.nickname}</div>
            <button name={player.id} onClick={acceptRequest}>Accept</button>
            <button>Decline</button>
          </div>
        )
      })}
    </section>
  )
}

export default LobbyRequests;