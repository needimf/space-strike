import React from 'react';
import GamePanels from './../GamePanels/GamePanels';

const GameScreen = (props) => {
  return (
      <GamePanels 
        myGameData={props.myGameData}
        game={props.game}
        user={props.user}
        handleMissileFire={props.handleMissileFire}
        handleShipPlacement={props.handleShipPlacement}
        handleShipSelection={props.handleShipSelection}
        handleOrientationChange={props.handleOrientationChange}
        selectedShip={props.selectedShip}
        orientation={props.orientation}
        checkIfValidPlacement={props.checkIfValidPlacement}
        handlePrimaryGridCellHover={props.handlePrimaryGridCellHover}
        handlePrimaryGridCellLeaveHover={props.handlePrimaryGridCellLeaveHover}
      />
  );
}

export default GameScreen;