import "./FavoriteButton.css";
import { IoHeart } from "react-icons/io5";

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <div className="favorites-heart">
      <IoHeart
        className={isFavorite ? "heart-icon-active" : "heart-icon"}
        onClick={(event) => {
          event.preventDefault();
          //Eviter de rediriger la page qd on clique sur le coeur a cause du link
          event.stopPropagation();
          onClick();
        }}
      />
    </div>
  );
};

export default FavoriteButton;
