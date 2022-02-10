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
        <main className="container-game">
        <div className="game">
            <div className="players">
            {players.map(player => {
                return (
                    <div className="player" key={player.id}>
                        <p>{player.nickname}</p>
                        <button onClick={addCounter}>{player.counter}</button>
                    </div>
                )
            })}
            </div>
        </div>
        </main>
    )
}

export default Game;