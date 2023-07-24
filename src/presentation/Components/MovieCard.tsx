import React from 'react';
import { Link } from 'react-router-dom';
import { posterBaseUrl } from '../../data-access/apiPaths';
import { DETAILS } from '../Routes/routes';
import { Movie } from '../../application/Types/MovieTypes';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`${DETAILS}${movie.id}`} className="movie-link">
      <img
        src={`${posterBaseUrl}${movie.posterPath}`}
        alt={movie.title}
        className="movie-poster"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = 'src/assets/404-error.png';
        }}
      />
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <p className="movie-year">{movie.releaseDate?.substring(0, 4)}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
