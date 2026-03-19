import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import CharacterComics from "./pages/CharacterComics/CharacterComics";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          {/* BD D1 PERSONNAGE */}
          <Route path="/comics/:id" element={<CharacterComics />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="*"
            element={<div>Vous n'êtes pas censés etre ici</div>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
