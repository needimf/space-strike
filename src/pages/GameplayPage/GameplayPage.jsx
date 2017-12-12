import React, {Component} from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';
const io = require('socket.io-client');

class GameplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.socket = io();
    this.socket.on('connect', () => {
      this.socket.emit('add user to list', {user: this.props.user});
    });
    this.socket.on('added', (data) => {
      console.log(data);
    })
    this.socket.on('join', (data) => {
      console.log(data);
    });
  }

  handleButton = () => {
    this.socket.emit('button');
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Gameplay Screen</h1>
        </div>
        {/* <GameScreen 
          playerOneTurn={this.props.playerOneTurn}
          playerGrids={this.props.playerGrids}
          gameOver={this.props.gameOver}
          winner={this.props.winner}
          handleShot={this.props.handleShot}
        /> */}
      </div>
    )
  }
}

export default GameplayPage;