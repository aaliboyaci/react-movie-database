import { fetchTrendingMovies } from "./trendingMovieFetch";
import { getTrendingMovies } from "../../data-access/apiAccess";
import { Movie } from "../Types/MovieTypes";
import { mocked } from "jest-mock";
import { MovieDTO } from "../../data-access/movieDTO";

jest.mock("../../data-access/apiAccess");
const mockedGetTrendingMovies = mocked(getTrendingMovies);

describe("fetchTrendingMovies function", () => {
  test("fetches and processes trending movies correctly", async () => {
    // Sahte API yanıtı
    const mockTrendingMoviesResponse: MovieDTO[] = [
      {
        id: 1,
        title: "Movie 1",
        release_date: "2023-01-01",
        poster_path: "path-to-poster1.jpg",
        popularity: 8.5,
      },
    ];

    // Sahte API çağrısı
    mockedGetTrendingMovies.mockResolvedValue(mockTrendingMoviesResponse);

    const trendingMovies: Movie[] = await fetchTrendingMovies();

    expect(trendingMovies).toHaveLength(mockTrendingMoviesResponse.length);
    expect(trendingMovies[0].id).toBe(mockTrendingMoviesResponse[0].id);
    expect(trendingMovies[0].title).toBe(mockTrendingMoviesResponse[0].title);
  });

  test("handles errors correctly", async () => {
    const mockError = new Error("API error");

    mockedGetTrendingMovies.mockRejectedValue(mockError);

    try {
      await fetchTrendingMovies();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
