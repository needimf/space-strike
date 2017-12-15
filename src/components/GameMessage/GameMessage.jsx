import React from 'react';
import { Link } from 'react-router-dom';

const GameMessage = (props) => {
  let message = '';
  let instructions = <br/>;
  if (!props.user.currentGame) {
    message = 'Waiting for another player...';
  } else {
    if (!(props.game.gameStatus === 'battle')) {
      message = 'Game starting up!';
      instructions = <p className="center-align white-text" style={{margin: '0.5rem 0 0'}}>Place your ships on the board</p>
    } else {
      if (!props.game.gameOver) {
        if (props.game.currentTurn === props.user.turnNo) {
          message = 'Your turn!';
          instructions = <p className="center-align white-text" style={{margin: '0.5rem 0 0'}}>Click on a cell to fire a missile!</p>
        } else {
          message = "Opponent's turn!";
          instructions = <p className="center-align white-text" style={{margin: '0.5rem 0 0'}}>Brace for impact!</p>
        }
      } else {
        message = props.game.winner === props.user._id ? 'You won!' : 'You lost.';
        instructions =
          <div className="container">
            <div className="row">
              <div className="col s6 center-align">
                <Link className="btn blue-grey lighten-3 blue-grey-text text-darken-3" to="/">Back Home</Link>
              </div>
              <div className="col s6 center-align">
                <button className="btn blue-grey darken-3 blue-grey-text text-lighten-3" onClick={() => props.handlePlayAgain()}>Play Again</button>
              </div>
            </div>
          </div>
      }
    }
  }

  return (
    <div className="grey lighten-1">
      <div style={{margin: '0 0 0.5rem', padding: '1.9466666667rem 0.5rem 1rem'}}>
        <h3 className="center-align white-text" style={{margin: '0 0 0.5rem'}} >{message}</h3>
        <div id="instructions-message" style={{margin: '0', padding: '0'}}>
          {instructions}
          {props.forfeitMsg && <p className="center-align white-text" style={{margin: '0.5rem 0 0'}}>{props.forfeitMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default GameMessage;