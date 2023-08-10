import "./genres.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useGenreListFetch } from "../../../application/FetchActions/genreListFetch";
import { useDispatch } from "react-redux";
import { setGenreTitle } from "../../../store/actions";
import { SEARCHBYID } from "../routes";

export const GenresPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: genres, isLoading, error } = useGenreListFetch();

  if (isLoading) {
    return <Loading />;
  }
  if (genres === null) {
    return <>{error}</>;
  }

  const handleGenreClick = (genreId: number, genreName: string) => {
    dispatch(setGenreTitle(genreName));
    navigate(`${SEARCHBYID}${genreId}`);
  };

  return (
    <>
      <h1>Genres</h1>
      <div className="genres-container">
        {genres.length === 0 ? (
          <p>No genres found.</p>
        ) : (
          genres.map((genre) => (
            <div
              key={genre.id}
              className="genre-box"
              onClick={() => handleGenreClick(genre.id, genre.name)}
            >
              <div className="genre-title">{genre.name}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
