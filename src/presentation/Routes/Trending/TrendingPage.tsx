import React, { useEffect, useState } from 'react';
import "../Search/SearchPage.css";
import Loading from "../../Components/Loading";
import { fetchTrendingMovies } from '../../../application/FetchActions/trendingMovieFetch';
import { Movie } from '../../../application/Types/MovieTypes';
import MovieCard from '../../Components/MovieCard';


const Trending: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies()
      .then((trendingMovies) => {
        setTrendingMovies(trendingMovies);
        setIsLoading(false);
      })
      .catch((error) => { console.error(error); });
  }, []);

  if (isLoading == true) { return (<Loading />) }
  return (
    <div id="search-container">
      <h2>Trending Movies</h2>
      {trendingMovies.length === 0 ? (
        <p>No movies found.</p>) : (
        <><p><i>Trending movies in last week</i></p>
          <ul className="movie-list">
            {trendingMovies.map((movie) => (
              <li key={movie.id} className="movie-item">
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Trending;
