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
              className={`primary-cell${cell.ship ? ' ship' : ''}`}
              onClick={props.handleShipPlacement ? () => props.handleShipPlacement(props.selectedShip, props.orientation, rowIdx, colIdx) : ''}
            ></td>
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

export default PrimaryGrid;