import React, { useEffect, useState } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { useParams,useNavigate } from 'react-router-dom';
import './Details.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/actions';
import Loading from '../Components/Loading';
import detailsFetch from '../Services/detailsFetch';
import { Movie, CrewMember, CastMember} from "../Services/detailsTypes"
import { setGenreTitle} from '../store/actions';

const Details = () => {
  const { showId } = useParams<{ showId: string |undefined }>();
  const [movie, setMovie] = useState<Movie| null>(null);
  const [credits, setCredits] = useState<any | null>(null);
  const [director, setDirector] = useState<CrewMember | null>(null);
  const [mainCast, setMainCast] = useState<CastMember[] | null>(null);
  const favoriteMovies = useSelector((state: any) => state.favoriteMovies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = detailsFetch({showId, setMovie, setMainCast, setDirector, setCredits, dispatch})

  if (!movie) {return (<Loading/>);}
  if (isLoading) {return (<Loading/>);}

  const isMovieFavorite = favoriteMovies.some((favMovie: Movie) => favMovie.id === movie.id);

  const handleFavoriteClick = () => {
    if (isMovieFavorite) {
      dispatch(removeFavoriteMovie(movie.id));
    } else {
      dispatch(addFavoriteMovie(movie));
    }
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    dispatch(setGenreTitle(genreName));
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
            <span key={i} className="genre" onClick={() => handleGenreClick(genre.id, genre.name)}>{genre.name}</span>
          ))}
        </div>
        <p className="release-date"><b>Release Date:</b> {movie.release_date}</p>
        <div className="overview">
          <b>Overview:</b>
          <div className="movie-text">{movie.overview}</div>
        </div>
        <p style={{ color: movie.status === 'Released' ? '#04d134' : 'red' }}>
        <b>Status: </b>{movie.status}</p>
        <p className="vote-average"><b>Vote Average: </b>{movie.vote_average}</p>
        <p className="vote-count"><b>Vote Count: </b>{movie.vote_count}</p>
        <button className={`${isMovieFavorite ? 'favorited' : 'notfavorited'}`} onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <hr></hr>
        <div className="movie-cast">

        
          <h3 className="cast-title">Cast:</h3>
          {director && <p><b>Director:</b> <Link to={`/PersonPage/${director.id}`} className="movie-link">{director.name}</Link></p>}
          <p><b>Main Cast:</b></p>
          <ul className="cast-list">
            {credits && mainCast?.map((person: CastMember) => (
              <li key={person.id}>
                <Link to={`/PersonPage/${person.id}`} className="movie-link"><p>{person.name}</p>
                </Link>

          <h3 className="cast-title">Cast:</h3>
          {director && <p><b>Director:</b> {director.name}</p>}
          <p><b>Main Cast:</b></p>
          <ul className="cast-list">
            {credits && mainCast?.map((person: CastMember) => (
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
