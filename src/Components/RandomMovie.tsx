import React, { useState } from 'react';
import '../Routes/HomePage.css';
import { Link } from 'react-router-dom';
import diceImg from '../assets/dice.png';
import useRandomMovieFetch from '../Services/randomMovieFetch';
import { posterBaseUrl } from '../Services/tmdbApiServices';
import { DETAILS } from '../Routes/routes';


interface Movie {
  id: number;
  name: string;
  title: string;
  release_date: string;
  poster_path: string;
}


const RandomMovie: React.FC = () => {
    const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
    const [dice, setDice] = useState<number>(1);
    useRandomMovieFetch(setRandomMovie, dice);
  
  
    return (
      
        <div className="card">
          <div className="header">
            <h2>Random Movie Generator</h2>
            <img src={diceImg} alt="random" className="dice" />
          </div>
          <div className="content">
            {randomMovie ? (
              <>
                <Link to={`${DETAILS}${randomMovie.id}`} className="movie-link">
                  <img src={`${posterBaseUrl}${randomMovie.poster_path}`} alt="Random Movie" />
                  <h3 className="random-title">{randomMovie.title}</h3>
                  <p className="random-year">{randomMovie.release_date.substring(0, 4)}</p>
                </Link>
              </>
            ) : (
              <p>Error occurred | Please try again</p>
            )}
          </div>
          <button className="random-btn" onClick={() => setDice(dice + 1)}>
            Surprise Me!
          </button>
        </div>
  
      
    );
  };
  
  export default RandomMovie;