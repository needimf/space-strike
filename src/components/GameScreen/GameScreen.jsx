import React from 'react';
import Grids from './../Grids/Grids';

const GameScreen = (props) => {
  return (
      <Grids 
        myGrids={props.myPlayerData.grids}
        game={props.game}
        user={props.user}
        handleTorpedoFire={props.handleTorpedoFire}
      />
  );
}

export default GameScreen;