import "./CharacterComics.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoHeart } from "react-icons/io5";

import ComicCard from "../../components/Card/ComicCard";

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
        const response = await axios.get(
          `https://site--projet-marvel-backend--9hvs4qlf9c87.code.run/comics/${id}`,
        );

        // console.log("ici le logggg=>", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
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
          {data.comics.length === 0 ? (
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
                <ComicCard
                  key={comic._id}
                  comic={comic}
                  favoriteComics={favoriteComics}
                  toggleFavoriteComic={toggleFavoriteComic}
                />
              );
            })
          )}
        </section>
      </div>
    </main>
  );
};

export default CharacterComics;
