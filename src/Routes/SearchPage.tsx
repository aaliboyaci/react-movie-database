import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./SearchPage.css";
import Loading from "../Components/Loading"
import searchMovieFetch from '../Services/searchMovieFetch';
import Movie from "../Services/Movie"
import { useSelector } from 'react-redux';
import { DETAILS} from  "../Routes/routes"
import { posterBaseUrl } from '../Services/tmdbApiServices';



const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genreid');
  const query = new URLSearchParams(location.search).get('query');
  const [page, setPage] = useState(1);
  const isLoading = searchMovieFetch({ query, page, genreId }, setMovies);
  const genreName = useSelector((state: any) => state.genreTitle);


  if (isLoading) {
    return <Loading />
  }

  return (<>

    <div id="search-container">
      {genreName ? (<h2>{genreName}</h2>):(<h2>Search Results for "{query}"</h2>)}
      {movies && movies.length === 0 ? (
        <div className="movie-item">No movies found.</div>
      ) : (
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
      )}

      {movies.length > 0 ?
        (page > 1 ? (<>
          <button onClick={() => (setPage(page - 1))}>prev page</button>
          <button onClick={() => (setPage(page + 1))}>next page</button></>) : (<button onClick={() => (setPage(page + 1))}>next page</button>))
        : (<p></p>)
      }
    </div>
  </>
  );
};

export default SearchPage;
