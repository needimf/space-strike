import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';

const Grids = (props) => {
  return (
    <div className="row">
      <PrimaryGrid grid={props.playerGrids.primaryGrid} />
      <TrackingGrid 
        grid={props.playerGrids.trackingGrid}
        handleShot={props.handleShot}
      />
    </div>
  );
}

export default Grids;