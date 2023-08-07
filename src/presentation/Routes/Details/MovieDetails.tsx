import { useParams, useNavigate, Link } from 'react-router-dom';
import './MovieDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../../../store/actions';
import Loading from '../../Components/Loading';
import { CastMember } from "../../../application/Types/MovieCastDetailsTypes";
import { Movie } from "../../../application/Types/MovieTypes";
import { setGenreTitle } from '../../../store/actions';
import { PERSON, SEARCHBYID } from "../routes";
import { posterBaseUrl } from '../../../data-access/apiPaths';
import MovieTrailers from './movieTrailer';
import { useMovieDetailsFetch } from '../../../application/FetchActions/movieDetailsFetch';
import { useMovieCastDetailsFetch } from '../../../application/FetchActions/movieCastDetailsFetch';



export  const MovieDetailsPage: React.FC = () => {
  const { showId } = useParams<{ showId: string | undefined }>();
  const { data: movie, isLoading: movieLoad, error: movieError } = useMovieDetailsFetch(showId);
  const { data: cast, isLoading: castLoad, error: castError } = useMovieCastDetailsFetch(showId);
  const favoriteMovies = useSelector((state: any) => state.favoriteMovies);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  if (movieLoad) { return <Loading />; }
  if (movie === null) { return <>{ movieError }</> }
  if (castLoad) { return <Loading />; }
  if (cast === null) { return <>{ castError }</> }
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
        <h2 className="movie-title-big">{movie.title}</h2>
        <img
          className="moviePoster"
          src={`${posterBaseUrl}${movie.posterPath}`}
          alt={movie.title}
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
        <p className="release-date"><b>Release Date:</b> {movie.releaseDate}</p>
        <div className="overview">
          <b>Overview:</b>
          <div className="movie-text">{movie.overview}</div>
        </div>

        <p style={{ color: movie.status === 'Released' ? '#04d134' : 'red' }}>
          <b>Status: </b>{movie.status}</p>
        <p className="vote-average"><b>Vote Average: </b>{movie.voteAverage}</p>
        <p className="vote-count"><b>Vote Count: </b>{movie.voteCount}</p>
        <button className={`${isMovieFavorite ? 'favorited' : 'notfavorited'}`} onClick={handleFavoriteClick}>
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <hr className='line'></hr>
        <div className="movie-cast">

          <h2 className="cast-title">Cast</h2>
          {cast.directorName && <><p><b>Director:</b></p> <Link to={`${PERSON}${cast.directorID}`} className="movie-link">{cast.directorName}</Link></>}
          <p><b>Main Cast:</b></p>
          <ul className="cast-list">
            {cast && cast.mainCast?.map((person: CastMember) => (
              <li key={person.id}>
                <Link to={`${PERSON}${person.id}`} className="movie-link">{person.name}
                </Link>
              </li>
            ))}
          </ul>
          <br></br>
          <hr className='line'></hr>
          <p className="budget"><b>Budget: </b>$ {movie.budget}</p>
          <MovieTrailers movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

