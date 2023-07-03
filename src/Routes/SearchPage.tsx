import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./SearchPage.css";
import useFetch from "../Hooks/useFetch";
import Loading from "../Components/Loading"


interface Movie {
  id: number;
  name: string;
  title: string;
  release_date: string;
  poster_path: string;
}

const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genreid');
  const query = new URLSearchParams(location.search).get('query');
  const [page, setPage] = useState(1);
  const apiKey = `6ef10486c5df46ca61884c8b042d53bd`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
  const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;


  const fetchUrl: string = genreId ? genreUrl : searchUrl;

  const { isLoading, data, error }: any = useFetch(fetchUrl);
  console.log("data");
  console.log(data);


  useEffect(() => {
    if (!isLoading && data !== null && data.length !== 0) {
      setMovies(data);
    }

    else if (data == null || data.length == 0) { /* customHook sonrası bugı düzelten kod */
      setMovies([]);
    }
  }, [isLoading, data]);



  if (isLoading) {

    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div id="search-container">
      <h2>Search Results</h2>
      {movies.length === 0 ? (

        <div className="movie-item">No movies found.</div>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <Link to={`/Details/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
      )}

      {movies.length > 0 ?
        (page > 1 ? (<>
          <button onClick={() => (setPage(page - 1))}>prev page</button>
          <button onClick={() => (setPage(page + 1))}>next page</button></>) : (<button onClick={() => (setPage(page + 1))}>next page</button>))
        : (<p></p>)
      }
    </div>
  );
};

export default SearchPage;
