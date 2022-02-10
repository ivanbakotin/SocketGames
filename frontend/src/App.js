import { SocketContext, socket } from './context/socket';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Nickname from "./components/Nickname";
import Menu from "./components/Menu"
import Game from "./components/Game"
import Lobby from "./components/Lobby"

function App() {
  return (
    <BrowserRouter>
      <Header />

    <SocketContext.Provider value={socket}>
      <Nickname />

      <main className="container">
      
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/game/:id" element={<Game />}></Route>
          <Route path="/lobby/:id" element={<Lobby />}></Route>
        </Routes> 
      </main>

    </SocketContext.Provider>
    </BrowserRouter>
  );
} 

export default App;
