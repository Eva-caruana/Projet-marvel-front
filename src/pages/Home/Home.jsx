import "./Home.css";
import picture from "../../assets/img/marvel-homee.jpg";

const Home = () => {
  return (
    <main className="home-section">
      <div className="home-hero">
        <img className="home-img" src={picture} alt="hero picture" />
        <div className="home-overlay">
          <div className="home-content">
            <h1 className="home-title">MARVEL UNIVERSE</h1>
            <p className="home-subtitle">
              Explore les personnages et comics de l'univers Marvel
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
