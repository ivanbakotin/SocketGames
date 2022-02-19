import { SocketContext, socket } from './context/socket';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Game from "./components/Game"
import Lobby from "./components/Lobby"
import GameList from './components/GameList';

function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<GameList />}></Route>
          <Route path="/lobby/:type/:id" element={<Lobby />}></Route>
          <Route path="/game/:type/:id" element={<Game />}></Route>
        </Routes> 
      </SocketContext.Provider>
    </BrowserRouter>
  );
} 

export default App;