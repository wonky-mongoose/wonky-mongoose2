import React from 'react';
import { Link, browserHistory } from 'react-router';

const Menu = () => (
  <div className="container">
    <br />
    <h1 className="center splashtitle"> MENU </h1>
    <div className="row">
      <div className="col m6 s12">
        <div className="card cyan lighten-5 hoverable" onClick={ () => browserHistory.push('/flash') }>
          <div className="card-content">
            <span className="card-title center-align">Memowise</span>
            <p>Some Description Here</p>
          </div>
        </div>
      </div>
      <div className="col m6 s12">
        <div className="card cyan lighten-5 hoverable" onClick={ () => browserHistory.push('/classroom') }>
          <div className="card-content">
            <span className="card-title">Classroom</span>
            <p>Some Description Here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Menu;

