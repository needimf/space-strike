import React, {Component} from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';
const io = require('socket.io-client');

class GameplayPage extends Component {
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
  }

  handleGameJoin = (gameState) => {
    this.setState({game: gameState});
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
        <GameScreen
          myPlayerData={this.props.user ? 
            (this.props.user._id === this.state.game.player1.id ? this.state.game.player1 : this.state.game.player2)
            :
            this.state.game.player1
          }
          game={this.state.game}
          socket={this.socket}
          user={this.props.user}
        />
      </div>
    )
  }
}

export default GameplayPage;