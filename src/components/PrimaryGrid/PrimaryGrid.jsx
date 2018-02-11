import React from 'react';
import './PrimaryGrid.css';

const PrimaryGrid = (props) => {

  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, rowIdx) => {
    return (
      <tr key={rowIdx}>
       {
        row.map((cell, colIdx) => {
          return (
             <td 
              key={`${rowIdx}${colIdx}`}
              className={`PrimaryGrid-cell${cell.hover ? ' PrimaryGrid-hover' : ''}${cell.ship ? ' PrimaryGrid-ship' : ''}`}
              onClick={props.handleShipPlacement ? () => props.handleShipPlacement(props.selectedShip, props.orientation, rowIdx, colIdx) : null}
              onMouseEnter={props.handleShipPlacement ? () => props.handlePrimaryGridCellHover(rowIdx, colIdx) : null }
              onMouseLeave={props.handleShipPlacement ? () => props.handlePrimaryGridCellLeaveHover(rowIdx, colIdx) : null }
            >
              <div className={`PrimaryGrid-peg${cell.sunk ? ' PrimaryGrid-sunk' : ''}${cell.hit ? ' PrimaryGrid-hit' : ''}${cell.miss ? ' PrimaryGrid-miss' : ''}`} />
            </td>
          );
        })
       }
      </tr>
    );
  });

  return(
    <div className="col s12 m6">
      <h5 className="center-align">Your Ships</h5>
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default PrimaryGrid;