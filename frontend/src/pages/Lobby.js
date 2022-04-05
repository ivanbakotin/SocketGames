import LobbyPlayers from "../components/LobbyPlayers";
import LobbyChat from "../components/LobbyChat";
import LobbyInfo from "../components/LobbyInfo";
import Nickname from "../components/Nickname";
import { SocketContext } from "../context/socket";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LobbyRequests from "../components/LobbyRequests";

const Lobby = () => {
  const socket = useContext(SocketContext);
  const { id } = useParams();

  const [user, setUser] = useState("");

  useEffect(() => {
    socket.emit("get-user", id);

    socket.on("receive-user", (data) => {
      setUser(data);
    });
    //if go back leave lobby
    return () => {
      socket.off("receive-user");
    };
  }, []);

  return (
    <>
      <Nickname />
      {user?.accepted && (
        <article className="lobby">
          <div className="lobby-left">
            <LobbyRequests />
            <LobbyPlayers />
            <LobbyInfo />
          </div>
          <LobbyChat />
        </article>
      )}
    </>
  );
};

export default Lobby;
