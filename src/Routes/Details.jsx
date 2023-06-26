import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const [movie, setMovie] = useState(null);
  const { showId } = useParams();

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
  }, [showId]);

  if (!movie) {
    return <p>Loading...</p>;
  }
  console.log(movie);
  return (<>
    <div className="movie-details">
      <div className="movie-info">
        <h2 className="movie-title">{movie.original_title}</h2>
        <img
          className="movie-poster"
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
          <p>{movie.overview}</p>
        </div>
        <p className="budget"><b>Budget: </b>$ {movie.budget}</p>
      </div>
    </div>
  </>
  
  );
};

export default Details;
