import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };



  return (
    <div>
      <h1>Movie Database App</h1>
      <form onSubmit={handleSubmit}>
        <input id="searchInput" type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a movie" />
        <button className="searchbtn" type="submit">Search</button>
      </form>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/GenresPage">Genres</Link>

          </li>
          <li>
            <Link to="/Imdb100">imdbTop100</Link>
          </li>
          <li>
            <Link to="/WatchList">Watch List</Link>
          </li>
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
};

export default Header;
