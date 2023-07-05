export interface CrewMember {
    job: string;
    department: string;
    name: string;
  }
  
  export interface CastMember {
    id: number;
    name: string;
  }
  
  export interface Movie {
    id: number;
    original_title: string;
    poster_path: string;
    genres: { id: number; name: string }[];
    release_date: string;
    overview: string;
    status: string;
    vote_average: number;
    vote_count: number;
    budget: number;
  }