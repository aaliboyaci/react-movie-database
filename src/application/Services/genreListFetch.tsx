import React, { useEffect } from 'react'
import { genreListUrl } from './tmdbApiServices'
import useFetch from '../Hooks/useFetch';
import { Genre } from '../../presentation/Routes/Genres/GenresPage';



export const genreListFetch = (setGenres: React.Dispatch<React.SetStateAction<Genre[]>>) => {

  const { isLoading, data, error }: any = useFetch(genreListUrl);

  useEffect(() => {
    if (data !== null && data.length > 1) {
      setGenres(data);
    }
  }, [isLoading, data]);

  return (
    { isLoading, error }
  )
}
