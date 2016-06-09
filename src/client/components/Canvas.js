import React from 'react';
import paper, { Path, PaperScope, Color, Point} from 'paper';
import { throttle } from 'underscore';
import io from 'socket.io-client';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.connection = io.connect();
    this.path = null;
    this.stroke = {
      color: 'black',
      width: 3
    }
    this.isMouseDown = false;
    var updateP = throttle((this.updatePath).bind(this), 25);
    this.connection.on('connect', ((sock) => {
      console.log('connected!');
      this.connection.on('updatePath', (point) => {
        updateP(new Point(point.x, point.y));
      })
    }).bind(this));
  }

  emitPath(e) {
    this.connection.emit('updatePath', {x : e.point.x, y: e.point.y});
  }

  updatePath(point) {
    this.path.add(point);
  }

  componentDidMount() {
    var myCanvas = document.getElementById('myCanvas');
    // myCanvas.width = 900;
    // myCanvas.height = 400;
    paper.setup(myCanvas);
    this.path = new Path();
    this.path.strokeColor = this.stroke.color;
    this.path.strokeWidth = this.stroke.width;
    paper.project.view.onMouseDown = ((e) => {
      this.isMouseDown = true;
      this.emitPath(e);
    }).bind(this);

    paper.project.view.onMouseUp = ((e) => {
      this.isMouseDown = false;
      this.path = new Path();
      this.path.strokeColor = this.stroke.color;
      this.path.strokeWidth = this.stroke.width;
    }).bind(this);

    paper.project.view.onMouseMove = ((e) => {
      if(this.isMouseDown) {
        this.emitPath(e);
      }
    }).bind(this);

    paper.view.draw();
  }

  onClickDraw() {
    this.path = new Path();
    this.stroke.color = 'black';
    this.stroke.width = '3';
    this.path.strokeColor = this.stroke.color;
    this.path.strokeWidth = this.stroke.width;
  }

  onClickErase() {
    this.path = new Path();
    this.stroke.color = 'white';
    this.stroke.width = '30';
    this.path.strokeColor = this.stroke.color;
    this.path.strokeWidth = this.stroke.width;
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.onClickDraw.bind(this)} className="draw-btn waves-effect waves-light btn" >Draw</button>
          <button onClick={this.onClickErase.bind(this)} className="erase-btn waves-effect waves-light btn" >Erase</button>
        </div>
        <div><canvas className='card' id='myCanvas' resize='true'></canvas></div>
      </div>
    )
  }

}
