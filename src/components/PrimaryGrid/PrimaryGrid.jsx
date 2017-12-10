import React from 'react';
import './PrimaryGrid.css';

const PrimaryGrid = (props) => {
  let tableBody = props.grid.slice()
  tableBody = tableBody.map((row, index) => {
    return (
      <tr key={index}>
       {
        row.map((cell, i) => {
          return (
             <td key={`${index}${i}`} className={`${cell.hasShip ? 'ship' : ''}`}></td>
          );
        })
       }
      </tr>
    );
  });

  return(
    <div>
      <table>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

export default PrimaryGrid;