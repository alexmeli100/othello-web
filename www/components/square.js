import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);

    this.type = props.type;
    this.id = props.id;
  }

  display_id(id) {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    if (id === 0 || id === 90) {
      return undefined;
    }

    if (id % 10 === 0)
      return <div>{Math.floor(id / 10)}</div>

      if (id > 90) {
        return <div>{chars[id-91]}</div>
    }
}


  render() {
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
      <div className={cn} >
        {this.display_id(this.id)}
        <div className={pn} />
      </div>
    );
  }
}

export default Square;
