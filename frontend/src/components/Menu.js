import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Menu = () => {

  const navigate = useNavigate();

  function goToGameList() {
    navigate("/gamelist");
  }

  return (
    <>
    <Header />
    <main className="container-menu">
      <ul className="menu">
        <li onClick={goToGameList}>Play</li>
      </ul>
    </main>
    </>
  )
}

export default Menu;