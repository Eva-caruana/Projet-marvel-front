import "./Comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillLightningFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Comics = ({ title, setTitle }) => {
  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        let filter = "?limit=100&page" + page;
        if (title) {
          filter += "?title=" + title;
        }

        const response = await axios.get(
          `http://localhost:3000/comics/` + filter,
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
            return (
              <article className="comic-article" key={comic._id}>
                {/* //si l'article n'a pas d'image on ne l'affiche pas . ????? */}
                <img
                  className="comic-img"
                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                  alt={comic.name}
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
                  {comic.description && (
                    <p>{comic.description.slice(0, 100) + "..."}</p>
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

export default Comics;
