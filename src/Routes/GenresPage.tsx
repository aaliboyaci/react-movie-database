import React, { useState} from 'react';
import "./genres.css"
import { useNavigate } from 'react-router-dom';
import Loading from "../Components/Loading"
import { genreListFetch } from '../Services/genreListFetch';

export interface Genre {
  id: number;
  name: string;
}

export default function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();
  const { isLoading, error } = genreListFetch(setGenres)

  if (isLoading) { return <Loading />; }
  if (error) { return <p>Error: {error}</p>; }

  const handleGenreClick = (genreId: number) => {
    navigate(`/search?genreid=${genreId}`);
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
              onClick={() => handleGenreClick(genre.id)} >
              <div className="genre-title">{genre.name}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
