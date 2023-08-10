import { getSearchMovies } from "../../data-access/apiAccess";
import { SearchMovieDTO } from "../../data-access/searchMovieDTO";
import { useSearchMovieFetch } from "../Hooks/useSearchMovieFetch";
import { SearchMovieType } from "../Types/SearchMovieTypes";

export async function fetchMovieSearch(
  page: number,
  query: string,
  searchSelect: number,
  genreID: string | null,
): Promise<SearchMovieType[]> {
  try {
    const movieSearchResponse = await getSearchMovies(page, query, genreID);

    let movies: SearchMovieDTO[] = [];
    const sortedMovies = movieSearchResponse.sort(
      (a: SearchMovieDTO, b: SearchMovieDTO) => b.popularity - a.popularity,
    );
    if (searchSelect === 0 && genreID === null) {
      movies = sortedMovies.slice(0, 5);
    } else if (searchSelect === 1 || genreID !== "") {
      movies = sortedMovies;
    } else if (movieSearchResponse == null || movieSearchResponse.length == 0) {
      movies = [];
    }

    const movieSearch: SearchMovieType[] = movies?.map(
      (movie: SearchMovieDTO) => {
        return {
          id: movie.id,
          name: movie.title,
          poster: movie.poster_path,
          popularity: movie.popularity,
          releaseDate: movie.release_date,
        };
      },
    );

    return movieSearch;
  } catch (error) {
    console.error("Error fetching and processing trending movies:", error);
    throw error;
  }
}
export function useSearchMovie(
  page: number,
  query: string,
  searchSelect: number,
  genreID: string | null,
) {
  return useSearchMovieFetch<SearchMovieType[]>(
    () => fetchMovieSearch(page, query, searchSelect, genreID),
    query,
    page,
    searchSelect,
    genreID,
  );
}
