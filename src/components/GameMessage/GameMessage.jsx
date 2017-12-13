import React from 'react';

const GameMessage = (props) => {
  let message = '';
  if (props.user.currentGame && !props.game.gameOver) {
    message = props.game.currentTurn === props.user.turnNo ? 'Click on a cell to fire a torpedo!' : 'Waiting for opponent to fire torpedo...';
  } else if (props.user.currentGame && props.game.gameOver) {
    message = props.game.winner === props.user._id ? 'You defeated your opponent!' : 'You have been defeated...';
  } else {
    message = 'Waiting for another player...'
  }

  return (
    <div className="row">
      <h1>{message}</h1>
    </div>
  );
}

export default GameMessage;