import React from 'react';
import GameScreen from './../../components/GameScreen/GameScreen';

const GameplayPage = (props) => {
  return (
    <div className="container">
      <div className="row">
        <h1>Gameplay Screen</h1>
      </div>
      <GameScreen 
        playerOneTurn={props.playerOneTurn}
        playerOneGrids={props.playerOneGrids}
        playerTwoGrids={props.playerTwoGrids}
        gameOver={props.gameOver}
        winner={props.winner}
        handleShot={props.handleShot}
      />
    </div>
  )
}

export default GameplayPage;