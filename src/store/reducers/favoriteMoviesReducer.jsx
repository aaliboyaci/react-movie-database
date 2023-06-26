const favoriteMoviesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FAVORITE_MOVIE':
        return [...state, action.payload];
      case 'REMOVE_FAVORITE_MOVIE':
        return state.filter((movie) => movie.id !== action.payload);
      default:
        return state;
    }
  };
  
  export default favoriteMoviesReducer;
  