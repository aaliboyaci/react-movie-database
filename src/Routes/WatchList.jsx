import React from 'react';
import { useSelector } from 'react-redux';
import './watchList.css';

export default function WatchList() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  return (
    <div className="fav-container">
    <h2>Watch List</h2>
    {favoriteMovies.length === 0 ? (
      <p>No movies in your watch list.</p>
    ) : (
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id} className="fav-movie">
            <div className="fav-left">
              <div className="fav-image">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              </div>
              <div className="fav-year">
                <h4>{movie.release_date}</h4>
              </div>
            </div>
            <div className="fav-right">
              <h3>{movie.title}</h3>
              <p>{movie.overview.slice(0, 150)}...</p>
            </div>
          </li>
        ))}
      </ul>
    )}
    <button className="empty-button">Empty</button>
  </div>
  

  );
}
