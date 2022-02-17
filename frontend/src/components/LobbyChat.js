import { useEffect, useState } from "react";

const LobbyChat = () => {

  const [ messages, setMessages ] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <section>
      {messages.map(message => {
        return (
          <div className="message">
            {message.message}
          </div>
        )
      })}
      <input type="text" />
    </section>
  )
}

export default LobbyChat;