export interface MovieDetails {
    id: number,
    title:string,
    releaseDate:string,
    posterPath: string,
    popularity: number,
    budget: number,
    genres: Array<any>,
    status: string,
    overview: string;
    voteAverage: number;
    voteCount: number;
}
