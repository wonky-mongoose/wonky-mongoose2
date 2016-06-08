import React from 'react';
import paper, { Path, PaperScope, Color} from 'paper';
//require("expose?paper!paper");
export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var myCanvas = document.getElementById('myCanvas');
    paper.setup(myCanvas);
    //console.log(Tool);
    var width = paper.view.size.width;
    var height = paper.view.size.height;
    var path = new Path();
    let rgb = new Color(100,100,100,100);
    let down = false;
    paper.project.view.onMouseDown = function(e) {
      down = true;
    }
    paper.project.view.onMouseUp = function(e) {
      down = false;
      path = new Path();
    }
    paper.project.view.onMouseMove = function(e) {
      if(down) {
        path.rgb = rgb;
        path.add(e.point);
        path.smooth();
      }
    }
  }


  render() {
    return (
      <div>
        <canvas id='myCanvas' resize='true'></canvas>
      </div>
    )
  }

}
