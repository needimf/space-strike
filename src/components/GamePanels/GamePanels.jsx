import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';
import ShipPlacementPanel from './../ShipPlacementPanel/ShipPlacementPanel';

const GamePanels = (props) => {
  return (
    <div className="row">
      {props.game.gameStatus === 'begin' ?
        <PrimaryGrid 
          grid={props.myGameData.grids.primaryGrid}
          handleShipPlacement={props.handleShipPlacement}
          selectedShip={props.selectedShip}
          orientation={props.orientation}
        />
        :
        <PrimaryGrid 
          grid={props.myGameData.grids.primaryGrid}
        />
      }
      {props.game.gameStatus === 'begin' ? 
        <ShipPlacementPanel 
          ships={props.game.shipTypes}
          placedShips={props.myGameData.placedShips}
          handleShipPlacement={props.handleShipPlacement}
          handleShipSelection={props.handleShipSelection}
          handleOrientationChange={props.handleOrientationChange}
          orientation={props.orientation}
        /> 
        : 
        <TrackingGrid 
          grid={props.myGameData.grids.trackingGrid}
          handleTorpedoFire={props.handleTorpedoFire}
        />
      }
    </div>
  );
}

export default GamePanels;