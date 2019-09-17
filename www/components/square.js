import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);

    this.type = props.type;
    this.id = props.id;
    this.squareClick = props.squareClick;
  }

  render() {
    /**
     * DQ:
     * Suggest using BEM-style CSS names for clarity and organization.
     * See http://getbem.com/naming/
     */
    let cn = 'square';
    if (this.type === 3) {
      cn += ' square--edge';
    }

    let pn = 'piece';
    if (this.type === 0) {
      pn += ' piece--black';
    }
    if (this.type === 1) {
      pn += ' piece--white';
    }

    return (
      <div className={cn} onClick={this.squareClick}>
        <div className={pn} />
      </div>
    );
  }
}

export default Square;
