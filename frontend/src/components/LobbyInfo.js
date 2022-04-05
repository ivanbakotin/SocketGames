import { gameList } from "../utils/variables.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const LobbyInfo = () => {
  const { type } = useParams();

  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(gameList.find((game) => game.name === type));
  }, [type]);

  return (
    <section className="lobby-info">
      <h2 className="lobby-info-header">{info.display}</h2>
      <p className="lobby-game-info">{info.description}</p>
      <p className="lobby-game-info">{info.instructions}</p>
      <p className="lobby-game-info">Max Players: {info.maxplayers}</p>
    </section>
  );
};

export default LobbyInfo;
