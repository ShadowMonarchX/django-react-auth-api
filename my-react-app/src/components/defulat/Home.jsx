import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/Home.css"

function Home() {
  return (
    <div className="home">
      <div className="hero-section text-center text-white d-flex justify-content-center align-items-center">
        <div>
          <h1 className="display-4">Welcome to YOURFLIX</h1>
          <p className="lead">Stream your favorite movies and TV shows anytime, anywhere.</p>
          <form className="form-inline justify-content-center f-element">
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Search for movies, TV shows..."
            />
            <button type="submit" className="btn btn-danger mb-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;