import "./Favorites.css";
import { useEffect, useState } from "react";
import { BsFillLightningFill } from "react-icons/bs";

const Favorites = () => {
  // states pour stocker les favoris
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Utilisation du localStorage (pas de données sensibles/garder + longtemps) pour sauvegarder les favoris utilisateurs
    try {
      // On récupère les personnages favoris dans le localStorage
      //si rien n’existe on met un tableau vide

      const storedCharacters =
        JSON.parse(localStorage.getItem("favoriteCharacters")) || [];

      const storedComics =
        JSON.parse(localStorage.getItem("favoriteComics")) || [];

      // On met les données dans les states
      setFavoriteCharacters(storedCharacters);
      setFavoriteComics(storedComics);
      setLoading(false);
    } catch (error) {
      console.log("Erreur lors de la lecture des favoris :", error);
      setFavoriteCharacters([]);
      setFavoriteComics([]);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }
  // Si aucun favori (ni personnage ni comic)
  if (favoriteCharacters.length === 0 && favoriteComics.length === 0) {
    return (
      <main className="favorites-page">
        <div className="container">
          <h1>Mes favoris</h1>
          <p>Aucun favori enregistré pour le moment.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <div className="container">
        <h1>Mes favoris</h1>

        {/* Si pas de personnage favori ne paas afficher la section*/}
        {favoriteCharacters.length > 0 && (
          <section className="favorites-characters-section">
            <h2>Personnages favoris</h2>

            <div className="favorites-bloc">
              {favoriteCharacters.map((character) => {
                return (
                  <article className="character-article" key={character._id}>
                    <img
                      className="character-img"
                      src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                    <h3>
                      {character.name}{" "}
                      {/* <BsFillLightningFill
                        className="added-to-fav"
                        onClick={() => {
                          className = "lightning";
                        }}
                      />{" "} */}
                    </h3>
                    {character.description && <p>{character.description}</p>}
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {favoriteComics.length > 0 && (
          <section className="favorites-comics-section">
            <h2>Comics favoris</h2>

            <div className="favorites-bloc">
              {favoriteComics.map((comic) => {
                return (
                  <article className="comic-article" key={comic._id}>
                    <img
                      className="comic-img"
                      src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                    <h3>
                      {comic.title}{" "}
                      {/* <BsFillLightningFill
                        className="added-to-fav"
                        onClick={() => {
                          className = "lightning";
                        }}
                      />{" "} */}
                    </h3>
                    {comic.description && <p>{comic.description}</p>}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Favorites;
