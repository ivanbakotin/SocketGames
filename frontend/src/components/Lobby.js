import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket"
import { useContext, useEffect, useState } from "react";

const Lobby = () => {

    const socket = useContext(SocketContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ players, setPlayers ] = useState([])

    useEffect(() => {
        socket.emit("join-room", id)

        socket.on('get-users', users => {
            setPlayers(users);
        })

        socket.on('navigate-game', users => {
            navigate("/");
        })
    }, [])

    function setReady() {
        socket.emit("set-ready", id);
    }

    function leaveLobby() {
        socket.emit("leave-lobby", id);
        navigate("/");
    }

    function startGame() {
        socket.emit("start-game", id);
    }

    return (
        <section className="lobby">
            <div className="game-link">{window.location.href}</div>

            <button onClick={leaveLobby}>Leave Lobby</button>

            <button onClick={startGame}>Start Game</button>
            
            <div className="player-list">
                {players.map(player => {
                    return (
                        <div className="player" key={player.id}>
                            <p className="nickname">{player.nickname}</p>
                            <button 
                                className={socket.ready ? "ready active" : "ready"} 
                                onClick={setReady}>
                                    Ready
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Lobby;