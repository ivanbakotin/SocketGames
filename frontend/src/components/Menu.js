import { Link, useNavigate } from "react-router-dom"
import { SocketContext } from "../context/socket"
import { useContext } from "react";

const Menu = () => {

    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    function getLink() {
        socket.emit("get-link");
        socket.on('send-link', id => {
            navigate(`/lobby/${id}`);
        });
    }

    return (
        <ul className="menu">
            <li><Link to="/game-list">Play Solo</Link></li>
            <li>Play With Strangers</li>
            <li onClick={getLink}>Play With Friends</li>
        </ul>
    )
}

export default Menu;