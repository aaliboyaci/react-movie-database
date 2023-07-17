import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey, baseUrl } from './tmdbApiServices';

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
    const [trailers, setTrailers] = useState<MovieTrailer[]>([]);

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await axios.get<MovieTrailersResponse>(
                    `${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`
                );
                setTrailers(response.data.results);
            } catch (error) {
                console.error('Error fetching movie trailers:', error);
            }
        };
        fetchTrailers();
    }, [movieId, apiKey]);

    return (
        <div>
            {trailers.length > 0 ? (
                <div>
                    <h2>Trailers</h2>
                    <ul>{trailers.map((trailer) => (
                        <li key={trailer.id}>
                            <iframe
                                style={{ border: "none" }}
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                allowFullScreen></iframe>
                        </li>))}
                    </ul>
                </div>
            ) : (
                <p>No trailers found for this movie.</p>
            )}
        </div>
    );
};

export default MovieTrailers;
