import React, { Component } from 'react';
import { Piece } from '../../pkg/othello_web';

class InfoPanel extends Component {

  constructor(props) {
    super(props);
    this.turn = props.turn;
  }

  render() {
    return (
      <div className="info">{this.turn === Piece.BLACK ? 'Black' : 'White'}</div>
    );
  }
}

export default InfoPanel;