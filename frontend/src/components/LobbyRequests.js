import { SocketContext } from "../context/socket";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LobbyRequests = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("player-waiting", (data) => {
      setPlayers((prev) => [...prev, data]);
    });

    return () => {
      socket.off("player-waiting");
    };
  }, []);

  function acceptRequest(e) {
    socket.emit("accept-request", e.target.name, id);
  }

  function declineRequest(e) {}

  return (
    <section className="lobby-requests">
      <h2 className="lobby-requests-header">Player Requests</h2>
      {players.length ? (
        players.map((player) => {
          return (
            <div className="request" key={player.id}>
              <div>{player.nickname}</div>
              <button name={player.id} onClick={acceptRequest}>
                Accept
              </button>
              <button name={player.id} onClick={declineRequest}>
                Decline
              </button>
            </div>
          );
        })
      ) : (
        <div className="request">No requests</div>
      )}
    </section>
  );
};

export default LobbyRequests;
