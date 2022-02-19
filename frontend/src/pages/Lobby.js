import LobbyPlayers from "../components/LobbyPlayers";
import LobbyChat from "../components/LobbyChat";
import Nickname from "../components/Nickname";

const Lobby = () => {
  return (
    <>
      <Nickname />
      <article className="lobby">
        <LobbyPlayers />
        <LobbyChat />
      </article>
    </>
  )
}

export default Lobby;