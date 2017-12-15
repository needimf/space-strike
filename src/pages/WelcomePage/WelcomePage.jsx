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
  constructor(props) {
    super(props);
  }
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
          <h1 className="grey-text text-lighten-5 center-align">SPACE STRIKE</h1>
        </div>
        <div className="row valign-wrapper">
          <div className ="col s12 m8">
            <div className="center-align">
              {this.props.user ? 
                <Link className="btn transparent center-align" to="/battle">Play Game</Link>
                :
                <Link className="btn transparent center-align" to="/login">Login</Link>
              }
            </div>
          </div>
          {this.props.user ?
            <div className="col s12 m4">
              <h4 className="center-align grey-text text-lighten-5">Stats</h4>
              <p className="center-align grey-text text-lighten-5">Wins: {this.props.user.wins}</p>
              <p className="center-align grey-text text-lighten-5">Losses: {this.props.user.totalGames - this.props.user.wins}</p>
            </div>
            :
            <div className="col s12 m4">
              <h4 className="center-align grey-text text-lighten-5">Join the fun</h4>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default WelcomePage;