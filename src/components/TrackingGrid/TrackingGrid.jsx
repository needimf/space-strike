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
              className={`tracking-cell${cell ? ` ${cell}` : ''}`}
              data-row={rowIdx}
              data-col={colIdx}
              onClick={() => props.handleTorpedoFire(rowIdx, colIdx)}
            />
          );
        })
       }
      </tr>
    );
  });

  return(
    <div className="col m6 s12">
      <h5 className="center-align">Shooting Grid</h5>
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingGrid;