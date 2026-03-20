import "./Comics.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Comics = () => {
  //on declare des states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //On met la fonction dans une variable

  //Use effect pour eviter que la requette tourne en boucle
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/`);
        // console.log("ici le log =>>>", response.data.results);
        setData(response.data);
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
                  <h2>{comic.title}</h2>
                  {/*gerer erreur description*/}
                  {comic.description && <p>{comic.description}</p>}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Comics;
