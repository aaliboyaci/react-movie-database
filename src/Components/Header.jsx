import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './header.css';
import { useNavigate } from 'react-router-dom';
import searchimg from "../assets/search.png"

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
        <button className="searchbtn" type="submit">Search <img src={searchimg} alt='search' className='searchimg'></img></button>
      </form>

      <nav>
        <ul>
          <div id="menu-item">
            <Link to="/">Home</Link>
          </div >
          <div id="menu-item">
            <Link to="/GenresPage">Genres</Link>

          </div>
          <div id="menu-item">
            <Link to="/Trending">Trending</Link>
          </div>
          <div id="menu-item">
            <Link to="/WatchList">Watch List</Link>
          </div>
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
};

export default Header;
