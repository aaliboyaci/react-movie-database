import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Details.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/actions';
import Loading from '../Components/Loading';
import useDetailsFetch from '../Services/useDetailsFetch';
import { Movie, CrewMember, CastMember } from "../Services/detailsTypes"
import { setGenreTitle } from '../store/actions';
import { PERSON, SEARCHBYID } from "./routes"
import { posterBaseUrl } from '../Services/tmdbApiServices';
import MovieTrailers from '../Services/movieTrailer';


const Details = () => {
  const { showId } = useParams<{ showId: string | undefined }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<any | null>(null);
  const [director, setDirector] = useState<CrewMember | null>(null);
  const [mainCast, setMainCast] = useState<CastMember[] | null>(null);
  const favoriteMovies = useSelector((state: any) => state.favoriteMovies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useDetailsFetch({ showId, setMovie, setMainCast, setDirector, setCredits, dispatch })

  if (!movie) { return (<Loading />); }
  if (isLoading) { return (<Loading />); }

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
    navigate(`${SEARCHBYID}${genreId}`);
  };

  return (
    <div className="movie-details">
      <div className="movie-info">
        <h2 className="movie-title-big">{movie.original_title}</h2>
        <img
          className="moviePoster"
          src={`${posterBaseUrl}${movie.poster_path}`}
          alt={movie.original_title}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = 'src/assets/404-error.png';
          }}
        />
        <button className={`${isMovieFavorite ? 'favorited' : 'notfavorited'}`} onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <span className="genres-label"><b>Genre(s):</b></span>
        <div className="genres">
          {movie.genres.map((genre, i) => (
            <span key={i} className="genre" onClick={() => handleGenreClick(genre.id, genre.name)}>{genre.name}</span>
          ))}
        </div>
        <p className="release-date"><b>Release Date:</b> {movie.release_date}</p>
        <div className="overview">
          <b>Overview:</b>
          <div className="movie-text">{movie.overview}</div>
        </div>
        <MovieTrailers movieId={movie.id} />
        <p style={{ color: movie.status === 'Released' ? '#04d134' : 'red' }}>
          <b>Status: </b>{movie.status}</p>
        <p className="vote-average"><b>Vote Average: </b>{movie.vote_average}</p>
        <p className="vote-count"><b>Vote Count: </b>{movie.vote_count}</p>
        <button className={`${isMovieFavorite ? 'favorited' : 'notfavorited'}`} onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <hr className='line'></hr>
        <div className="movie-cast">

          <h3 className="cast-title">Cast:</h3>
          {director && <><p><b>Director:</b></p> <Link to={`${PERSON}${director.id}`} className="movie-link">{director.name}</Link></>}
          <p><b>Main Cast:</b></p>
          <ul className="cast-list">
            {credits && mainCast?.map((person: CastMember) => (
              <li key={person.id}>
                <Link to={`${PERSON}${person.id}`} className="movie-link">{person.name}
                </Link>
              </li>
            ))}
          </ul>
          <br></br>
          <hr className='line'></hr>
          <p className="budget"><b>Budget: </b>$ {movie.budget}</p>

        </div>
      </div>
    </div>
  );
};

export default Details;
