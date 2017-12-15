import React, {Component} from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';
import GameMessage from './../../components/GameMessage/GameMessage';

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
      orientation: 'horizontal',
      forfeitMsg: ''
    }
    this.socket = window.io.connect({ query: `user=${JSON.stringify(this.props.user)}` });
    this.socket.on('join', (data) => {
      this.handleGameJoin(data);
    });
    this.socket.on('update game state', (data) =>{
      this.handleGameUpdate(data);
    });
    this.socket.on('opponent forfeited', (data) => {
      // alert('Your opponent forfeited! Click ok to find a worthy adversary. ');
      // document.getElementById('instructions-message').innerHTML = '<h5>Your opponent forfeited, looking for a worthy adversary</h5>';
      this.handleOpponentForfeit(data);
    });
    this.socket.on('leave', (data) => {
      this.handleGameEnd(data.user, data.gameId);
    });
  }

  // Event Handlers
  handleGameJoin = (gameState) => {
    this.setState({game: gameState}, () => {
      let thisTurnNo = this.props.user._id === this.state.game.player1.id ? this.state.game.player1.turnNo : this.state.game.player2.turnNo;
      this.props.handleUserGameJoin(this.state.game.id, thisTurnNo);
    });
  }

  handleGameUpdate = (gameState) => {
    this.setState({game: gameState, forfeitMsg: ''});
  }

  handleOpponentForfeit = (gameState) => {
    this.setState({game: gameState, forfeitMsg: 'Your last opponent forfeited, you have been awarded a win'}, () => {
      this.socket.emit('leave');
    })
  }

  handlePlayAgain = () => {
    this.socket.emit('leave');
  }
  
  handleGameEnd = (user, prevGameId) => {
    if (this.props.user.currentGame === prevGameId) {
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
      }), () => this.props.handleUserGameEnd(user, prevGameId));
    }
  }

  handleMissileFire = (row, col) => {
    this.socket.emit('missile fire', {row, col} );
  }

  handleShipSelection = (ship) => {
    this.setState({selectedShip: ship});
  }

  handleOrientationChange = () => {
    this.setState({orientation: (this.state.orientation === 'horizontal' ? 'vertical' : 'horizontal')});
  }

  handleShipPlacement = (shipName, orientation, row, col) => {
    let player = this.props.user.turnNo === 0 ? 'player1' : 'player2';
    
    if (this.checkIfValidPlacement(shipName, orientation, row, col, player)) {
      this.setState({selectedShip: ''}, () => {
        this.socket.emit('place a ship', {shipName, orientation, row, col, player})
      });
    }
  }

  handleForfeit = () => {
    this.socket.emit('leave');
  }

  checkIfValidPlacement = (shipName, orientation, row, col, player) => {
    if (shipName) {
      let length = this.state.game.shipTypes[shipName].length;

      while (length > 0) {
        if (col < 0 || row < 0 || col > 9 || row > 9) {
          return false;
        } else if (this.state.game[player].grids.primaryGrid[row][col].ship) {
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
      <div>
        <GameMessage 
            user={this.props.user}
            game={this.state.game}
            handlePlayAgain={this.handlePlayAgain}
            forfeitMsg={this.state.forfeitMsg}
          />
        <div className="container">
          <GameScreen
            myGameData={this.props.user ? 
              (this.props.user._id === this.state.game.player1.id ? this.state.game.player1 : this.state.game.player2)
              :
              this.state.game.player1
            }
            game={this.state.game}
            socket={this.socket}
            user={this.props.user}
            handleMissileFire={this.handleMissileFire}
            handleShipPlacement={this.handleShipPlacement}
            handleShipSelection={this.handleShipSelection}
            handleOrientationChange={this.handleOrientationChange}
            selectedShip={this.state.selectedShip}
            orientation={this.state.orientation}
            checkIfValidPlacement={this.checkIfValidPlacement}
          />
        </div>
      </div>
    )
  }
}

export default GamePage;