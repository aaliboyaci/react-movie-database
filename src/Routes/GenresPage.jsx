import React, { useState, useEffect } from 'react';
import "./genres.css"
import { useNavigate } from 'react-router-dom';

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const apiKey = '6ef10486c5df46ca61884c8b042d53bd';
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(genreUrl);
        const data = await response.json();
        const genres = data.genres;
        console.log(genres);
        setGenres(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

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
