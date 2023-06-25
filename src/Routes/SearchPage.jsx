import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../App.css";

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
    <div>
      <h2>Search Results</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/Details/${movie.id}`} id="linkItem">{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
