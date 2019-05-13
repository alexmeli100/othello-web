import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);

    this.type = props.type;
    this.id = props.id;
  }

  /**
   * DQ:
   * The type of the square is handled within `render`.
   */
  // renderSquare(v) {
  //   switch(v) {
  //     case 1:
  //       return 1;
  //     case 0:
  //       return 0;
  //     default:
  //       return "";
  //   }
  // }

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
      <div className={cn}>
        <div className={pn} />
      </div>
    );
  }
}

export default Square;
