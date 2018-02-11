import React from 'react';
import './TrackingGrid.css'

const TrackingGrid = (props) => {
  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, rowIdx) => {
    return (
      <tr key={rowIdx}>
       {
        row.map((cell, colIdx) => {
          return (
            <td 
              key={`${rowIdx}${colIdx}`}
              className={`TrackingGrid-cell`}
              data-row={rowIdx}
              data-col={colIdx}
              onClick={() => props.handleMissileFire(rowIdx, colIdx)}
            >
              <div className={`TrackingGrid-peg${cell ? ` TrackingGrid-${cell}` : ''}`} />
            </td>
          );
        })
       }
      </tr>
    );
  });

  return(
    <div className="col m6 s12">
      <h5 className="center-align">Shooting Grid</h5>
      <table id="tracking-grid">
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingGrid;