import React from "react";
import "./HomePage.css";
import RandomMovie from "../Components/RandomMovie";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="openingText">
        Explore a vast collection of movies, from classic favorites to the
        latest releases.
      </div>
      <RandomMovie />
    </div>
  );
};

export default HomePage;
