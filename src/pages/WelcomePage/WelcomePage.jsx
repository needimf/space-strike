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
        <div className="row center-align">
          <img className="responsive-img" src="https://i.imgur.com/pJqB2pt.png" alt="Space Strike logo" />
        </div>
        {this.props.user ? 
          <div className="row valign-wrapper">
            <div className ="col s12 m8">
              <div className="center-align">
                <Link className="btn-large btn grey darken-4 center-align" to="/battle">Play Game</Link>
              </div>
            </div>
            <div class="col s12 m4">
              <div class="card grey darken-4">
                <div class="card-content white-text">
                  <span class="card-title center-align">{this.props.user.firstName}'s Stats</span>
                  <p className="center-align grey-text text-lighten-5">Wins: {this.props.user.wins}</p>
                  <p className="center-align grey-text text-lighten-5">Losses: {this.props.user.totalGames - this.props.user.wins}</p>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="row valign-wrapper">
            <div className ="col s12">
              <div className="center-align">
                <Link className="btn-large btn grey darken-4 center-align" to="/login">Login</Link>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default WelcomePage;