import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./SearchPage.css";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genreid');
  const query = new URLSearchParams(location.search).get('query');
  const [page, setPage] = useState(1);
  const apiKey = `6ef10486c5df46ca61884c8b042d53bd`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
  const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
 

  const fetchUrl = genreId ? genreUrl : searchUrl;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

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
                  onError={(e) => {
                    e.target.src = 'src/assets/404-error.png';
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
      )}
      {console.log(page)}
      {page > 1 ? (<>
      <button onClick={()=>(setPage(page -1))}>prev page</button> 
      <button onClick={()=>(setPage(page +1))}>next page</button></>):(<button onClick={()=>(setPage(page +1))}>next page</button>)}
    </div>
  );
};

export default SearchPage;
