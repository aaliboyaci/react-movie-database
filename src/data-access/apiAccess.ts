import { baseUrl, trendUrl, apiKey, genreListUrl, randomMovieURL } from './apiPaths';
import { MovieDTO } from './movieDTO';
import { GenreDTO } from './genreDTO';
import { MovieDetailsDTO } from './movieDetailsDTO';
import { MovieCastDetailsDTO } from './movieCastDetailsDTO';
import { MovieTrailersDTO } from './movieTrailersDTO';
import axiosInstance from './axiosInstance';
import { RandomMovieDTO } from './randomMovieDTO';
import { PersonDetailsDTO } from './personDetailsDTO';
import { PersonPopMoviesDTO } from './personPopMoviesDTO';
import { SearchPersonDTO } from './searchPersonDTO';

const API_KEY = `${apiKey}`;

export async function getTrendingMovies(): Promise<MovieDTO[]> {
    try {
        const response = await axiosInstance.get(trendUrl);
        const trendingMovies: MovieDTO[] = response.data.results;

        return trendingMovies;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

export async function getGenreList(): Promise<GenreDTO[]> {
    try {
        const response = await axiosInstance.get(genreListUrl, {
            params: {
                api_key: API_KEY,
            },
        });
        const genreList: GenreDTO[] = response.data.genres;
        return genreList;
    } catch (error) {
        console.error('Error fetching genre list:', error);
        throw error;
    }
}

export async function getMovieDetails(show_id: string | undefined): Promise<MovieDetailsDTO> {
    try {
        const showUrl = `${baseUrl}movie/${show_id}?api_key=${apiKey}`;
        const response = await axiosInstance.get(showUrl, {
            params: {
                api_key: API_KEY,
            },
        });
        const movieDetailsResponse: MovieDetailsDTO = response.data;
        return movieDetailsResponse;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
}

export async function getMovieCastDetails(show_id: string | undefined): Promise<MovieCastDetailsDTO> {
    try {
        const castUrl = `${baseUrl}movie/${show_id}/credits?api_key=${apiKey}`;
        const response = await axiosInstance.get(castUrl, {
            params: {
                api_key: API_KEY,
            },
        });
        const movieDetailsResponse: MovieCastDetailsDTO = response.data;
        return movieDetailsResponse;
    } catch (error) {
        console.error('Error fetching movie cast details:', error);
        throw error;
    }
}

export async function getMovieTrailers(show_id: string | undefined): Promise<MovieTrailersDTO[]> {
    try {
        const trailerURL = `${baseUrl}movie/${show_id}/videos?api_key=${apiKey}`;
        const response = await axiosInstance.get(trailerURL, {
            params: {
                api_key: API_KEY,
            },
        });
        const movieTrailersResponse: MovieTrailersDTO[] = response.data.results;
        return movieTrailersResponse;
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
        throw error;
    }
}

export async function getRandomMovie(randomPage: number): Promise<RandomMovieDTO> {
    try {
        const randomURL = `${randomMovieURL}${randomPage}`;
        const response = await axiosInstance.get(randomURL);

        const randomMovieResponse: RandomMovieDTO = response.data;
        return randomMovieResponse;
    } catch (error) {
        console.error('Error fetching random movie:', error);
        throw error;
    }
}

export async function getPersonDetails(personId: string | undefined): Promise<PersonDetailsDTO> {
    try {
        const personDetailsURL = `${baseUrl}person/${personId}?api_key=${apiKey}`;
        const response = await axiosInstance.get(personDetailsURL);
        const personDetailsResponse: PersonDetailsDTO = response.data;
        return personDetailsResponse;
    } catch (error) {
        console.error('Error fetching person details:', error);
        throw error;
    }
}

export async function getPersonPopMovies(personId: string | undefined): Promise<PersonPopMoviesDTO> {
    try {
        const personPopMoviesURL = `${baseUrl}person/${personId}/movie_credits?api_key=${apiKey}`;
        const response = await axiosInstance.get(personPopMoviesURL);
        const personPopMoviesResponse: PersonPopMoviesDTO = response.data;
        return personPopMoviesResponse;
    } catch (error) {
        console.error('Error fetching pop movies:', error);
        throw error;
    }
}

export async function getSearchPerson(page: number, query: string): Promise<SearchPersonDTO[]> {
    try {
        const personSearchUrl = `${baseUrl}search/person?api_key=${apiKey}&query=${query}&page=${page}`
        const response = await axiosInstance.get(personSearchUrl);
        const movieTrailersResponse: SearchPersonDTO[] = response.data.results;
        return movieTrailersResponse;
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
        throw error;
    }
}