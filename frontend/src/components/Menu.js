import { useNavigate } from "react-router-dom"
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
        <main className="container-menu">
        <ul className="menu">
            <li onClick={getLink}>Play</li>
            <li>Play With Strangers</li>
            <li>Settings</li>
        </ul>
        </main>
    )
}

export default Menu;