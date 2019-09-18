import { memory } from "../pkg/othello_web_bg";
import { Board, Piece }  from "../pkg/othello_web";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GameBoard from './components/board';
import InfoPanel from './components/panel';

const board = Board.new();

class Game extends Component {
  constructor(props) {
    super(props)

    this.board = Board.new();

    const cells = new Uint8Array(memory.buffer, this.board.cells(), 100);
    const count = {
      white: cells.filter(val => val === Piece.WHITE).length,
      black: cells.filter(val => val === Piece.BLACK).length
    }

    this.state = {
      cells: cells,
      count: count,
      turn: Piece.BLACK
    }
  }

  /**
   * Handle when a turn is taken (a cell is selected to have a piece placed in
   * it).
   *
   * @param {number} cellId The `id` of the clicked cell.
   */
  takeTurn(cellId) {
    // Perform player move
    this.board.make_move(cellId, this.state.turn);

    // Update cells and turn.
    const cells = new Uint8Array(memory.buffer, this.board.cells(), 100);
    const count = {
      white: cells.filter(val => val === Piece.WHITE).length,
      black: cells.filter(val => val === Piece.BLACK).length
    }

    this.setState({
      cells: cells,
      count: count,
      turn: this.state.turn === Piece.BLACK ? Piece.WHITE : Piece.BLACK,
    });
  }

  render() {
    const { turn, cells, count } = this.state;

    return ([
      <GameBoard key="board" cells={cells} takeTurn={this.takeTurn.bind(this)} />,
      <InfoPanel key="panel" turn={turn} count={count} />
    ])
  }
}

ReactDOM.render(<Game />, document.querySelector(".game"));




