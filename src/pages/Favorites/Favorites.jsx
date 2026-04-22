import "./Favorites.css";

import { IoHeart } from "react-icons/io5";
import Modal from "../../components/Modal/Modal";
import CharacterCard from "../../components/Card/CharacterCard";
import ComicCard from "../../components/Card/ComicCard";

const Favorites = ({
  comic,
  character,
  favoriteCharacters,
  favoriteComics,
  toggleFavoriteComic,
  toggleFavoriteCharacter,
}) => {
  // Si aucun favori (ni personnage ni comic)
  if (favoriteCharacters.length === 0 && favoriteComics.length === 0) {
    return (
      <main className="empty-favorites-page">
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
        <div>
          <h1>Mes favoris</h1>
        </div>
        {/* CHARACTERS */}
        {/* Si pas de personnage favori ne paas afficher la section*/}
        {favoriteCharacters.length > 0 && (
          <section className="favorites-characters-section">
            <div>
              <h2>Personnages </h2>
            </div>

            <div className="favorites-bloc">
              {favoriteCharacters.map((character) => {
                //verifier si le comic est deja en favori pour gerer l'affichage
                const isFavorite = favoriteCharacters.find(
                  (item) => item._id === character._id,
                  // console.log(comic),
                );
                return (
                  <CharacterCard
                    key={character._id}
                    character={character}
                    favoriteCharacters={favoriteCharacters}
                    toggleFavoriteCharacter={toggleFavoriteCharacter}
                  />
                );

                {
                  showModal && (
                    <Modal
                      className="modal"
                      character={character}
                      onClose={() => setShowModal(false)}
                    />
                  );
                }
              })}
            </div>
          </section>
        )}

        {/* COMICS */}
        {favoriteComics.length > 0 && (
          <section className="favorites-comics-section">
            <h2>Comics </h2>

            <div className="favorites-bloc">
              {favoriteComics.map((comic) => {
                //verifier si le comic est deja en favori pour gerer l'affichage
                const isFavorite = favoriteComics.find(
                  (item) => item._id === comic._id,
                  // console.log(comic),
                );
                return (
                  <ComicCard
                    key={comic._id}
                    comic={comic}
                    favoriteComics={favoriteComics}
                    toggleFavoriteComic={toggleFavoriteComic}
                  />
                );
                {
                  showModal && (
                    <Modal
                      className="modal"
                      comic={comic}
                      onClose={() => setShowModal(false)}
                    />
                  );
                }
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Favorites;
