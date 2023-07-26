import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey, baseUrl } from '../../../application/Services/tmdbApiServices';
import { useMovieTrailersFetch } from '../../../application/FetchActions/movieTrailersFetch';
import Loading from '../../Components/Loading';

interface MovieTrailer {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}
interface MovieTrailersResponse {
    results: MovieTrailer[];
}
interface MovieProps {
    movieId: number;
}

const MovieTrailers: React.FC<MovieProps> = ({ movieId }) => {
    const { data, isLoading, error } = useMovieTrailersFetch(movieId.toString());

    const videos = data?.filter(trailer => {
        const lowerCaseName = trailer.videoName.toLowerCase();
        return lowerCaseName.includes("trailer") || lowerCaseName.includes("official");
    });
    
    return (
        <div>
            {isLoading && <Loading/>}
            {data && data.length > 0 ? (
                <div>
                    <h2>Trailers</h2>
                    <ul>{videos?.map((trailer) => (
                        <li key={trailer.videoID}>
                            <iframe
                                style={{ border: "none" }}
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.videoName}
                                allowFullScreen></iframe>
                        </li>))}
                    </ul>
                </div>
            ) : (
                <p>No trailers found for this movie. {error}</p>
            )}
        </div>
    );
};

export default MovieTrailers;
