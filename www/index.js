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

    this.state = {
      cells: new Uint8Array(memory.buffer, this.board.cells(), 100),
      count: {
        white: this.board.count_piece(Piece.WHITE),
        black: this.board.count_piece(Piece.BLACK)
      },
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
    const { board } = this;
    const { turn } = this.state;

    if (Board.valid_move(cellId) && board.legal_move(turn, cellId)) {
      // Perform player move
      board.make_move(cellId, this.state.turn);

      // Update cells and turn.
      this.setState({
        cells: new Uint8Array(memory.buffer, this.board.cells(), 100),
        count: {
          white: this.board.count_piece(Piece.WHITE),
          black: this.board.count_piece(Piece.BLACK)
        },
        turn: this.state.turn === Piece.BLACK ? Piece.WHITE : Piece.BLACK,
      });
    } else {
    }
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




