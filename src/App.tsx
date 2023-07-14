import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Routes/HomePage';
import Trending from './Routes/Trending';
import GenresPage from './Routes/GenresPage';
import WatchList from './Routes/WatchList';
import Details from "./Routes/Details";
import ErrorPage from "./Routes/ErrorPage";
import SearchPage from "./Routes/SearchPage";
import './App.css';
import store from './store';
import PersonPage from './Routes/PersonPage';
import { HOME, TRENDING, GENRESPAGE, WATCHLIST, DETAILSPAGE, PERSONPAGE, SEARCHPAGE, ERROR } from  "./Routes/routes"


function App() {

  return (
    <div id="container">
      <Provider store={store}>
        <Router basename={process.env.NODE_ENV === 'development' ? '/' : '/react-movie-database/'}>
          <Header />
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={TRENDING} element={<Trending />} />
            <Route path={GENRESPAGE} element={<GenresPage />} />
            <Route path={WATCHLIST} element={<WatchList />} />
            <Route path={DETAILSPAGE} element={<Details />} />
            <Route path={PERSONPAGE} element={<PersonPage />} />
            <Route path={SEARCHPAGE} element={<SearchPage />} />
            <Route path={ERROR} element={<ErrorPage />} />
          </Routes>
          <br></br>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
