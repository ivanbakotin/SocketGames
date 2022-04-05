import { SocketContext, socket } from "./context/socket";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import Landing from "./pages/Landing";
import WaitingRoom from "./pages/WaitingRoom";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
            path="/waitingroom/:type/:id"
            element={<WaitingRoom />}
          ></Route>
          <Route path="/lobby/:type/:id" element={<Lobby />}></Route>
          <Route path="/game/:type/:id" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
