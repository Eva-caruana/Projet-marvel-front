import "./Home.css";
import picture from "../../assets/img/marvel-home.jpg";

const Home = () => {
  return (
    <main className="home-section">
      <img src={picture} alt="hero picture" />
    </main>
  );
};

export default Home;
