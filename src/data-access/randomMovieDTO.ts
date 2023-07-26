export interface RandomMovieDTO {
    id: number;
    name: string;
    poster_path: string;
    release_date: string;
    results:Array<RandomMovieDTO>;
    page?:number;

  }
  

  //dto