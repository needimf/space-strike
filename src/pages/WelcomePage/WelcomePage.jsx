import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './WelcomePage.css';

let styles = {
  body: {
    background: "url('https://i.imgur.com/UXGVpTH.jpg')",
    backgroundSize: 'cover',
  }
}
class WelcomePage extends Component {
  
  // Lifecycle Methods
  componentWillMount() {
    for(let i in styles.body){
        document.body.style[i] = styles.body[i];
    }
  }

  componentWillUnmount() {
    for(let i in styles.body){
        document.body.style[i] = null;
    }
  }

  render() {
    return (
      <div className="container WelcomePage-container">
        <div className="row">
          <div className ="col s12">
            <h1 className="grey-text text-lighten-5 center-align">SPACE STRIKE</h1>
          </div>
        </div>
        <div className ="row">
          <div className="col s12">
            <div className="center-align">
              {this.props.user ? 
                <Link className="btn transparent center-align" to="/battle">Play Game</Link>
                :
                <Link className="btn transparent center-align" to="/login">Login</Link>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;