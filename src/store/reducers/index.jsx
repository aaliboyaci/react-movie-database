import { combineReducers } from 'redux';
import favoriteMoviesReducer from './favoriteMoviesReducer';


const rootReducer = combineReducers({
  favoriteMovies: favoriteMoviesReducer,
});

export default rootReducer;


