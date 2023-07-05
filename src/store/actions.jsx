export const addFavoriteMovie = (movie) => {
  return {
    type: 'ADD_FAVORITE_MOVIE',
    payload: movie,
  };
};

export const removeFavoriteMovie = (movieId) => {
  return {
    type: 'REMOVE_FAVORITE_MOVIE',
    payload: movieId,
  };
};

export const setGenreTitle = (genreName) => {
  return {

    type: 'SET_GENRE_NAME',
    payload: genreName,
  }
}