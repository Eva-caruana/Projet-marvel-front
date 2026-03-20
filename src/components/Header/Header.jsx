import "./Header.css";
import logo from "./../../assets/img/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";

const Header = ({ name, setName, title, setTitle }) => {
  const location = useLocation();
  return (
    <header>
      <div className="container">
        <div className="left-side-header">
          <img src={logo} alt="logo Marvel" />

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
          </div>
        </div>

        <div className="right-side-header">
          {/* Si la barre de recherche est sur la page characters on l'affiche  */}
          <div className="search-section">
            {location.pathname === "/characters" && (
              <div>
                <input
                  className="search-input"
                  type="text"
                  name="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <FaMagnifyingGlass className="search-icon" />
              </div>
            )}
            {/* Si la barre de recherche est sur la page comics on l'affiche  */}
            {location.pathname === "/comics" && (
              <div>
                <input
                  className="search-input"
                  type="text"
                  name="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <FaMagnifyingGlass className="search-icon" />
              </div>
            )}
          </div>

          <Link to="/favorites">
            <span>
              <FiHeart className="favorite-icon-header" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
