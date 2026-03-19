import "./Header.css";
import logo from "./../../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="logo Marvel" />
      </div>
      <div className="menu">
        <span>Home</span>
        <span>Personnages</span>
        <span>Comics</span>
        <span>Favoris</span>
      </div>
    </header>
  );
};

export default Header;
