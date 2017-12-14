import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';
import ShipPlacementPanel from './../ShipPlacementPanel/ShipPlacementPanel';

const GamePanels = (props) => {
  let panels = 
    <div className="row">
      <h6>We hope to pair you up soon!</h6>
    </div>;
  if (props.game.gameStatus) {
    if (props.game.gameStatus === 'begin') {
      panels = 
        <div className="row">
          <ShipPlacementPanel 
            ships={props.game.shipTypes}
            placedShips={props.myGameData.placedShips}
            handleShipPlacement={props.handleShipPlacement}
            handleShipSelection={props.handleShipSelection}
            handleOrientationChange={props.handleOrientationChange}
            orientation={props.orientation}
            selectedShip={props.selectedShip}
          />
          <PrimaryGrid 
            grid={props.myGameData.grids.primaryGrid}
            handleShipPlacement={props.handleShipPlacement}
            selectedShip={props.selectedShip}
            orientation={props.orientation}
            checkIfValidPlacement={props.checkIfValidPlacement}
            ships={props.game.shipTypes}
            user={props.user}
          />
        </div>;
    } else {
      panels = 
      <div className="row">
        <TrackingGrid 
          grid={props.myGameData.grids.trackingGrid}
          handleTorpedoFire={props.handleTorpedoFire}
        />
        <PrimaryGrid 
          grid={props.myGameData.grids.primaryGrid}
        />
      </div>;
    }
  }

  return (
    panels
  );
}

export default GamePanels;