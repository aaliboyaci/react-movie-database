export interface PersonPopMoviesDTO {
    crew?: Array<PersonPopMoviesDTO>;
    cast?: Array<PersonPopMoviesDTO>;
    id: string;
    title: string;
}