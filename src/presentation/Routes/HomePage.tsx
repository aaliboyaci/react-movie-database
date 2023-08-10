import React from "react";
import "./HomePage.css";
import RandomMovie from "../Components/RandomMovie";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <RandomMovie />
    </div>
  );
};

export default HomePage;
