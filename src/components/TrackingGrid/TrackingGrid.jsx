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
              className={`tracking-cell${cell.isHit ? ' hit' : ''}${cell.isMiss ? ' miss' : ''}`}
              data-row={index}
              data-col={i}
              onClick={(e) => {props.handleShot(e)}}
            />
          );
        })
       }
      </tr>
    );
  });

  return(
    <div className="col-6">
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingGrid;