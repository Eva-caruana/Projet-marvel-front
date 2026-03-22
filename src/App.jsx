import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import CharacterComics from "./pages/CharacterComics/CharacterComics";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  //GESTION DES FAVORIS
  // lire le localStorage directement au moment où le state est créé

  const [favoriteCharacters, setFavoriteCharacters] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoriteCharacters")) || [];
    } catch {
      return [];
    }
  });

  const [favoriteComics, setFavoriteComics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoriteComics")) || [];
    } catch {
      return [];
    }
  });

  // useEffect uniquement pour sauvegarder
  //Transofmer les données reçues en  chaines de caracteres avant stockage
  useEffect(() => {
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(favoriteCharacters),
    );
  }, [favoriteCharacters]);

  useEffect(() => {
    localStorage.setItem("favoriteComics", JSON.stringify(favoriteComics));
  }, [favoriteComics]);

  // ===> Personnages
  //Pour alterner les etats entre chaque appel de la fontion (appui bouton)
  const toggleFavoriteCharacter = (character) => {
    // On vérifie si le personnage est déjà dans les favoris avec find
    const isAlreadyFavorite = favoriteCharacters.find(
      (item) => item._id === character._id,
    );
    // filter : si le personnage est déjà dans les favoris
    if (isAlreadyFavorite) {
      setFavoriteCharacters(
        // On crée un nouveau tableau SANS ce personnage car on ne peut pas modifier directement le tableau
        favoriteCharacters.filter((item) => item._id !== character._id),
      );
    } else {
      // SINON
      // On l’ajoute à la liste des favoris
      // on copie l’ancien tableau : spread operator
      // on ajoute le nouveau personnage
      setFavoriteCharacters([...favoriteCharacters, character]);
    }
  };
  //  ===> Comics
  const toggleFavoriteComic = (comic) => {
    //Comic deja présent ?
    const isAlreadyFavorite = favoriteComics.find(
      (item) => item._id === comic._id,
    );

    // filter : si le comic est déjà dans les favoris
    if (isAlreadyFavorite) {
      setFavoriteComics(
        // On crée un nouveau tableau SANS ce comic car on ne peut pas modifier directement le tableau
        favoriteComics.filter((item) => item._id !== comic._id),
      );
    } else {
      // SINON
      // On l’ajoute à la liste des favoris
      // on copie l’ancien tableau : spread operator
      // on ajoute le nouveau comic
      setFavoriteComics([...favoriteComics, comic]);
    }
  };
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
            element={
              <Characters
                name={name}
                setName={setName}
                favoriteCharacters={favoriteCharacters}
                toggleFavoriteCharacter={toggleFavoriteCharacter}
              />
            }
          />

          <Route
            path="/comics"
            element={
              <Comics
                title={title}
                setTitle={setTitle}
                favoriteComics={favoriteComics}
                toggleFavoriteComic={toggleFavoriteComic}
              />
            }
          />
          {/* BD D1 PERSONNAGE */}
          <Route
            path="/comics/:id"
            element={
              <CharacterComics
                favoriteComics={favoriteComics}
                toggleFavoriteComic={toggleFavoriteComic}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favoriteCharacters={favoriteCharacters}
                favoriteComics={favoriteComics}
                toggleFavoriteCharacter={toggleFavoriteCharacter}
                toggleFavoriteComic={toggleFavoriteComic}
              />
            }
          />
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
