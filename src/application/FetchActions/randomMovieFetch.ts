import { getRandomMovie } from '../../data-access/apiAccess';
import { useRandomFetch } from '../Hooks/useRandomFetch';

export interface Movie {
    id: number;
    name: string;
    posterPath: string;
    releaseDate: string;
}


export async function randomMovieFetch(): Promise<Movie> {
    try {
        const randomPage: number = Math.floor(Math.random() * 40) + 1;
        const randomMovieResponse = await getRandomMovie(randomPage);
        const randomIndex = Math.floor(Math.random() * randomMovieResponse.results.length);
        const randomData = randomMovieResponse?.results[randomIndex];
        const randomMovie: Movie = {
            id: randomData.id,
            name: randomData.name,
            posterPath: randomData.poster_path,
            releaseDate: randomData.release_date,
        }

        return randomMovie;
    } catch (error) {
        console.error('Error fetching and processing trending movies:', error);
        throw error;
    }
}

export function useRandomMovieFetch(dice: number) {
    return useRandomFetch<Movie>(() => randomMovieFetch(), dice);
}