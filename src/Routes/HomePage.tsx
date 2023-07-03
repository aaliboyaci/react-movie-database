import React from 'react';
import './HomePage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dice from "../assets/dice.png"


const HomePage: React.FC = () => {

  const [randomMovie, setRandomMovie] = useState<any>(null);

  const fetchRandomMovie = async () => {
    try {
      const randomPage = Math.floor(Math.random() * 40) + 1;
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=6ef10486c5df46ca61884c8b042d53bd&sort_by=popularity.desc&page=${randomPage}`
      );
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      setRandomMovie(randomMovie);
    } catch (error) {
      console.error('Error fetching random movie:', error);
    }
  };

  useEffect(() => {
    if (!randomMovie) {
      fetchRandomMovie();
    }
  }, []);

  const handleRandomButtonClick: () => void = () => {
    fetchRandomMovie();
  };
  
  return (
    <div className="home-container">
      <div className="card">
        <div className="header">
          <h2>Random Movie Generator</h2>
          <img src={dice} alt="random" className="dice"></img>
        </div>
        <div className="content">
          {randomMovie && (<>
            <Link to={`/Details/${randomMovie.id}`} className="movie-link">
              <img src={`https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`} alt="Random Movie" />
              <h3 className="random-title">{randomMovie.title}</h3>
              <p className="random-year">{randomMovie.release_date.substring(0, 4)}</p>
            </Link>
          </>)}
        </div>
        <button className='random-btn' onClick={handleRandomButtonClick}> Surprise Me !</button>
      </div>

    </div>
  );
}


export default HomePage;