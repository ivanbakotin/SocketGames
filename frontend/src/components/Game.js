import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const Game = () => {

    const socket = useContext(SocketContext);

    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    const [ players, setPlayers ] = useState([]);
    
    useEffect(() => {
        socket.emit("send-users", id);

        socket.on('get-users', users => {
            setPlayers(users);
        })
    }, [])

    function addCounter() {
        socket.emit("add-counter", id);
    }

    return (
        <div className="game">
            <div className="target-word"></div>
            <input type="text" name="input-word" className="input-word" />
            {players.map(player => {
                return (
                    <div key={player.id}>
                        {player.nickname}
                        {player.points}
                        <button onClick={addCounter}>{player.counter}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Game;