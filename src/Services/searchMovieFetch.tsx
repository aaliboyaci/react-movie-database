import React, { useEffect } from 'react';
import { baseUrl, apiKey } from '../Services/tmdbApiServices';
import useFetch from '../Hooks/useFetch';
import Movie from "../Services/Movie"


interface searchProps {
    query: string | null,
    page: number,
    genreId: string | null,
}

const searchMovieFetch = ({ query, page, genreId }: searchProps, setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,) => {

    const searchUrl = `${baseUrl}search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
    const genreUrl = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
    const fetchUrl: string = genreId ? genreUrl : searchUrl;

    const { isLoading, data, error }: any = useFetch(fetchUrl);
    console.log(isLoading)

    useEffect(() => {
        if (!isLoading && data !== null && data.length !== 0) {
            setMovies(data);
        }
        else if (data == null || data.length == 0) { /* customHook sonrası bugı düzelten kod */
            setMovies([]);
        }
    }, [isLoading, data]);

    return (isLoading)
}

export default searchMovieFetch;