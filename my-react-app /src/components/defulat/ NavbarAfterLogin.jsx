import React from "react";
import { FiSearch, FiBell, FiHelpCircle, FiSettings } from "react-icons/fi";
import { MdLanguage, MdPlaylistPlay } from "react-icons/md";
import "../../styles/componentscss/Navbar.css";

function NavbarAfterLogin({ username, handleLogout }) {
  return (
    <nav className="navbar-container">
      {/* Left Section */}
      <div className="navbar-left">
        <div className="logo">
          <span>YOURFLIX</span>
        </div>
        <div className="nav-links">
          <a href="/home" className="active">Home</a>
          <div className="dropdown">
            <button className="dropbtn">Movies</button>
            <div className="dropdown-content">
              <a href="/movies/popular">Popular</a>
              <a href="/movies/trending">Trending</a>
              <a href="/movies/genres">Genres</a>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Shows & WebSeries</button>
            <div className="dropdown-content">
              <a href="/shows/ongoing">Ongoing</a>
              <a href="/shows/upcoming">Upcoming</a>
              <a href="/shows/top-rated">Top Rated</a>
            </div>
          </div>
          <a href="/trailers">Upcoming Trailers</a>
          <a href="/news">News</a>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search movies, shows..." />
        </div>
        <div className="nav-icons">
          <button className="icon-btn"><MdLanguage /> EN</button>
          <button className="icon-btn"><MdPlaylistPlay /> Watchlist</button>
          <button className="icon-btn"><FiHelpCircle /></button>
          <button className="icon-btn notification">
            <FiBell />
            <span className="badge">3</span>
          </button>
          <div className="profile-dropdown">
            <img src="profile-icon.png" alt="Profile" />
            <div className="dropdown-content">
              <span className="user-name">{username}</span>
              <a href="/settings"><FiSettings /> Settings</a>
              <a href="/create-list">Create List</a>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;
