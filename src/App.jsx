import "./App.css";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import CharacterComics from "./pages/CharacterComics/CharacterComics";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    //GESTION DES FAVORIS
    // Récuperation des personnages favoris et comics dans le localStorage
    try {
      //si rien n’existe on met un tableau vide
      const storedCharacters =
        JSON.parse(localStorage.getItem("favoriteCharacters")) || [];
      const storedComics =
        JSON.parse(localStorage.getItem("favoriteComics")) || [];

      //on stocke les favoris dans les states
      setFavoriteCharacters(storedCharacters);
      setFavoriteComics(storedComics);
      setLoading(false);
    } catch (error) {
      console.log("Erreur lors du chargement des favoris :", error);
      // Si erreur renvoie des tableaux vides
      setFavoriteCharacters([]);
      setFavoriteComics([]);
      setLoading(false);
    }
  }, []);
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
  //utilisation d'une fonction toggle pour alterner les etats entre chaque appel de la fontion (appui bouton)
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
  return loading ? (
    <span>Loading... </span>
  ) : (
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
