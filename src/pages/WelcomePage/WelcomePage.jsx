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
      <div className="container">
        <div className="row">
          <div className ="col s12">
            <h1 className="white-text">S P A C E &nbsp;&nbsp; S T R I K E</h1>
          </div>
        </div>
        <div className ="row">
          <div className="col s6">
            <button className="btn">Solo</button>
          </div>
          <div className="col s6">
            <button className="btn" onClick={() => this.props.handleMultiplayerButton()}>Multiplayer</button>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;