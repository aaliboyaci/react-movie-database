import { combineReducers } from 'redux';
import favoriteMoviesReducer from './favoriteMoviesReducer';
import genreTitleReducer from './genreTitleReducer'


const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
  genreTitle: genreTitleReducer,
});

export default rootReducer;


