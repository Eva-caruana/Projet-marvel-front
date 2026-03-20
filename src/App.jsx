import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import CharacterComics from "./pages/CharacterComics/CharacterComics";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <Router>
        <Header
          name={name}
          setName={setName}
          title={title}
          setTitle={setTitle}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={<Characters name={name} setName={setName} />}
          />
          <Route
            path="/comics"
            element={<Comics title={title} setTitle={setTitle} />}
          />
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
