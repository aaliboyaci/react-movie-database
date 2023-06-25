import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Routes/HomePage';
import Imdb100 from './Routes/Imdb100';
import GenresPage from './Routes/GenresPage';
import WatchList from './Routes/WatchList';
import Details from "./Routes/Details";
import ErrorPage from "./Routes/ErrorPage";
import SearchPage from "./Routes/SearchPage";
import './App.css'

function App() {
  return (
    <div id="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Imdb100" element={<Imdb100 />} />
          <Route path="/GenresPage" element={<GenresPage />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/Details/:showId" element={<Details />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/Search" element={<SearchPage />} />
        </Routes>
        <br></br>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
