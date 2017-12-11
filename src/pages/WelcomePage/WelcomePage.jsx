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
      <div className="WelcomePage-background bg">
        <div className="container">
          <div className ="row">
            <h1 className="display-1 text-center col-12 text-white mt-5">S P A C E &nbsp;&nbsp; S T R I K E</h1>
          </div>
          <div className ="row">
            
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;