import "./CharacterComics.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoHeart } from "react-icons/io5";

const CharacterComics = ({ favoriteComics, toggleFavoriteComic }) => {
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
                  <div className="comic-info">
                    <h2>{comic.title} </h2>

                    {/* Gerer longeur description */}
                    {comic.description && (
                      <p>{comic.description.slice(0, 40) + "..."}</p>
                    )}
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
