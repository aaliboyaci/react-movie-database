import React, { useEffect } from 'react'
import useFetch from "../Hooks/useFetch";

import { baseUrl, apiKey, trendUrl } from '../Services/tmdbApiServices';




export interface Trend {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
}

export const trendingFetch = (setTrendingMovies: React.Dispatch<React.SetStateAction<Trend[]>>) => {


    
    const { isLoading, data, error }: any = useFetch(trendUrl);
    const url = `${baseUrl}trending/movie/week?api_key=${apiKey}`;
   


    useEffect(() => {
        if (!isLoading && data !== null && data.length !== 0) {
            setTrendingMovies(data);
        }
    }, [isLoading, data]);

    return (
        { isLoading, error }
    )
}
