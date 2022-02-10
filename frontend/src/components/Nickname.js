import { useState, useContext } from "react";
import { SocketContext } from "../context/socket"

const Nickname = () => {

    const socket = useContext(SocketContext);

    const [ nickname, setNickname ] = useState("");

    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    
    function handleInput(e) {
        setNickname(e.target.value);
    }

    function goToMenu(e) {
        e.preventDefault();
        socket.emit("set-nickname", nickname, id);
        localStorage.setItem("nickname", JSON.stringify(nickname));
    }

    return (
        <form onSubmit={goToMenu}>
            <label htmlFor="nickname">Nickname:</label>
            <input onChange={handleInput} type="text" id="nickname" name="nickname"></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Nickname;