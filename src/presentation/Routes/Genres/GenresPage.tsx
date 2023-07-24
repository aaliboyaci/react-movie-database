import React, { useState} from 'react';
import "./genres.css"
import { useNavigate } from 'react-router-dom';
import Loading from "../../Components/Loading"
import { genreListFetch } from '../../../application/Services/genreListFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setGenreTitle} from '../../../store/actions';
import { SEARCHBYID } from '../routes';

export interface Genre {
  id: number;
  name: string;
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [titleGenre, setTitleGenre] =useState <string>("");
  const navigate = useNavigate();
  const { isLoading, error } = genreListFetch(setGenres)
  const dispatch = useDispatch();
  const genreName = useSelector((state: any) => state.genreTitle);

  if (isLoading) { return <Loading />; }
  if (error) { return <p>Error: {error}</p>; }

  const handleGenreClick = (genreId: number, genreName: string) => {
    dispatch(setGenreTitle(genreName));
    navigate(`${SEARCHBYID}${genreId}`);
  };
  

  return (
    <>
      <h1>Genres</h1>
      <div className='genres-container'>
        {genres.length === 0 ? (
          <p>No genres found.</p>
        ) : (
          genres.map((genre) => (
            <div
              key={genre.id}
              className="genre-box"
              onClick={() => handleGenreClick(genre.id, genre.name)} >
              <div className="genre-title">{genre.name}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
