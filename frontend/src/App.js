import { SocketContext, socket } from './context/socket';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Game from "./pages/Game"
import Lobby from "./pages/Lobby"
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/lobby/:type/:id" element={<Lobby />}></Route>
          <Route path="/game/:type/:id" element={<Game />}></Route>
        </Routes> 
      </SocketContext.Provider>
    </BrowserRouter>
  );
} 

export default App;