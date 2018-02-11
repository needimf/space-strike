import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';
import ShipPlacementPanel from './../ShipPlacementPanel/ShipPlacementPanel';

const GamePanels = (props) => {
  let panels = 
    <div className="row">
      <h3 className="center-align grey-text text-darken-4">Prepare for Takeoff!</h3>
      <div className="center-align">
        <img className="responsive-img center-align" src="https://i.imgur.com/pJqB2pt.png" alt="Space Strike logo" />
      </div>
    </div>;
  if (props.game.gameStatus) {
    if (props.game.gameStatus === 'begin') {
      panels = 
        <div className="row valign-wrapper">
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
            handlePrimaryGridCellHover={props.handlePrimaryGridCellHover}
            handlePrimaryGridCellLeaveHover={props.handlePrimaryGridCellLeaveHover}
          />
        </div>;
    } else {
      panels = 
      <div className="row">
        <TrackingGrid 
          grid={props.myGameData.grids.trackingGrid}
          handleMissileFire={props.handleMissileFire}
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