import React from 'react';

const GameMessage = (props) => {
  let message = '';
  if (!props.user.currentGame) {
    message = 'Waiting for another player...'
  } else {
    if (!(props.game.gameStatus === 'battle')) {
      message = 'Place your ships'
    } else {
      if (!props.game.gameOver) {
        message = props.game.currentTurn === props.user.turnNo ? 'Click on a cell to fire a torpedo!' : 'Waiting for opponent to fire torpedo...';
      } else {
        message = props.game.winner === props.user._id ? 'You defeated your opponent!' : 'You have been defeated...';
      }
    }
  }

  return (
    <div className="row">
      <h1>{message}</h1>
    </div>
  );
}

export default GameMessage;