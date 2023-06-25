import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './HomePage.css';

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
    <div>
    <h2>Name: {movie.original_title}</h2>
    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
    
    <p>Release Date: {movie.release_date}</p>
    <p>Overview: {movie.overview}</p>
  </div>
  </>
  );
};

export default Details;
