import React from "react";
import { Link } from "react-router-dom";
import { DETAILS } from "../../Routes/routes";
import  Movie  from "../../Services/Movie";
import { posterBaseUrl } from '../../Services/tmdbApiServices';
import "../../Routes/Search/SearchPage.css";


interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return <div className="movie-item">No movies found.</div>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          <Link to={`${DETAILS}${movie.id}`} className="movie-link">
            <img
              src={`${posterBaseUrl}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = 'src/assets/404-error.png';
              }}
            />
            <div className="movie-info">
              <div className="movie-title">{movie.title}</div>
              <p className="movie-year">{movie.release_date?.substring(0, 4)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
