import "../Search/SearchPage.css";
import Loading from "../../Components/Loading";
import { useTrendingMoviesFetch } from '../../../application/FetchActions/trendingMovieFetch';
import MovieCard from '../../Components/MovieCard';


export const Trending: React.FC = () => {


const { data: trendingMovies, isLoading, error } = useTrendingMoviesFetch();

  if (isLoading) { return <Loading />; }
  if (trendingMovies ===null){return <>{error}</>}
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


