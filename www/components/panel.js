import React, { Component } from 'react';
import { Piece } from '../../pkg/othello_web';

class InfoPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { turn } = this.props;

    return (
      <div className="info">{turn === Piece.BLACK ? 'Black' : 'White'}</div>
    );
  }
}

export default InfoPanel;