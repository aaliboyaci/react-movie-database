import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/actions';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const { showId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const navigate = useNavigate();
  const [director, setDirector] = useState(null);
  const [mainCast, setMainCast] = useState(null);

  const dispatch = useDispatch();
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const myapikey = `6ef10486c5df46ca61884c8b042d53bd`
  const castUrl = `https://api.themoviedb.org/3/movie/${showId}/credits?api_key=${myapikey}`;
  const showUrl = `https://api.themoviedb.org/3/movie/${showId}?api_key=${myapikey}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(showUrl);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const castResponse = await fetch(castUrl);
        const castData = await castResponse.json();
        setCredits(castData);
        setDirector(castData.crew.find((person) => person.job === 'Director' && person.department === 'Directing'));
        setMainCast(castData.cast.slice(0, 3));
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

  const handleGenreClick = (genreId) => {
    navigate(`/search?genreid=${genreId}`);
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
        <div className="genres">
          <span className="genres-label"><b>Genre(s):</b></span>
          {movie.genres.map((genre, i) => (
            <span key={i} className="genre" onClick={() => handleGenreClick(genre.id)}>{genre.name}</span>
          ))}
        </div>
        <p className="release-date"><b>Release Date:</b> {movie.release_date}</p>
        <div className="overview">
          <b>Overview:</b>
          <div className="movie-text">{movie.overview}</div>
        </div>
        <p className="status"><b>Status: </b>{movie.status}</p>
        <p className="vote-average"><b>Vote Average: </b>{movie.vote_average}</p>
        <p className="vote-count"><b>Vote Count: </b>{movie.vote_count}</p>
        <button className={`favorite-button ${isMovieFavorite ? 'favorited' : ''}`} onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      <hr></hr>
      <div className="movie-cast">
        <h3 className="cast-title">Cast:</h3>
        {director && <p><b>Director:</b> {director.name}</p>}
        <p><b>Main Cast:</b></p>
        <ul className="cast-list">
          {credits && mainCast.map((person) => (
            <li key={person.id}><p>{person.name}</p></li>
          ))}
        </ul>
        <hr></hr>
        <p className="budget"><b>Budget: </b>$ {movie.budget}</p>
     
        </div>
      </div>
      </div>
  );
};

export default Details;
