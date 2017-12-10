import React from 'react';
import Grids from './../Grids/Grids';

const GameScreen = (props) => {
  return (
    <div>
      <Grids 
        playerGrids={(props.playerOneTurn ? props.playerOneGrids : props.playerTwoGrids)}
      />
    </div>
  );
}

export default GameScreen;