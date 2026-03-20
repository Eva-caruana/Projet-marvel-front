import "./CharacterComics.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillLightningFill } from "react-icons/bs";

const CharacterComics = () => {
  const { id } = useParams();

  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //On met la fonction dans une variable

  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);

        // console.log("ici le logggg=>", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main className="characters-comics-page">
      <div className="container">
        {/* ICI ADAPTER LE NOM DU PERSONNAGE ?*/}
        <h1>Comics du personnage</h1>
        <section>
          {/* Si le personnage n'a pas de comics retourner un message d'erreur  */}
          {data.length === 0 ? (
            <div className="empty-library">
              <p>Aucun comics displonible pour ce personnage</p>{" "}
            </div>
          ) : (
            data.comics.map((comic) => {
              return (
                <article className="comic-article" key={comic._id}>
                  {/* //si l'article n'a pas d'image on ne l'affiche pas . ????? */}
                  <img
                    className="comic-img"
                    src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <div className="comic-info">
                    <h2>
                      {comic.title}{" "}
                      {/* <BsFillLightningFill
                        className="lightning"
                        onClick={() => {
                          className = "added-to-fav";
                        }}
                      />{" "} */}
                    </h2>

                    {/*gerer erreur description*/}
                    {/* Gerer longeur description */}
                    {comic.description && <p>{comic.description}</p>}
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </main>
  );
};

export default CharacterComics;
