import React from 'react';
import { useSelector } from 'react-redux';

export default function WatchList() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  return (
    <div>
      <h2>Watch List</h2>
      {favoriteMovies.length === 0 ? (
        <p>No movies in your watch list.</p>
      ) : (
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
