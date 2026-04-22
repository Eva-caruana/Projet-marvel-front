import "./Comics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoHeart } from "react-icons/io5";

import ComicCard from "../../components/Card/ComicCard";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Pagination/Pagination";

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
            );
            return (
              <ComicCard
                key={comic._id}
                comic={comic}
                favoriteComics={favoriteComics}
                toggleFavoriteComic={toggleFavoriteComic}
              />
            );
            {
              showModal && (
                <Modal
                  className="modal"
                  comic={comic}
                  onClose={() => setShowModal(false)}
                />
              );
            }
          })}
        </section>

        <Pagination
          data={data}
          count={data.count}
          page={page}
          setPage={setPage}
        />
      </div>
    </main>
  );
};

export default Comics;
