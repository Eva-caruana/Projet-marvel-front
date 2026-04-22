import "./Card.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import Modal from "../Modal/Modal";

const CharacterCard = ({
  character,
  favoriteCharacters,
  toggleFavoriteCharacter,
}) => {
  const isFavorite = favoriteCharacters.find(
    (item) => item._id === character._id,
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Link className="character-link" to={`/comics/${character._id}`}>
        <article className="card-article">
          <div className="picture-heart-btn">
            <img
              className="card-img"
              src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <div className="favorites-heart">
              <IoHeart
                className={isFavorite ? "heart-icon-active" : "heart-icon"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  toggleFavoriteCharacter(character);
                }}
              />
            </div>
          </div>
          <div className="card-info">
            <h3>{character.name}</h3>

            {character.description && (
              <>
                <p className="card-description">
                  {character.description.slice(0, 100) + "..."}
                </p>
                <button
                  className="card-see-moore-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  Voir plus
                </button>
              </>
            )}
          </div>
        </article>
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img
            src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <h2>{character.name}</h2>
          <p>{character.description}</p>
        </Modal>
      )}
    </>
  );
};

export default CharacterCard;
