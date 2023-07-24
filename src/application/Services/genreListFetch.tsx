import { getGenreList } from '../../data-access/apiAccess';
import { GenreDTO } from '../../data-access/genreDTO';

export interface Genre {
  id: number;
  name: string;
}


export async function genreListFetch(): Promise<Genre[]> {
  try {
      const genreListResponse = await getGenreList();
      const genreList: Genre[] = genreListResponse.map((genre: GenreDTO) => {

          return {
              id: genre.id,
              name: genre.name,
          }
      });

      
      return genreList;
  } catch (error) {
      console.error('Error fetching and processing trending movies:', error);
      throw error;
  }

}

