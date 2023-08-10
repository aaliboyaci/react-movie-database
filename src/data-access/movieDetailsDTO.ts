export interface MovieDetailsDTO {
  id: number;
  name: string;
  title: string;
  release_date: string;
  poster_path: string;
  popularity: number;
  budget: number;
  genres: Array<any>;
  status: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

// Data Transfer Object
