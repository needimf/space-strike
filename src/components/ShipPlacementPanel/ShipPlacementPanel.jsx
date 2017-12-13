import React from 'react';

const ShipPlacementPanel = (props) => {
  let shipsToPlace = [];
  for (let ship in props.ships) {
    if (!props.placedShips.includes(ship)) {
      shipsToPlace.push(ship);
    }
  }
  shipsToPlace = shipsToPlace.length > 0 ?
    shipsToPlace.map((ship, idx) => <div key={idx} onClick={() => props.handleShipSelection(ship)} >{ship}</div>)
    :
    <p>Waiting on other player to place their ships..</p>;

  return (
    <div className="col s6">
      <div className="row">
        <h3 className="col s12">Ships Left:</h3>
      </div>
      <div className="row">
        {shipsToPlace}
      </div>
      <div className="row">
        Orientation: {props.orientation}
      </div>
      <div className="row">
        <button className="btn col s12" onClick={() => props.handleOrientationChange()} >Rotate Ship</button>
      </div>
    </div>
  );
}

export default ShipPlacementPanel;