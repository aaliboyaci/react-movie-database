import React, { useEffect, useState } from 'react';
import '../Routes/HomePage.css';
import "./randomMovie.css";
import { Link } from 'react-router-dom';
import diceImg from '../assets/dice.png';
// import useRandomMovieFetch from '../../application/Services/randomMovieFetch';
import { posterBaseUrl } from '../../application/Services/tmdbApiServices';
import { DETAILS } from '../Routes/routes';
import Movie from '../../application/Services/Movie';
import { useRandomMovieFetch } from '../../application/FetchActions/randomMovieFetch';
import Loading from './Loading';




const RandomMovie: React.FC = () => {
  const [dice,setDice] = useState(1);
  const { data: movie, isLoading, error: movieError } = useRandomMovieFetch(dice);

  if(isLoading){<Loading/>}
  return (

    <div className="card">
      <div className="header">
        <h2>Random Movie Generator</h2>
        <img src={diceImg} alt="random" className="dice" />
      </div>
      <div className="content">
        {movie ?  (
          <>
            <Link to={`${DETAILS}${movie.id}`} className="movie-link">
              <img src={`${posterBaseUrl}${movie.posterPath}`} alt="Random Movie" />
              <h3 className="random-title">{movie.name}</h3>
              <p className="random-year">{movie.releaseDate.substring(0, 4)}</p>
            </Link>
          </>
        ) : (
          movieError
        )}
      </div>
      <button className="random-btn" onClick={()=>setDice(dice+1)}>
        Surprise Me!
      </button>
    </div>


  );
};

export default RandomMovie;