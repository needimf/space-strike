import React, {Component} from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';
import GameMessage from './../../components/GameMessage/GameMessage';
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
      },
      selectedShip: '',
      orientation: 'horizontal'
    }
    this.socket = io({ query: `user=${JSON.stringify(this.props.user)}` });
    this.socket.on('join', (data) => {
      this.handleGameJoin(data);
    });
    this.socket.on('update game state', (data) =>{
      this.handleGameUpdate(data);
    });
    this.socket.on('opponent forfeited', (data) => {
      this.handleOpponentForfeit(data);
    });
    this.socket.on('leave', () => {
      this.handleGameEnd();
    });
  }

  // Event Handlers
  handleGameJoin = (gameState, cb) => {
    this.setState({game: gameState}, () => {
      let thisTurnNo = this.props.user._id === this.state.game.player1.id ? this.state.game.player1.turnNo : this.state.game.player2.turnNo;
      this.props.handleUserGameJoin(this.state.game.id, thisTurnNo);
    });
  }

  handleGameUpdate = (gameState) => {
    this.setState({game: gameState});
  }

  handleOpponentForfeit = (gameState) => {
    this.setState({game: gameState}, () => {
      this.socket.emit('leave');
    })
  }
  
  handleGameEnd = () => {
    // fetch('/api/scores', {
    //   method: 'PUT',
    //   headers: {'Content-Type': 'application/json'},
    //   body: {winner: (this.props.user._id === game.winner ? true : false)}
    // }).then(res => res.json())
    this.setState(prevState => ({
      ...prevState,
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
    }), () => this.props.handleUserGameEnd());
  }

  handleTorpedoFire = (row, col) => {
    this.socket.emit('torpedo fire', {row, col} );
  }

  handleShipSelection = (ship) => {
    this.setState({selectedShip: ship});
  }

  handleOrientationChange = () => {
    this.setState({orientation: (this.state.orientation === 'horizontal' ? 'vertical' : 'horizontal')});
  }

  handleShipPlacement = (shipName, orientation, row, col) => {
    let player = this.props.user.turnNo === 0 ? 'player1' : 'player2';
    
    if (this.checkIfPlacementIsInRange(shipName, orientation, row, col)) {
      this.setState({selectedShip: ''}, () => {
        this.socket.emit('place a ship', {shipName, orientation, row, col, player})
      });
    }
  }

  handleForfeit = () => {
    this.socket.emit('leave');
  }

  checkIfPlacementIsInRange = (shipName, orientation, row, col) => {
    if (shipName) {
      let length = this.state.game.shipTypes[shipName].length;

      while (length > 0) {
        if (col < 0 || row < 0 || col > 9 || row > 9) {
          return false;
        }
        orientation === 'horizontal' ? col += 1 : row += 1;
        length -= 1;
      }
      return true;
    }
    return false;
  }

  // Lifecycle methods
  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="container">
        <GameMessage 
          user={this.props.user}
          game={this.state.game}
        />
        <GameScreen
          myGameData={this.props.user ? 
            (this.props.user._id === this.state.game.player1.id ? this.state.game.player1 : this.state.game.player2)
            :
            this.state.game.player1
          }
          game={this.state.game}
          socket={this.socket}
          user={this.props.user}
          handleTorpedoFire={this.handleTorpedoFire}
          handleShipPlacement={this.handleShipPlacement}
          handleShipSelection={this.handleShipSelection}
          handleOrientationChange={this.handleOrientationChange}
          selectedShip={this.state.selectedShip}
          orientation={this.state.orientation}
        />
      </div>
    )
  }
}

export default GamePage;