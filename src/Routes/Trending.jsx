import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./SearchPage.css";
import useFetch from "../Hooks/useFetch";
import Loading from "../Components/Loading"

export default function Trending() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = `6ef10486c5df46ca61884c8b042d53bd`;
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  const { isLoading, data, error } = useFetch(url);
  
  useEffect(() => {
    if (!isLoading && data !== null && data.length !== 0) {
      setTrendingMovies(data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="search-container">
      <h2>Trending Movies</h2>
      {trendingMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul className="movie-list">
          {trendingMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`/Details/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e) => {
                    e.target.src = 'src/assets/404-error.png';
                  }}
                />
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <p className="movie-year">{movie.release_date?.substring(0, 4)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}


    </div>
  )
}
