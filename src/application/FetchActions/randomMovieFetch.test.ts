import { randomMovieFetch } from "./randomMovieFetch";
import { getRandomMovie } from "../../data-access/apiAccess";
import { mocked } from "jest-mock";
import { Movie } from "./randomMovieFetch";
import { RandomMovieDTO } from "../../data-access/randomMovieDTO";

jest.mock("../../data-access/apiAccess");
const mockedGetRandomMovie = mocked(getRandomMovie);

describe("randomMovieFetch function", () => {
  test("fetches and processes random movie correctly", async () => {
    // sahte API yanıtı
    const mockRandomMovieResponse = {
      results: [
        {
          id: 1,
          name: "Random Movie 1",
          poster_path: "path-to-poster1.jpg",
          release_date: "2023-01-01",
        },
      ],
    } as RandomMovieDTO;

    mockedGetRandomMovie.mockResolvedValue(mockRandomMovieResponse);

    const randomMovie: Movie = await randomMovieFetch();

    expect(randomMovie.id).toBe(mockRandomMovieResponse.results[0].id);
    expect(randomMovie.name).toBe(mockRandomMovieResponse.results[0].name);
  });

  test("handles errors correctly", async () => {
    const mockError = new Error("API error");

    mockedGetRandomMovie.mockRejectedValue(mockError);

    try {
      await randomMovieFetch();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
