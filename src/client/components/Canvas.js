import React from 'react';
import paper, { Path, PaperScope, Color, Point} from 'paper';
import { throttle } from 'underscore';
import io from 'socket.io-client';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.connection = io.connect('http://localhost:3000');
    this.path = null;
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
    this.path.strokeColor = 'black';
    //path.smooth();
    this.path.add(point);
  }

  componentDidMount() {
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = 900;
    myCanvas.height = 400;
    paper.setup(myCanvas);
    this.path = new Path();

    paper.project.view.onMouseDown = ((e) => {
      this.isMouseDown = true;
      this.emitPath(e);
    }).bind(this);

    paper.project.view.onMouseUp = ((e) => {
      this.isMouseDown = false;
      this.path = new Path();
    }).bind(this);

    paper.project.view.onMouseMove = ((e) => {
      if(this.isMouseDown) {
        this.emitPath(e);
      }
    }).bind(this);

    paper.view.draw();
  }




  render() {
    return (
      <div>
        <canvas id='myCanvas' resize='true'></canvas>
      </div>
    )
  }

}
