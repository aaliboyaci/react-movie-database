import React, { useEffect, useState } from 'react';
import "./genres.css"
import { useNavigate } from 'react-router-dom';
import Loading from "../../Components/Loading"
import { genreListFetch } from '../../../application/Services/genreListFetch';
import { useDispatch } from 'react-redux';
import { setGenreTitle } from '../../../store/actions';
import { SEARCHBYID } from '../routes';
import { Genre } from "../../../application/Services/genreListFetch";




export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    genreListFetch()
      .then((genreList) => {
        setGenres(genreList);
        setIsLoading(false);
      })
      .catch((error) => { console.error(error); });
  }, []);

  if (isLoading) { return <Loading />; }

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
