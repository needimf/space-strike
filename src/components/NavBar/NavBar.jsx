import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  let userNav = props.user ?
    <ul id="nav-mobile" className="right">
      <li><Link to="" onClick={props.handleLogout} >Logout</Link></li>
    </ul>
    :
    <ul id="nav-mobile" className="right">
      <li><Link to="/login" >Login</Link></li>
      <li><Link to="/signup" >Sign Up</Link></li>
    </ul>

  return (
    <nav className="grey darken-4 grey-text text-lighten-5">
      <div className="container">
      <div className="nav-wrapper">
        <Link className="brand-logo left" to="/"><img className="responsive-img" src="https://i.imgur.com/SoTtwt2.png" alt="Space Strike" style={{height: '45px', width: '45px', margin: '5px 0 0'}} /></Link>
        {userNav}
      </div>
      </div>
    </nav>
  );
}

export default NavBar;