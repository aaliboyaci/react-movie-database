import React, { useState, useEffect } from 'react';
import "./genres.css"
import { useNavigate } from 'react-router-dom';
import useFetch from "../Hooks/useFetch";
import Loading from "../Components/Loading"

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const apiKey = '6ef10486c5df46ca61884c8b042d53bd';
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  const { isLoading, data, error } = useFetch(url);

  useEffect(() => {
    if (data !== null && data.length > 1) {
      setGenres(data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleGenreClick = (genreId) => {
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
              onClick={() => handleGenreClick(genre.id)}
            >
              <div className="genre-title">{genre.name}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
