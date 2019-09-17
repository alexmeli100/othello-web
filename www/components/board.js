import { memory } from "../../pkg/othello_web_bg";
import { Board, Piece }  from "../../pkg/othello_web";
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Square from './square';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.board = props.board;
    this.state = {
      cells: new Uint8Array(memory.buffer, this.board.cells(), 100),
      turn: Piece.BLACK
    }
  }

  /**
   * Handle when one of the board squares are clicked.  For now, just makes the
   * move for the player with no checks.
   *
   * @param {number} cellId The `id` of the clicked cell.
   */
  onSquareClick(cellId) {
    console.log(cellId);
    this.board.make_move(cellId, this.state.turn);
    this.setState({
      cells: new Uint8Array(memory.buffer, this.board.cells(), 100),
      turn: this.state.turn === Piece.BLACK ? Piece.WHITE : Piece.BLACK,
    });
  }

  /**
   * Render the board.
   */
  render() {
    const cells = Array.from(this.state.cells);

    return (
      cells.map((cell, index) => {
        let cn = 'square';
        if (cell === 3) {
          cn += ' square--edge';
        }

        let pn = 'piece';
        if (cell === 0) {
          pn += ' piece--black';
        }
        if (cell === 1) {
          pn += ' piece--white';
        }

        return (
          <div className={cn} onClick={this.onSquareClick.bind(this, index)}>
            <div className={pn} />
          </div>
        )
      })
    )
  }
}

export default hot(module)(GameBoard);