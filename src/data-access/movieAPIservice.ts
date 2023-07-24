import { Movie } from '../application/Types/MovieTypes';
import { API_PATHS, axiosInstance } from './axios';
import { MovieDto } from './movieDTO';

export class MovieApiService {
  static async getTrendingMovies (): Promise<Movie> {
    try {
      const { data, status } = await axiosInstance.get<MovieDto>(
        API_PATHS.TRENDING,
        {
          params: {
            sort_by: 'popularity.desc',
            page: 1,
          },
        }
      );
      console.log("api response = " + data);
      if (status === 200) {
        return { title: data.title, releaseDate: data.release_date } as Movie;
      }
      throw new Error('GG handle status states');
    } catch (e) {
      console.log(e);
    }
  }
}



