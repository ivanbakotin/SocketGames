import { useEffect, useState } from "react";
import { socket } from "../context/socket";
import { useParams } from "react-router-dom";

const LobbyChat = () => {

  const { id } = useParams();

  const [ messages, setMessages ] = useState([]);
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    socket.on("receive-message", data => {
      setMessages(prev => [ ...prev, data ])
    })

    return () => {
      socket.off("receive-message");
    }
  }, [])

  function sendMessage() {
    socket.emit("send-message", message, id);
    setMessage("");
  }

  function handleInput(e) {
    setMessage(e.target.value);
  }

  return (
    <section className="lobby-chat">
      <div className="messages">
      {messages.map(message => {
        return (
          <div className="message">
            {message.message}
          </div>
        )
      })}
      </div>
      <form onSubmit={sendMessage}>
        <input onChange={handleInput} type="text" placeholder="Message"/>
        <button type="submit">SEND</button>
      </form>
    </section>
  )
}

export default LobbyChat;