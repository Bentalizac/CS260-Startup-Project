import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  // Asynchronously determine if the user is authenticated by calling the service
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);

  return (
    <div className="bg-dark text-dark">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <a className="navbar-brand" href="#">Number by Paints</a>
          <menu className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/login'>
                Login
              </NavLink>
            </li>
            {authState === AuthState.Authenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/play'>
                    Play
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/scores'>
                    Scores
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to='/about'>
                About
              </NavLink>
            </li>
          </menu>
        </nav>
      </header>

      <Routes>
        <Route
          path='/login'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
        />
        <Route
          path='/play'
          element={
            authState === AuthState.Authenticated ?
            <Play userName={userName} /> :
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
        />
        <Route
          path='/scores'
          element={
            authState === AuthState.Authenticated ?
            <Scores /> :
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
        />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
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
