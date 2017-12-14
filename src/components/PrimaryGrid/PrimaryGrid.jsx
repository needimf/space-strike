import React from 'react';
import './PrimaryGrid.css';

const PrimaryGrid = (props) => {
  function handleEnterHover(row, col) {
    if (props.selectedShip) {
      let player = props.user.turnNo === 0 ? 'player1' : 'player2';
      let length = props.ships[props.selectedShip].length;
      
      if (props.checkIfValidPlacement(props.selectedShip, props.orientation, row, col, player)) {
        while (length > 0) {
          document.getElementById(`${row}${col}`).classList.add('PrimaryGrid-hover');
          props.orientation === 'horizontal' ? col += 1 : row += 1;
          length -= 1;
        }
      }
    }
  }

  function handleLeaveHover(row, col) {
    if (props.selectedShip) {
      let length = props.ships[props.selectedShip].length;
      while (length > 0 && col < 10 && row < 10) {
        document.getElementById(`${row}${col}`).classList.contains('PrimaryGrid-hover') && document.getElementById(`${row}${col}`).classList.remove('PrimaryGrid-hover');
        props.orientation === 'horizontal' ? col += 1 : row += 1;
        length -= 1;
      }
    }
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
              className={`PrimaryGrid-cell${cell.ship ? ' PrimaryGrid-ship' : ''}`}
              onClick={props.handleShipPlacement ? () => props.handleShipPlacement(props.selectedShip, props.orientation, rowIdx, colIdx) : null}
              onMouseEnter={() => handleEnterHover(rowIdx, colIdx)}
              onMouseLeave={() => handleLeaveHover(rowIdx, colIdx)}
              id={`${rowIdx}${colIdx}`}
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