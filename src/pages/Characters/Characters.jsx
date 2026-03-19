import "./Characters.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Characters = () => {
  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //On met la fonction dans une variable

  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/characters/`);
        // console.log("ici le log =>>>", response.data.results);
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main className="characters-page">
      <div className="container">
        <h1>Personnages</h1>
        <section>
          {data.map((character) => {
            return (
              //   console.log("ici le log =>>>", data.results);

              //on redirige la page au clics sur les comics du personnage
              <Link className="character-link" to={`/comics/${character._id}`}>
                <article className="character-article" key={character._id}>
                  {/* //si l'article n'a pas d'image on ne l'affiche pas . ????? */}
                  <img
                    className="character-img"
                    src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <div className="character-info">
                    <h2>{character.name}</h2>
                    {/*gerer erreur description*/}
                    <p>{character.description}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Characters;
