import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
        <Link className="navbar-brand" to="/">Space Strike</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;