import React from "react";
import { Link } from "react-router-dom";
import "../../Routes/Search/SearchPage.css";
import { DETAILS } from "../routes";
import { posterBaseUrl } from "../../../data-access/apiPaths";
import { SearchMovieType } from "../../../application/Types/SearchMovieTypes";

export interface MovieListProps {
  movies: SearchMovieType[] | null;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies?.length === 0) {
    return <div className="movie-item">No movies found.</div>;
  }
  console.log(movies);

  return (
    <ul className="movie-list">
      {movies?.map((movie) => (
        <li key={movie.id} className="movie-item">
          <Link to={`${DETAILS}${movie.id}`} className="movie-link">
            <img
              src={`${posterBaseUrl}${movie?.poster}`}
              alt={movie?.name}
              className="movie-poster"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "src/presentation/assets/404-error.png";
              }}
            />
            <div className="movie-info">
              <div className="movie-title">{movie.name}</div>
              <p className="movie-year">{movie?.releaseDate.substring(0, 4)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
