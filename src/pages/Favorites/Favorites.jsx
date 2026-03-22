import "./Favorites.css";

const Favorites = ({ favoriteCharacters, favoriteComics }) => {
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
              <h2>Personnages favoris</h2>
            </div>

            <div className="favorites-bloc">
              {favoriteCharacters.map((character) => {
                return (
                  <article className="character-article" key={character._id}>
                    <img
                      className="character-img"
                      src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
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
