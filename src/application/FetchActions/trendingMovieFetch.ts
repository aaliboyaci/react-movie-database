import { getTrendingMovies } from '../../data-access/apiAccess';
import { MovieDTO } from '../../data-access/movieDTO';
import { Movie } from '../Types/MovieTypes';


export async function fetchTrendingMovies(): Promise<Movie[]> {
    try {
        const trendingMoviesResponse = await getTrendingMovies();
        const trendingMovies: Movie[] = trendingMoviesResponse.map((movie: MovieDTO) => {

            return {
                id: movie.id,
                title: movie.title,
                releaseDate: movie.release_date,
                posterPath: movie.poster_path,
                popularity: movie.popularity
            }
        });


        return trendingMovies;
    } catch (error) {
        console.error('Error fetching and processing trending movies:', error);
        throw error;
    }
}
