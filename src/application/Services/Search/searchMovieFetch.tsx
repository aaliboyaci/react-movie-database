import React, { useEffect } from 'react';
import { baseUrl, apiKey } from '../tmdbApiServices';
import useFetch from '../../Hooks/useFetch';
import Movie from "../Movie"
import { Person } from '../../../presentation/Routes/Search/PersonList';


interface searchProps {
    query: string | null,
    page: number,
    genreId: string | null,
    searchSelect: number,
}

const searchMovieFetch = ({ query, page, genreId, searchSelect }: searchProps, setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
    setsearchSelect: React.Dispatch<React.SetStateAction<number>>) => {

    const searchUrl = `${baseUrl}search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
    const genreUrl = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
    const personSearchUrl = `${baseUrl}search/person?api_key=${apiKey}&query=${query}&page=${page}`

    const fetchUrl: string = genreId ? genreUrl : searchUrl;

    const { isLoading: isLoading, data: data, error: error }: any = useFetch(fetchUrl);
    const { isLoading: isLoading2, data: data2, error: error2 }: any = useFetch(personSearchUrl);

    // console.log(data2);
    useEffect(() => {
        if (!isLoading && data !== null && data.length !== 0) {
            const sortedMovies = data.sort((a: Movie, b: Movie) => b.popularity - a.popularity)
            if (searchSelect === 0 && (fetchUrl == searchUrl)) { setMovies(sortedMovies.slice(0, 5)); }
            else if (searchSelect === 1 || genreUrl) { setMovies(sortedMovies) }

        }
        else if (data == null || data.length == 0) { /* customHook sonrası bugı düzelten kod */
            setMovies([]);
        }
    }, [isLoading, data, searchSelect]);

    useEffect(() => {
        if (!isLoading2 && data2 !== null && data2.length !== 0) {
          const filteredPeople = data2.filter(
            (person: Person) =>
              person.known_for_department === "Acting" ||
              person.known_for_department === "Directing"
          );
          const sortedPeople = filteredPeople.sort(
            (a: Person, b: Person) => b.popularity - a.popularity
          );
          if (searchSelect === 0) {
            setPeople(sortedPeople.slice(0, 5));
          } else if (searchSelect === 2) {
            setPeople(sortedPeople);
          }
        } else if (data2 == null || data2.length == 0) {
          setPeople([]);
        }
      }, [isLoading2, data2, searchSelect]);
      

    useEffect(() => { setsearchSelect(0) }, [query]) /* default değere dönmeme bugını düzelten satır */

    return ({ isLoading, isLoading2 })
}

export default searchMovieFetch;