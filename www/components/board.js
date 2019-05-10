import React, { Component } from 'react';
import Square from './square';

const rows = [11, 21, 31, 41, 51, 61, 71, 81];

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: props.cells
    };
  }

  range(start, end) {
    return (new Array(end -start + 1)).fill(undefined).map((_, i) => i + start);
  }

  renderRow(i) {
    return (
      <div className="board-row" key={i}> 
        { this.range(i, i+7).map(k => <Square key={k} id={k} value={this.state.cells[k]}/>) }
      </div>
    );
  }

  render() {
    return (
      <div className="board"> 
        {rows.map(i => this.renderRow(i))}
      </div>
    );
  }
}

export default GameBoard;