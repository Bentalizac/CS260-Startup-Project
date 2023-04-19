import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  return (
    <div className="bg-dark text-dark">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <a className="navbar-brand" href="#">Number by Paints</a>
        <menu className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="play.html">Play</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="leaderboard.html">Leaderboard</a>
          </li> 
        </menu>
            </nav>
        </header>

        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderboard" element={<Scores />} />
      </Routes>

        <footer className="bg-dark text-dark text-muted">
      
        <div className="container-fluid">
          <span className="text-reset">Eli Ellsworth</span>
          <a
            className="text-reset"
            href="https://github.com/Bentalizac/CS260-Startup-Project"
            >Source</a
          >
        </div>
      </footer>

    </div>
  );
}

export default App;
