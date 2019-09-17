import { Board }  from "../pkg/othello_web";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GameBoard from './components/board';

const board = Board.new();

class App extends Component {
  render() {
     return <GameBoard board={board} />;
  }
}

ReactDOM.render(<App />, document.querySelector(".board"));




