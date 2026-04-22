import "./Card.css";
import Modal from "../Modal/Modal";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useState } from "react";
import { IoHeart } from "react-icons/io5";

const ComicCard = ({ comic, favoriteComics, toggleFavoriteComic }) => {
  const isFavorite = favoriteComics.find((item) => item._id === comic._id);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <article className="card-article" key={comic._id}>
        <div className="picture-heart-btn">
          <img
            className="card-img"
            src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          {/* bouton favoris */}
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => toggleFavoriteComic(comic)}
          />
        </div>
        <div className="card-info">
          <h3>{comic.title.slice(0, 30) + "..."}</h3>

          {comic.description && (
            <>
              <p className="card-description">
                {comic.description.slice(0, 80) + "..."}
              </p>
              <button
                className="card-see-moore-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                Lire la suite
              </button>
            </>
          )}
        </div>
      </article>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img
            src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <h3>{comic.title}</h3>
          <p>{comic.description}</p>
        </Modal>
      )}
    </>
  );
};

export default ComicCard;
