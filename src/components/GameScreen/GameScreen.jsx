import React from 'react';
import Grids from './../Grids/Grids';

const GameScreen = (props) => {
  return (
      <Grids 
        playerGrids={props.playerGrids}
        handleShot={props.handleShot}
      />
  );
}

export default GameScreen;