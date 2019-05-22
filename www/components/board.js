import React, { Component } from 'react';
import Square from './square';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.cells = props.cells;
  }

  render() {
    const cells = Array.from(this.cells);

    return (
      cells.map((cell, index) => {
        return (<Square key={index} id={index} type={cell} />)
      })
    );
  }
}

export default GameBoard;