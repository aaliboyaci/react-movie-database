import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";
import searchImage from "../assets/search.png";
import { useDispatch } from "react-redux";
import { setGenreTitle } from "../../store/actions";
import {
  HOME,
  TRENDING,
  GENRESPAGE,
  WATCHLIST,
  SEARCBYHQUERY,
} from "../Routes/routes";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setGenreTitle(""));
    navigate(`${SEARCBYHQUERY}${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <div>
      <h1 className="mainHeader">Movie Database App</h1>
      <form id="searchForm" onSubmit={handleSubmit}>
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a movie or actor..."
        />
        <button className="searchButton" type="submit">
          Search
          <img src={searchImage} alt="search" className="searchimg" />
        </button>
      </form>

      <nav>
        <ul>
          <div id="menu-item">
            <Link to={HOME}>Home</Link>
          </div>
          <div id="menu-item">
            <Link to={GENRESPAGE}>Genres</Link>
          </div>
          <div id="menu-item">
            <Link to={TRENDING}>Trending</Link>
          </div>
          <div id="menu-item">
            <Link to={WATCHLIST}>Watch List</Link>
          </div>
        </ul>
      </nav>
      <hr></hr>
    </div>
  );
};

export default Header;
