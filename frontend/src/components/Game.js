import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const Game = () => {

    const socket = useContext(SocketContext);

    const [ players, setPlayers ] = useState([]);
    
    useEffect(() => {
        socket.on('get-users', users => {
            setPlayers(users);
        })
    }, [])

    return (
        <div className="game">
            <div className="target-word"></div>
            <input type="text" name="input-word" className="input-word" />
            {players.map(player => {
                return (
                    <div key={player.id}>
                        {player.nickname}
                        {player.points}
                    </div>
                )
            })}
        </div>
    )
}

export default Game;