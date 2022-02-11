import { SocketContext, socket } from './context/socket';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"
import Game from "./components/Game"
import Lobby from "./components/Lobby"

function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/game/:id" element={<Game />}></Route>
          <Route path="/lobby/:id" element={<Lobby />}></Route>
        </Routes> 
      </SocketContext.Provider>
    </BrowserRouter>
  );
} 

export default App;
