import React from 'react';
import './watchList.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteMovie } from '../store/actions';
import { Link } from 'react-router-dom';

export default function WatchList() {
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const dispatch = useDispatch();

  const handleRemoveClick = (movieId) => {
    dispatch(removeFavoriteMovie(movieId));
  };


  return (
    <div className="fav-container">
      <h2>Watch List</h2>
      {favoriteMovies.length === 0 ? (
        <p>No movies in your watch list.</p>
      ) : (
        <ul>
          {favoriteMovies.map((movie) => (


            <li key={movie.id} className="fav-movie">
              <Link to={`/Details/${movie.id}`} className="fav-link">
                <div className="fav-left">
                  <div className="fav-image">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <div className="fav-year">
                    <h4>{movie.release_date}</h4>
                  </div>
                </div></Link>
              <div className="fav-right">
                <Link to={`/Details/${movie.id}`} className="fav-link">

                  <h3>{movie.title}</h3>
                  <p>{movie.overview.slice(0, 150)}...</p></Link>
                <button className="empty-button" onClick={() => handleRemoveClick(movie.id)}>Remove From Favs</button>
              </div>
            </li>


          ))}
        </ul>
      )}

    </div>

  );
}