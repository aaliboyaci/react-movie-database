import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./SearchPage.css";
import Loading from "../../Components/Loading"
import searchMovieFetch from '../../../application/Services/Search/searchMovieFetch';
import Movie from "../../../application/Services/Movie"
import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import PersonList from './PersonList';
import SearchButtons from './SearchButtons';
import { useSearchPerson } from '../../../application/FetchActions/searchPersonFetch';



const SearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const genreId = new URLSearchParams(location.search).get('genreid');
  const query = new URLSearchParams(location.search).get('query');
  const [page, setPage] = useState(1);
  const [searchSelect, setsearchSelect] = useState<number>(0);
  const { isLoading, isLoading2 } = searchMovieFetch({ query, page, genreId, searchSelect }, setMovies, setsearchSelect);
  const genreName = useSelector((state: any) => state.genreTitle);

  //#31 searchPerson//
  const{data: personSearch, isLoading: personLoad, error: personError} = useSearchPerson(page, query?query:"", searchSelect);

  if (isLoading) { return <Loading /> }
  if (isLoading2) { return <Loading /> }


  return (<>

    <div id="search-container">
      {genreName ? (<><h2>{genreName}</h2>
        <MovieList movies={movies} /></>
      ) : (<>
        <h2>Search Results for "{query}"</h2>
        <SearchButtons searchSelect={searchSelect} setsearchSelect={setsearchSelect} setPage={setPage} />
        {(searchSelect === 0 || searchSelect === 1) && <><h2>Movies</h2>
          <MovieList movies={movies} /></>}
        {(searchSelect === 0 || searchSelect === 2) && <><h2>People</h2>
          <PersonList people={personSearch} /></>}</>
      )}

      {((searchSelect === 1 || searchSelect === 2) || genreId) && (
        movies.length > 0 ?
          (page > 1 ? (<div style={{ display: 'flex' }}>
            <button onClick={() => (setPage(page - 1))}>prev page</button>
            <button onClick={() => (setPage(page + 1))}>next page</button></div>) : (<button onClick={() => (setPage(page + 1))}>next page</button>))
          : (<button onClick={() => (setPage(1))}>go back</button>)
      )}
    </div>
  </>
  );
};

export default SearchPage;
