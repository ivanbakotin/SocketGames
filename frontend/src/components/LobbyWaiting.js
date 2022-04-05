import { SocketContext } from "../context/socket";
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LobbyWaiting = () => {
  const socket = useContext(SocketContext);
  const { id, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("enter-waiting", id);

    socket.on("accepted", () => {
      navigate(`/lobby/${type}/${id}`);
    });

    socket.on("declined", () => {
      navigate(`/`);
    });

    return () => {
      socket.off("receive-user");
      socket.off("accepted");
    };
  }, []);

  return (
    <div className="lobby-waiting">Waiting For Host To Accept Request...</div>
  );
};

export default LobbyWaiting;
