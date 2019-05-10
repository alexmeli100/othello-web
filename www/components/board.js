import React, { Component } from 'react';
import Square from './square';

/**
 * DQ:
 * Don't need to hard-code row values if keeping cells as single-dim array.
 * See changes to `render`.
 */
// const rows = [11, 21, 31, 41, 51, 61, 71, 81];

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.cells = props.cells;
  }

  /**
   * DQ:
   * Don't need to parse the cell array for ranges.  See change to `render`.
   */
  // range(start, end) {
  //   return (new Array(end -start + 1)).fill(undefined).map((_, i) => i + start);
  // }

  /**
   * DQ:
   * Don't need to render rows one by one any more. See changes to `render`.
   */
  // renderRow(i) {
  //   return (
  //     <div className="board-row" key={i}> 
  //       { this.range(i, i+7).map(k => <Square key={k} id={k} value={this.state.cells[k]}/>) }
  //     </div>
  //   );
  // }

  /**
   * Render the board.
   */
  render() {
    /**
     * DQ:
     * Need to convert the board to a regular JS array, otherwise the `map` call
     * below just returns `0`s.
     */
    const cells = Array.from(this.cells);

    /**
     * DQ:
     * The cells of the board are stored as a single-dimension array, so just
     * map that and rely on CSS-Grid to create the board.
     */
    return (
      cells.map((cell, index) => {
        return (<Square key={index} id={index} type={cell} />)
      })
    );
  }
}

export default GameBoard;