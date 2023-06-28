import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/actions';


const Details = () => {
  const { showId } = useParams();
  const [movie, setMovie] = useState(null);

  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${showId}?api_key=6ef10486c5df46ca61884c8b042d53bd`);
        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [showId, dispatch]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const isMovieFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);

  const handleFavoriteClick = () => {
    if (isMovieFavorite) {
      dispatch(removeFavoriteMovie(movie.id));
    } else {
      dispatch(addFavoriteMovie(movie));
    }
  };

  return (
    <div className="movie-details">
      <div className="movie-info">
        <h2 className="movie-title-big">{movie.original_title}</h2>
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.original_title}
        />
        <p className="genres">
          <span className="genres-label"><b>Genre(s):</b></span>
          {movie.genres.map((genre, i) => (
            <span key={i} className="genre">{genre.name}</span>
          ))}
        </p>
        <p className="release-date"><b>Release Date:</b> {movie.release_date}</p>
        <div className="overview">
          <b>Overview:</b>
          <div className="movie-text">{movie.overview}</div>
        </div>
        <p className="budget"><b>Budget: </b>$ {movie.budget}</p>
        <button onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default Details;
