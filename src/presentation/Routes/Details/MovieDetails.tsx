import { useParams, useNavigate, Link } from "react-router-dom";
import "./MovieStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie, removeFavoriteMovie } from "../../../store/actions";
import Loading from "../../Components/Loading";
import { CastMember } from "../../../application/Types/MovieCastDetailsTypes";
import { Movie } from "../../../application/Types/MovieTypes";
import { setGenreTitle } from "../../../store/actions";
import { PERSON, SEARCHBYID } from "../routes";
import { posterBaseUrl } from "../../../data-access/apiPaths";
import MovieTrailers from "./movieTrailer";
import { useMovieDetailsFetch } from "../../../application/FetchActions/movieDetailsFetch";
import { useMovieCastDetailsFetch } from "../../../application/FetchActions/movieCastDetailsFetch";

export const MovieDetailsPage: React.FC = () => {
  const { showId } = useParams<{ showId: string | undefined }>();
  const {
    data: movie,
    isLoading: movieLoad,
    error: movieError,
  } = useMovieDetailsFetch(showId);
  const {
    data: cast,
    isLoading: castLoad,
    error: castError,
  } = useMovieCastDetailsFetch(showId);
  const favoriteMovies = useSelector((state: any) => state.favoriteMovies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (movieLoad) {
    return <Loading />;
  }
  if (movie === null) {
    return <>{movieError}</>;
  }
  if (castLoad) {
    return <Loading />;
  }
  if (cast === null) {
    return <>{castError}</>;
  }
  const isMovieFavorite = favoriteMovies.some(
    (favMovie: Movie) => favMovie.id === movie.id,
  );

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
      <h2 className="movie-title-big">{movie.title}</h2>
      <div className="movie-card">
        <img
          className="moviePoster"
          src={`${posterBaseUrl}${movie.posterPath}`}
          alt={movie.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = "src/assets/404-error.png";
          }}
        />
        <div className="main-infos">
          <div className="overview">
            <b>Overview:</b>
            <p className="movie-text">{movie.overview}</p>
          </div>

          <div className="block-1">
            <p className="release-date">
              <b>Release Date:</b> {movie.releaseDate}
            </p>
            <p
              style={{ color: movie.status === "Released" ? "#04d134" : "red" }}
            >
              <b>Status: </b>
              {movie.status}
            </p>
          </div>
          <div className="block-1">
            <p className="vote-average">
              <b>Vote Average: </b>
              {movie.voteAverage}
            </p>
            <p className="vote-count">
              <b>Vote Count: </b>
              {movie.voteCount}
            </p>
          </div>
        </div>
      </div>

      <button
        className={`${isMovieFavorite ? "favorited" : "notfavorited"}`}
        onClick={handleFavoriteClick}
      >
        {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <hr className="line"></hr>
      <div className="infos-second">
        <div className="director">
          {cast.directorName && (
            <>
              <span className="title-label">
                <b>Director:</b>
              </span>{" "}
              <Link to={`${PERSON}${cast.directorID}`} className="movie-link">
                <li className="movie-link">{cast.directorName}</li>
              </Link>
            </>
          )}
        </div>
        <div className="cast">
          <span className="title-label">
            <b>Main Cast:</b>
          </span>
          <ul className="cast-list">
            {cast &&
              cast.mainCast?.map((person: CastMember) => (
                <li key={person.id}>
                  <Link to={`${PERSON}${person.id}`} className="movie-link">
                    {person.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="genres-box">
          <div className="title-label">
            <b>Genre(s):</b>
          </div>
          <div className="genres">
            {movie.genres.map((genre, i) => (
              <span
                key={i}
                className="genre"
                onClick={() => handleGenreClick(genre.id, genre.name)}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="genres-box">
          <div className="title-label">
            <b>Budget: </b> <p>${movie.budget}</p>
          </div>
        </div>
      </div>

      <hr className="line"></hr>

      <MovieTrailers movieId={movie.id} />
    </div>
  );
};
