import React, {Component} from 'react';

class WaitingRoomPage extends Component {
  componentDidMount() {
    this.props.socket.emit('get-players-in-waiting-room');
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default WaitingRoomPage;