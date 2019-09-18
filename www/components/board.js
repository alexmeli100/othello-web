
import React, { Component } from 'react';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.takeTurn = props.takeTurn;
  }

  /**
   * Handle when one of the board squares are clicked.  For now, just makes the
   * move for the player with no checks.
   *
   * @param {number} cellId The `id` of the clicked cell.
   */
  onSquareClick(cellId) {
    this.takeTurn(cellId);
  }

  /**
   * Render the board.
   */
  render() {
    const cells = Array.from(this.props.cells);

    return (
      <div className="board">
        {cells.map((cell, index) => {
          let cn = 'cell';
          if (cell === 3) {
            cn += ' cell--edge';
          }

          let pn = 'piece';
          if (cell === 0) {
            pn += ' piece--black';
          }
          if (cell === 1) {
            pn += ' piece--white';
          }

          return (
            <div key={index} className={cn} onClick={this.onSquareClick.bind(this, index)}>
              <div className={pn} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default GameBoard;