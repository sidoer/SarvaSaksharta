import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Study from './pages/Study';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Fix from './pages/Fix';
import Askai from './pages/Askai';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Home />
              </React.Fragment>
            }
          />
          <Route
            path="/dashboard"
            element={
              <React.Fragment>
                <Fix />
                <Dash />
              </React.Fragment>
            }
          />
          <Route
            path="/study"
            element={
              <React.Fragment>
                <Fix />
                <Study />
              </React.Fragment>
            }
          />
          <Route
            path="/profile"
            element={
              <React.Fragment>
                <Fix />
                <Profile />
              </React.Fragment>
            }
          />
          <Route
            path="/admin"
            element={
              <React.Fragment>
                <Fix />
                <Admin />
              </React.Fragment>
            }
          />
          <Route
            path="/askai"
            element={
              <React.Fragment>
                <Fix />
                <Askai />
              </React.Fragment>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

const root = document.getElementById('root');
createRoot(root).render(<App />);