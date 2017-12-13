import React from 'react';
import './TrackingGrid.css'

const TrackingGrid = (props) => {
  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, index) => {
    return (
      <tr key={index}>
       {
        row.map((cell, i) => {
          return (
            <td 
              key={`${index}${i}`}
              className={`tracking-cell${cell ? ` ${cell}` : ''}`}
              data-row={index}
              data-col={i}
              onClick={(e) => (props.handleTorpedoFire(e))}
            />
          );
        })
       }
      </tr>
    );
  });

  return(
    <div className="col s6">
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingGrid;