import "./Home.css";
import picture from "../../assets/img/marvel-homee.jpg";

const Home = () => {
  return (
    <main className="home-section">
      <div>
        <img className="home-img" src={picture} alt="hero picture" />
      </div>
    </main>
  );
};

export default Home;
