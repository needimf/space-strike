import React, {Component} from 'react';
const io = require('socket.io-client');

class WaitingRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingRoom: null
    }
    this.socket = io();
    this.player = prompt('What is your name?')
    this.socket.emit('add-player-to-list', this.player)
    this.socket.on('players-currently-in-list', (players) => {
      this.updateListFromSockets(players);
    });
  }
  
  updateListFromSockets = (players) => {
    this.setState({waitingRoom: players});
  }

  render() {
    return (
      <div>
        {this.state.waitingRoom ? <h1>{JSON.stringify(this.state.waitingRoom)}</h1> : <h1>Nothing here</h1>}
      </div>
    )
  }
}

export default WaitingRoomPage;