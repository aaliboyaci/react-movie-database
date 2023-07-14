import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SearchPage.css";
import Loading from "../Components/Loading";
import { Trend, trendingFetch } from '../Services/trendingFetch';
import { posterBaseUrl } from '../Services/tmdbApiServices';
import { DETAILS } from './routes';


const Trending: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Trend[]>([]);
  const { isLoading, error } = trendingFetch(setTrendingMovies)

  if (isLoading) { return <Loading />; }
  if (error) { return <p>Error: {error}</p>; }

  return (
    <div id="search-container">
      <h2>Trending Movies</h2>
      {trendingMovies.length === 0 ? (
        <p>No movies found.</p>) : (
        <ul className="movie-list">
          {trendingMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`${DETAILS}${movie.id}`} className="movie-link">
                <img
                  src={`${posterBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = 'src/assets/404-error.png';
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
  );
};

export default Trending;
