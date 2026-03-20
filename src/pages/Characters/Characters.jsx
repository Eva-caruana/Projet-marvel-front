import "./Characters.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsLightning } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Characters = ({ name, setName }) => {
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
          filter += "?name=" + name;
        }

        const response = await axios.get(
          `http://localhost:3000/characters/` + filter,
        );
        // console.log("ici le log =>>>", response.data.results);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name, page]);

  // // -----SAUVEGARDER EN FAVORIS
  // //lire les favoris deja enregistrés en local storage

  // const addCharactersToFavorites = (characters) => {
  //   const storedCharacters = localStorage.getItem("favoriteCharacters");
  //   //transformer en tableau, si le stockage contient des favoris on recupere le tableau sinon tableau vide
  //   const parsedCharacters = JSON.parse(storedCharacters) || [];
  //   // verifier si le personnage existe deja
  //   const alreadyExists = parsedCharacters.find((item) => {
  //     //si pas de personnage = undefined
  //     return item._id === character._id;
  //   });

  //   //sinon on l'ajoute
  //   if (!alreadyExists) {
  //     parsedCharacters.push(character);

  //     localStorage.setItem(
  //       "favoriteCharacters",
  //       JSON.stringify(parsedCharacters),
  //     );
  //   }
  // };

  // // sauvegarder dans le local storage

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
            return (
              //   console.log("ici le log =>>>", data.results);

              //on redirige la page au clics sur les comics du personnage
              <Link
                className="character-link"
                to={`/comics/${character._id}`}
                key={character._id}
              >
                <article className="character-article">
                  <div className="picture-favicon">
                    <img
                      className="character-img"
                      src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                    <BsLightning
                      className="lightning"
                      onClick={(event) => {
                        event.preventDefault();
                        //Eviter de rediriger la page qd on clique sur le coeur a cause du link
                        event.stopPropagation();
                        console.log("ajout favori");
                      }}
                    />
                  </div>
                  <div className="character-info">
                    <h2>{character.name}</h2>
                    {character.description && (
                      <p>{character.description.slice(0, 100) + "..."}</p>
                    )}
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
            <span> {page}</span>
          </div>
          <div className="next-button">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page === 15}
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
