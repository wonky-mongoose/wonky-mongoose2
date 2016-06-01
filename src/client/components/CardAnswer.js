import React from 'react';
import { Link } from 'react-router';

const CardAnswer = ({currCard}) => (
  <div className="container">
    <h1 className="center">{currCard.answer}</h1>
    <div className="row center">
      <Link to="/deck" + randomAlgo + "" onClick={UPDATE Algorithm} className="btn-large blue lighten-2">Thumbs Up </Link>
      <Link to="/deck" + randomAlgo + "" onClick={UPDATE Algorithm} className="btn-large blue lighten-2">Thumbs Middle</Link>
      <Link to="/deck" + randomAlgo + "" onClick={UPDATE Algorithm} className="btn-large blue lighten-2">Thumbs Down </Link>
    </div>
  </div>
);

export default CardAnswer;
