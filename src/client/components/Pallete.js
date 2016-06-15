import React, { Component } from 'react';

class Pallete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'btn-floating btn-large black',
      icon: 'mode_edit',
    };
  }

  changeTool(color) {
    this.props.changeColor(color);
    this.setState({
      current: `btn-floating btn-large ${color === 'white' ? 'black' : color}`,
      icon: color === 'white' ? 'delete' : 'mode_edit',
    })
  }

  render() {
    return (
      <div className="fixed-action-btn horizontal" style={{bottom: '20px', right: '20px'}}>
        <a className={this.state.current}>
          <i className="large material-icons">{this.state.icon}</i>
        </a>
        <ul>
          <li onClick={() => this.changeTool('black')}><a className="btn-floating black"><i className="material-icons">invert_colors</i></a></li>
          <li onClick={() => this.changeTool('red')}><a className="btn-floating red"><i className="material-icons">invert_colors</i></a></li>
          <li onClick={() => this.changeTool('yellow')}><a className="btn-floating yellow darken-1"><i className="material-icons">invert_colors</i></a></li>
          <li onClick={() => this.changeTool('green')}><a className="btn-floating green"><i className="material-icons">invert_colors</i></a></li>
          <li onClick={() => this.changeTool('blue')}><a className="btn-floating blue"><i className="material-icons">invert_colors</i></a></li>
          <li onClick={() => this.changeTool('white')}><a className="btn-floating red"><i className="material-icons">delete</i></a></li>
        </ul>
      </div>
    )
  }
}

export default Pallete;
