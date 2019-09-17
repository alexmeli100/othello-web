import { Board, Piece }  from "../pkg/othello_web";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GameBoard from './components/board';
import InfoPanel from './components/panel';

const board = Board.new();

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      turn: Piece.BLACK
    }
  }

  takeTurn() {
    const turn = this.state.turn;
    this.setState({
      turn: turn === Piece.BLACK ? Piece.WHITE : Piece.BLACK,
    })
  }

  render() {
    const turn = this.state.turn;

    return ([
      <GameBoard board={board} turn={turn} takeTurn={this.takeTurn.bind(this)} />,
      <InfoPanel turn={turn} />
    ])
  }
}

ReactDOM.render(<Game />, document.querySelector(".game"));




