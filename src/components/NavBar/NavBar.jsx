import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-materialize';

const NavBar = (props) => {
  let userNav = props.user ?
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><span>WELCOME, {props.user.firstName}</span></li>
      <li><Link to="" onClick={props.handleLogout} >Logout</Link></li>
    </ul>
    :
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="/login" >Login</Link></li>
      <li><Link to="/signup" >Sign Up</Link></li>
    </ul>

  return (
    <nav className="grey darken-4 grey-text text-lighten-5">
      <div className="container">
      <div className="nav-wrapper">
        <Link className="brand-logo left" to="/">Space Strike</Link>
        {userNav}
      </div>
      </div>
    </nav>
  );
}

export default NavBar;