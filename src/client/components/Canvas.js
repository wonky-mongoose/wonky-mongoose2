import React from 'react';
import paper, { Path, PaperScope, Color} from 'paper';
import { throttle } from 'underscore';
//require("expose?paper!paper");
export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myCanvas = document.getElementById('myCanvas');
    myCanvas.width = 900;
    myCanvas.height = 400;
    paper.setup(myCanvas);
    var width = paper.view.size.width;
    var height = paper.view.size.height;
    var path = new Path();
    let down = false;

    var updatePath = throttle((e) => {
      path.strokeColor = 'black';
      //path.smooth();
      path.add(e.point);
      
    }, 25);
    paper.project.view.onMouseDown = (e) => {
      down = true;
    }
    paper.project.view.onMouseUp = (e) => {
      down = false;
      path = new Path();
    }
    paper.project.view.onMouseMove = (e) => {
      if(down) {
        updatePath(e);
      }
    }

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
