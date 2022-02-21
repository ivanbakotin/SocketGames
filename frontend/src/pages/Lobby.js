import LobbyPlayers from "../components/LobbyPlayers";
import LobbyChat from "../components/LobbyChat";
import LobbyInfo from "../components/LobbyInfo";
import Nickname from "../components/Nickname";

const Lobby = () => {
  return (
    <>
      <Nickname />
      <article className="lobby">
        <div className="lobby-left">
          <LobbyPlayers />
          <LobbyInfo />
        </div>
        <LobbyChat />
      </article>
    </>
  )
}

export default Lobby;