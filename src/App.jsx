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

function App() {

  return (
    <div id="container">
      <Provider store={store}>
      <Router
      basename={import.meta.env.DEV ? '/' : '/react-movie-database/'}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/GenresPage" element={<GenresPage />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/Details/:showId" element={<Details />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <br></br>
        <Footer />
      </Router>
      </Provider>
    </div>
  );
}

export default App;
