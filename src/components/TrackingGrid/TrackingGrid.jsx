import React from 'react';
import './TrackingGrid.css'

const TrackingGrid = (props) => {
  function handleCellHoverEnter(row, col) {
    document.getElementById(`${row}${col}`).classList.add('TrackingGrid-cell-hover');
  }
  
  function handleCellHoverLeave(row, col) {
    document.getElementById(`${row}${col}`).classList.contains('TrackingGrid-cell-hover') && document.getElementById(`${row}${col}`).classList.remove('TrackingGrid-cell-hover');
  }

  function handleTableHoverEnter() {
    document.getElementById('tracking-grid').classList.add('TrackingGrid-table-hover');
  }
  
  function handleTableHoverLeave() {
    document.getElementById('tracking-grid').classList.remove('TrackingGrid-table-hover');
  }

  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, rowIdx) => {
    return (
      <tr key={rowIdx}>
       {
        row.map((cell, colIdx) => {
          return (
            <td 
              key={`${rowIdx}${colIdx}`}
              id={`${rowIdx}${colIdx}`}
              className={`TrackingGrid-cell`}
              data-row={rowIdx}
              data-col={colIdx}
              onClick={() => props.handleTorpedoFire(rowIdx, colIdx)}
              onMouseEnter={!cell ? () => handleCellHoverEnter(rowIdx, colIdx) : null}
              onMouseLeave={() => handleCellHoverLeave(rowIdx, colIdx)}
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
      <table 
        id="tracking-grid"
        onMouseEnter={() => handleTableHoverEnter()}
        onMouseLeave={() => handleTableHoverLeave()}
      >
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default TrackingGrid;