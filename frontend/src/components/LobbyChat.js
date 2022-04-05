import { useEffect, useState } from "react";
import { socket } from "../context/socket";
import { useParams } from "react-router-dom";

const LobbyChat = () => {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messageScroll = document.getElementsByClassName("messages")[0];

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
      messageScroll.scrollTop = messageScroll.scrollHeight;
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    if (message) socket.emit("send-message", message, id);

    e.target.firstChild.value = "";
    setMessage("");
  }

  function handleInput(e) {
    setMessage(e.target.value);
  }

  return (
    <section className="lobby-chat">
      <h2 className="chat-header">Lobby Chat</h2>

      <div className="messages">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={message.id == socket.id ? "message right" : "message"}
            >
              <p>{message.nickname}:</p>
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage}>
        <input
          autoComplete="off"
          onChange={handleInput}
          type="text"
          placeholder="Message"
        />
        <button type="submit">SEND</button>
      </form>
    </section>
  );
};

export default LobbyChat;
