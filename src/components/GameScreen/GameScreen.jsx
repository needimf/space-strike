import React from 'react';
import GamePanels from './../GamePanels/GamePanels';

const GameScreen = (props) => {
  return (
      <GamePanels 
        myGameData={props.myGameData}
        game={props.game}
        user={props.user}
        handleTorpedoFire={props.handleTorpedoFire}
        handleShipPlacement={props.handleShipPlacement}
        handleShipSelection={props.handleShipSelection}
        handleOrientationChange={props.handleOrientationChange}
        selectedShip={props.selectedShip}
        orientation={props.orientation}
      />
  );
}

export default GameScreen;