import "./Characters.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../../components/Card/CharacterCard";
import Modal from "../../components/Modal/Modal";
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
          "https://site--projet-marvel-backend--9hvs4qlf9c87.code.run/characters" +
            filter,
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
              //on redirige la page au clics sur les comics du personnage

              <CharacterCard
                key={character._id}
                character={character}
                favoriteCharacters={favoriteCharacters}
                toggleFavoriteCharacter={toggleFavoriteCharacter}
              />
            );

            //Modal zoom sur personnage
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
