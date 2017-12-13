import React, {Component} from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';
const io = require('socket.io-client');

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        player1: {
          id: null,
          grids: {
            primaryGrid: [],
            trackingGrid: []
          }
        },
        player2: {
          id: null,
          grids: {
            primaryGrid: [],
            trackingGrid: []
          }
        }
      }
    }
    this.socket = io('http://localhost:3000/', { query: `user=${JSON.stringify(this.props.user)}` });
    this.socket.on('join', (data) => {
      this.handleGameJoin(data);
    });
    this.socket.on('update game state', (data) =>{
      this.handleGameUpdate(data);
    })
  }

  // Event Handlers
  handleGameJoin = (gameState) => {
    this.setState({game: gameState}, () => {
      this.props.handleUserGameJoin(this.state.game.id);
    });
  }

  handleGameUpdate = (gameState) => {
    this.setState({game: gameState});
  }

  handleTorpedoFire = (e) => {
    let row = parseInt(e.target.getAttribute('data-row'), 10);
    let col = parseInt(e.target.getAttribute('data-col'), 10);
    this.socket.emit('torpedo fire', {row, col} );
  }

  // Lifecycle methods
  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>Gameplay Screen</h1>
        </div>
        <GameScreen
          myPlayerData={this.props.user ? 
            (this.props.user._id === this.state.game.player1.id ? this.state.game.player1 : this.state.game.player2)
            :
            this.state.game.player1
          }
          game={this.state.game}
          socket={this.socket}
          user={this.props.user}
          handleTorpedoFire={this.handleTorpedoFire}
        />
      </div>
    )
  }
}

export default GamePage;