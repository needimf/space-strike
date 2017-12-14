import React from 'react';

const GameMessage = (props) => {
  let message = '';
  let instructions = '';
  if (!props.user.currentGame) {
    message = 'Waiting for another player...';
  } else {
    if (!(props.game.gameStatus === 'battle')) {
      message = 'Game starting up!';
      instructions = 'Place your ships on the board';
    } else {
      if (!props.game.gameOver) {
        if (props.game.currentTurn === props.user.turnNo) {
          message = 'Your turn!';
          instructions = 'Click on a cell to fire a missile!';
        } else {
          message = "Opponent's turn!";
          instructions = 'Brace for impact!';
        }
      } else {
        message = props.game.winner === props.user._id ? 'You won!' : 'You lost.';
      }
    }
  }

  return (
    <div className="grey lighten-1">
      <div style={{margin: '0 0 0.5rem', padding: '1.9466666667rem 0.5rem'}}>
        <h3 className="center-align white-text" style={{margin: '0 0 0.5rem'}} >{message}</h3>
        <p className="center-align white-text" style={{margin: '0.5rem 0 0'}}>{instructions}</p>
      </div>
    </div>
  );
}

export default GameMessage;