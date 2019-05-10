import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      id: props.id
    };
  }

  renderSquare(v) {
    switch(v) {
      case 1:
        return 1;
      case 0:
        return 0;
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="square">
        {this.renderSquare(this.state.value)}
      </div>
    );
  }
}

export default Square;
