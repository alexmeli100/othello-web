import { memory } from "../pkg/othello_web_bg";
import { Board }  from "../pkg/othello_web";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GameBoard from './components/board';

const board = Board.new();
const cellsPtr = board.cells();
const cells = new Uint8Array(memory.buffer, cellsPtr, 100);

class App extends Component{
  render() {
     return <GameBoard cells={cells}/>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));




