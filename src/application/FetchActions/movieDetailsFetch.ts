import { useState } from 'react';
import { getMovieDetails } from '../../data-access/apiAccess';
import { MovieDetailsDTO } from '../../data-access/movieDetailsDTO';
import { useFetch } from '../Hooks/useFetchV2';
import { MovieDetails } from '../Types/MovieDetailsTypes';





export async function fetchMovieDetails(showId: string | undefined): Promise<MovieDetails > {
    try {
        const movieDetailsResponse = await getMovieDetails(showId);
        const movieDetails: MovieDetails = {
            id: movieDetailsResponse.id,
            title: movieDetailsResponse.title,
            releaseDate: movieDetailsResponse.release_date,
            posterPath: movieDetailsResponse.poster_path,
            popularity: movieDetailsResponse.popularity,
            budget: movieDetailsResponse.budget,
            genres: movieDetailsResponse.genres,
            status: movieDetailsResponse.status,
            overview: movieDetailsResponse.overview,
            voteAverage: movieDetailsResponse.vote_average,
            voteCount: movieDetailsResponse.vote_count,
        };


        return movieDetails;
    } catch (error) {
        console.error('Error fetching and processing trending movies:', error);
        throw error;
    }
}



export function useMovieDetailsFetch(showId: string | undefined) {
    return useFetch<MovieDetails>(() => fetchMovieDetails(showId));
}

