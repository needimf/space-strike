import React from 'react';
import PrimaryGrid from './../PrimaryGrid/PrimaryGrid';
import TrackingGrid from './../TrackingGrid/TrackingGrid';

const Grids = (props) => {
  return (
    <div className="row">
      <PrimaryGrid grid={props.myGrids.primaryGrid} />
      <TrackingGrid 
        grid={props.myGrids.trackingGrid}
      />
    </div>
  );
}

export default Grids;