import React from 'react';
import Grids from './../Grids/Grids';

const GameScreen = (props) => {
  return (
      <Grids 
        playerGrids={(props.playerOneTurn ? props.playerOneGrids : props.playerTwoGrids)}
        handleShot={props.handleShot}
      />
  );
}

export default GameScreen;