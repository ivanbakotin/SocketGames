import { useState, useContext } from "react";
import { SocketContext } from "../context/socket"

const Nickname = () => {

  const socket = useContext(SocketContext);
  
  const [ nickname, setNickname ] = useState("");

  const type = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  
  function handleInput(e) {
    setNickname(e.target.value);
  }

  function updateNickname(e) {
    e.preventDefault();
    socket.emit("set-nickname", nickname, type);
    localStorage.setItem("nickname", JSON.stringify(nickname));
  }

  return (
    <form className="nickname-form" onSubmit={updateNickname}>
      <label htmlFor="nickname">Nickname:</label>
      <input autoComplete="off" onChange={handleInput} type="text" id="nickname" name="nickname"></input>
      <button type="submit">SET</button>
    </form>
  )
}

export default Nickname;