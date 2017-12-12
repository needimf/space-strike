import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  let userNav = props.user ?
    <ul id="nav-mobile" className="left hide-on-med-and-down">
      <li><span>WELCOME, {props.user.firstName}</span></li>
      <li><Link to="" onClick={props.handleLogout} >Logout</Link></li>
    </ul>
    :
    <ul id="nav-mobile" className="left hide-on-med-and-down">
      <li><Link to="/login" >Login</Link></li>
      <li><Link to="/signup" >Sign Up</Link></li>
    </ul>

  return (
    <nav>
      <div className="container">
      <div className="nav-wrapper">
        <Link className="brand-logo right" to="/">Space Strike</Link>
        {userNav}
      </div>
      </div>
    </nav>
  );
}

export default NavBar;