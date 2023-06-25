import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="card">
        <div className="header">
          <h2>Random Movies</h2>
          <button>Random</button>
        </div>
        <div className="content">
          <img src="" alt="Random Movie" />
          <p>Movie Title</p>
        </div>
      </div>

      <div className="card">
        <div className="header">
          <h2>Random Actor</h2>
          <button>Random</button>
        </div>
        <div className="content">
          <img src="" alt="Random Actor" />
          <p>Actor Name</p>
        </div>
      </div>

      <div className="card">
        <div className="header">
          <h2>Search by Year</h2>
          
        </div>
        <div className="content">
          <input type="text" placeholder="Enter year " />
          <button>Search</button>
        </div>
      </div>

      <div className="card">
        <div className="header">
          <h2>Random TV Show</h2>
          <button>Random</button>
        </div>
        <div className="content">
          <img src="" alt="Random TV Show" />
          <p>TV Show Title</p>
        </div>
      </div>
    </div>
  );
}
