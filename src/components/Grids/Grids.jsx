import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';

const Grids = (props) => {
  return (
    <div>
      <PrimaryGrid grid={props.playerGrids.primaryGrid} />
      <TrackingGrid grid={props.playerGrids.trackingGrid} />
    </div>
  );
}

export default Grids;