import React from 'react';
import './ShipPlacementPanel.css';

const ShipPlacementPanel = (props) => {
  let shipsToPlace = [];
  for (let ship in props.ships) {
    if (!props.placedShips.includes(ship)) {
      shipsToPlace.push(ship);
    }
  }
  shipsToPlace = shipsToPlace.length > 0 ?
    shipsToPlace.map((ship, idx) => {
      return (
        <div 
          key={idx} 
          className={`center-align ShipPlacementPanel-ship${props.selectedShip === ship ? ' ShipPlacementPanel-selected' : ''}`} 
          onClick={() => props.handleShipSelection(ship)} 
        >
          {ship}
        </div>
      )
    })
    :
    <p>Waiting on other player to place their ships..</p>;

  return (
    <div className="col m6 s12" >
      <h5 className="center-align">Ships</h5>
      <div className="row ShipPlacementPanel-ship-selector">
        {shipsToPlace}
      </div>
      <div className="row">
        <h6 className="center-align">Orientation | {props.orientation.toUpperCase()}</h6>
      </div>
      <div className="row">
        <div className="center-align">
          <button className="btn grey darken-2 grey-text text-lighten-4 " onClick={() => props.handleOrientationChange()} >Rotate Ship</button>
        </div>
      </div>
    </div>
  );
}

export default ShipPlacementPanel;