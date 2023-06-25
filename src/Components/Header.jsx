import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"


export default function Header() {
  return (
    <div >
      <h1>Movie Database App</h1>
      <form>
        <input id="searchInput" type="text" placeholder='Search for a movie, tv show or an actor'></input>
        <button>Search</button>
      </form>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Imdb100">imdbTop100</Link>
          </li>
          <li>
            <Link to="/GenresPage">Genres</Link>
          </li>
          <li>
            <Link to="/WatchList">Watch List</Link>
          </li>
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
}
