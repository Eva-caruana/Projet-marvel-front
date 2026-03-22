import "./Characters.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { IoHeart } from "react-icons/io5";

const Characters = ({
  name,
  setName,
  favoriteCharacters,
  toggleFavoriteCharacter,
}) => {
  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        let filter = "?limit=100&page=" + page;
        if (name) {
          filter += "&name=" + name;
        }

        const response = await axios.get(
          `http://localhost:3000/characters/` + filter,
        );

        // console.log("ici le log =>>>", response.data.count);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, page]);

  //on calcule pour la pagination le nombre de pages totales a afficher on arrondi au dessus

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main className="characters-page">
      <div className="container">
        <div className="search-section">
          <h1>Personnages</h1>
        </div>

        <section>
          {data.results.map((character) => {
            //verifier si le personnage est deja en favori pour gerer l'affichage
            const isFavorite = favoriteCharacters.find(
              (item) => item._id === character._id,
            );

            return (
              //   console.log("ici le log =>>>", data.results);
              //on redirige la page au clics sur les comics du personnage

              <Link
                className="character-link"
                to={`/comics/${character._id}`}
                key={character._id}
              >
                <article className="character-article">
                  <div className="picture-heart-btn">
                    <img
                      className="character-img"
                      src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                    <div className="favorites-heart">
                      <IoHeart
                        className={
                          isFavorite ? "heart-icon-active" : "heart-icon"
                        }
                        onClick={(event) => {
                          event.preventDefault();
                          //Eviter de rediriger la page qd on clique sur le coeur a cause du link
                          event.stopPropagation();
                          //ajoute ou retire un personnage des favoris
                          toggleFavoriteCharacter(character);
                          console.log("ajout favori");
                        }}
                      />
                    </div>
                  </div>
                  <div className="character-info">
                    <div className="name">
                      <h2>{character.name}</h2>
                    </div>
                    <div className="characters-description">
                      {character.description && (
                        <p>{character.description.slice(0, 100) + "..."}</p>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
        <div className="pagination">
          <div className="prev-button">
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              disabled={page === 1}
            >
              Precedent
            </button>
          </div>
          <div>
            <span>
              {/* page sur le nombre total de pages arrondi au dessus */}
              {page} sur {Math.ceil(data.count / 100)}
            </span>
          </div>
          <div className="next-button">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page === Math.ceil(data.count / 100)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Characters;
