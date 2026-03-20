import "./Header.css";
import logo from "./../../assets/img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo Marvel" />
      </div>
      <div className="menu">
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/characters">
          <span>Personnages</span>
        </Link>
        <Link to="/comics">
          <span>Comics</span>
        </Link>
        <Link to="/favorites">
          <span>Favoris</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
