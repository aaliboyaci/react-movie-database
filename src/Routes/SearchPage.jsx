import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./SearchPage.css";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=6ef10486c5df46ca61884c8b042d53bd`
        );
        const data = await response.json();
        setMovies(data.results); // API'den alınan sonuçları movies state'ine atıyoruz
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(); // bileşen yüklendiğinde fetchMovies fonksiyonunu çağırıyoruz
  }, [query]);

  return (
    <div id="search-container">
      <h2>Search Results</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`/Details/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">{movie.release_date.substring(0, 4)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
