import React from "react";
import { useState } from "react";
import "./watchList.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteMovie } from "../../../store/actions";
import { Link } from "react-router-dom";
import { posterBaseUrl } from "../../../data-access/apiPaths";
import { DETAILS } from "../routes";
import { MovieDetails } from "../../../application/Types/MovieDetailsTypes";

const WatchList: React.FC = () => {
  const favoriteMovies = useSelector((state: any) => state.favoriteMovies);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const moviesPerPage = 20;
  const totalPages = Math.ceil(favoriteMovies.length / moviesPerPage);
  const indexOfLastMovie = page * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favoriteMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  const handleRemoveClick = (movieId: number) => {
    dispatch(removeFavoriteMovie(movieId));
  };

  console.log(currentMovies);

  return (
    <>
      <h1>Your Watch List</h1>
      <div className="fav-container">
        {favoriteMovies.length === 0 ? (
          <p>No movies in your watch list.</p>
        ) : (
          <>
            {currentMovies.map((movie: MovieDetails) => (
              <div key={movie.id} className="fav-movie">
                <Link to={`${DETAILS}${movie.id}`} className="fav-link">
                  <div className="fav-top">
                    <div className="fav-image">
                      <img
                        src={`${posterBaseUrl}${movie.posterPath}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="fav-year">
                      <b>{movie.releaseDate.slice(0, 4)}</b>
                    </div>
                  </div>
                </Link>
                <div className="fav-bot">
                  <Link to={`${DETAILS}${movie.id}`} className="fav-link">
                    <div className="fav-title">{movie.title}</div>
                    <div className="fav-des">
                      {movie.overview.slice(0, 95)}...
                    </div>
                  </Link>
                  <button
                    className="empty-button"
                    onClick={() => handleRemoveClick(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {favoriteMovies.length > moviesPerPage && (
        <div className="pagination-buttons">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default WatchList;
