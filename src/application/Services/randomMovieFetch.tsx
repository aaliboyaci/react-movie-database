import React, { useEffect } from 'react';
import { baseUrl, apiKey } from './tmdbApiServices';
import axios from 'axios';
import Movie from "./Movie"

const useRandomMovieFetch = (setRandomMovie: React.Dispatch<React.SetStateAction<Movie | null>>, dice: number) => {
  useEffect(() => {
    const fetchData = async () => {
      const randomPage: number = Math.floor(Math.random() * 40) + 1;
      const randomMovieUrl: string = `${baseUrl}discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${randomPage}`;

      try {
        const response = await axios.get(randomMovieUrl);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        const randomData = response.data.results[randomIndex];
        setRandomMovie(randomData);
      } catch (error) {
        console.log('Axios error:', error);
      }
    };

    fetchData();
  }, [setRandomMovie, dice]);
};

export default useRandomMovieFetch;
