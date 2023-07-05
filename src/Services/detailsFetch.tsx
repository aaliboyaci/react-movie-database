import React, { useEffect, useState } from 'react';
import { baseUrl, apiKey } from '../Services/tmdbApiServices';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../store/actions';
import { Movie, CrewMember, CastMember } from "../Services/detailsTypes"
import { Reducer } from 'redux';
import useFetch from '../Hooks/useFetch';

interface detailsProps {
    showId: string | undefined;
    setMovie: React.Dispatch<React.SetStateAction<Movie| null>>;
    setMainCast: React.Dispatch<React.SetStateAction<CastMember[] | null>>;
    setDirector: React.Dispatch<React.SetStateAction<CrewMember | null>>;
    setCredits: React.Dispatch<React.SetStateAction<CastMember | null>>;
    dispatch: Reducer;
}

const detailsFetch = ({ showId, setMovie, setMainCast, setDirector, setCredits, dispatch }: detailsProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const castUrl = `${baseUrl}movie/${showId}/credits?api_key=${apiKey}`;
    const showUrl = `${baseUrl}movie/${showId}?api_key=${apiKey}`;


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                const movieResponse = await fetch(showUrl);
                const movieData = await movieResponse.json();
                setMovie(movieData);
                
                const castResponse = await fetch(castUrl);
                const castData = await castResponse.json();
                setCredits(castData);
                setDirector(castData.crew.find((person: CrewMember) => person.job === 'Director' && person.department === 'Directing'));
                setMainCast(castData.cast.slice(0, 3));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [showId, dispatch]);


    return  (isLoading)
    
}

export default detailsFetch;