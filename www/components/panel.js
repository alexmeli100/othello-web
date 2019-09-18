import React, { Component } from 'react';
import { Piece } from '../../pkg/othello_web';

class InfoPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { turn, count } = this.props;

    return (
      <div className="info">
        <div className="info-section">
          <div className="info-section__title">
            Current turn:
          </div>
          <div className="info-section__content">
            {turn === Piece.BLACK ? 'Black' : 'White'}
          </div>
        </div>
        <div className="info-section">
          <div className="info-section__title">
            Score:
          </div>
          <div className="info-section__content">
            W {count.white} - B {count.black}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;