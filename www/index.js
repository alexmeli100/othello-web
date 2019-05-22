import { memory } from "../pkg/othello_web_bg";
import { Board }  from "../pkg/othello_web";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import GameBoard from './components/board';

const board = Board.new();
const cellsPtr = board.cells();
const cells = new Uint8Array(memory.buffer, cellsPtr, 100);

class App extends Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const b = document.querySelector('.board');

    b.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    console.log(`clicked square ${e.target.id}`);
  }

  render() {
     return <GameBoard cells={cells} />;
  }
}

ReactDOM.render(<App />, document.querySelector(".board"));




