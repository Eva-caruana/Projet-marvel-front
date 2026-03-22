import "./Comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoHeart } from "react-icons/io5";
// import img from "../../assets/img/img-notfound.jpg";
const Comics = ({ title, favoriteComics, toggleFavoriteComic }) => {
  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        let filter = "?limit=100&page=" + page;
        if (title) {
          filter += "&title=" + title;
        }

        const response = await axios.get(
          "https://site--projet-marvel-backend--9hvs4qlf9c87.code.run/comics" +
            filter,
        );
        // console.log("ici le log =>>>", response.data.results);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, page]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main className="comics-page">
      <div className="container">
        <h1>Comics</h1>
        <section>
          {data.results.map((comic) => {
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
                  <h2> {comic.title.slice(0, 20) + "..."}</h2>
                  {/*gerer erreur description*/}
                  {comic.description && (
                    <p className="comics-description">
                      {comic.description.slice(0, 80) + "..."}
                    </p>
                  )}
                </div>
              </article>
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

export default Comics;
