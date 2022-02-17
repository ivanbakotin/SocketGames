import { SocketContext, socket } from './context/socket';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import Game from "./components/Game"
import Lobby from "./components/Lobby"
import GameList from './components/GameList';

function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/gamelist" element={<GameList />}></Route>
          <Route path="/lobby/:id/:type" element={<Lobby />}></Route>
          <Route path="/game/:id/:type" element={<Game />}></Route>
        </Routes> 
      </SocketContext.Provider>
    </BrowserRouter>
  );
} 

export default App;