import React from 'react';
import { Link, browserHistory } from 'react-router';

const handleSubmit = e => {
  e.preventDefault();
  const room = document.getElementById('room_id').value;
  browserHistory.push(`/classroom/room/${room}`);
}

const Classroom = () => (
  <div className="container">
    <br />
    <h1 className="center splashtitle"> CLASSROOM </h1>
    <div className="row">
      <div className="col m6 s12">
        <div className="col s12 no-side-padding">
          <div className="card cyan lighten-5 hoverable" onClick={ () => browserHistory.push('/classroom/create') }>
            <div className="card-content">
              <span className="card-title">Create Room</span>
              <p>Some Description Here</p>
            </div>
          </div>
        </div>
        <div className="col s12 no-side-padding">
          <div className="card cyan lighten-5 hoverable" onClick={ () => browserHistory.push('/classroom/notes') }>
            <div className="card-content">
              <span className="card-title">Notes</span>
              <p>Some Description Here</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col m6 s12">
        <div className="card cyan lighten-5 hoverable">
          <div className="card-content">
            <span className="card-title center-align">Join Classroom</span>
            <p>Some Description Here</p>
          </div>
          <div className="card-action">
            <div className="row">
              <form className="col s12" onSubmit={ handleSubmit }>
                <div className="input-field col s12">
                  <input required id="room_id" type="text" />
                  <label htmlFor="room_id">Room Name</label>
                </div>
                <button className="btn waves-effect waves-light col s8 offset-s2 cyan" type="submit">Join</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Classroom;

