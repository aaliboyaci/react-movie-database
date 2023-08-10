import { getMovieDetails, getMovieTrailers } from "../../data-access/apiAccess";
import { MovieTrailersDTO } from "../../data-access/movieTrailersDTO";
import { useFetch } from "../Hooks/useFetchV2";
import { MovieDetails } from "../Types/MovieDetailsTypes";
import { MovieTrailers } from "../Types/MovieTrailersTypes";

export async function fetchMovieTrailers(
  movieId: string | undefined,
): Promise<MovieTrailers[]> {
  try {
    const movieTrailersResponse = await getMovieTrailers(movieId);
    const movieTrailers: MovieTrailers[] = movieTrailersResponse?.map(
      (trailer: MovieTrailersDTO) => {
        return {
          videoID: trailer.id,
          key: trailer.key,
          videoName: trailer.name,
        };
      },
    );
    return movieTrailers;
  } catch (error) {
    console.error("Error fetching and processing trending movies:", error);
    throw error;
  }
}

export function useMovieTrailersFetch(movieId: string | undefined) {
  return useFetch<MovieTrailers[]>(() => fetchMovieTrailers(movieId));
}
