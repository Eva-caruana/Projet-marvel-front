import "./Favorites.css";
import { IoHeart } from "react-icons/io5";

const Favorites = ({
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
                  <article className="character-article" key={character._id}>
                    <div className="picture-heart-btn">
                      <img
                        className="character-img"
                        src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      {/* bouton favoris */}
                      <div className="favorites-heart">
                        <IoHeart
                          className={
                            isFavorite ? "heart-icon-active" : "heart-icon"
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            //Eviter de rediriger la page qd on clique sur le coeur a cause du link
                            event.stopPropagation();
                            //ajoute ou retire un comic des favoris
                            toggleFavoriteCharacter(character);
                            console.log("ajout favori");
                          }}
                        />
                      </div>
                    </div>
                    <h3>{character.name}</h3>
                    {character.description && (
                      <p className="favorites-description">
                        {character.description.slice(0, 80)}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
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
                  <article className="comic-article" key={comic._id}>
                    <div className="picture-heart-btn">
                      <img
                        className="comic-img"
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                      {/* bouton favoris */}
                      <div className="favorites-heart">
                        <IoHeart
                          className={
                            isFavorite ? "heart-icon-active" : "heart-icon"
                          }
                          onClick={(event) => {
                            event.preventDefault();
                            //Eviter de rediriger la page qd on clique sur le coeur a cause du link
                            event.stopPropagation();
                            //ajoute ou retire un comic des favoris
                            toggleFavoriteComic(comic);
                            console.log("ajout favori");
                          }}
                        />
                      </div>
                    </div>
                    <h3>{comic.title}</h3>
                    {comic.description && (
                      <p className="favorites-description">
                        {comic.description.slice(0, 80)}
                      </p>
                    )}
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
