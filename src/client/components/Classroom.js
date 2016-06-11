/* global Materialize */
import React from 'react';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

const handleSubmit = e => {
  e.preventDefault();

  const room = document.getElementById('room_id').value;
  fetch(`/api/checkroom?room=${room}`, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(data => {
      if (data.doesExist) {
        Materialize.toast(`Entered ${room}.`, 3000);
        browserHistory.push(`/classroom/room/${room}`);
      } else {
        Materialize.toast(`Room ${room} doesn't exist!`, 3000);
      }
    });
};

const createRoom = () => {
  Materialize.toast('Created Room!', 3000);
  browserHistory.push(`/classroom/room/${(Date.parse(new Date())).toString()}`);
};

const Classroom = () => (
  <div className="container">
    <br />
    <h1 className="center splashtitle"> CLASSROOM </h1>
    <div className="row">
      <div className="col m6 s12">
        <div className="col s12 no-side-padding">
          <div
            className="card cyan lighten-5 hoverable clickable-card"
            onClick={createRoom}
          >
            <div className="card-content">
              <span className="card-title">Create Room</span>
              <p>Some Description Here</p>
            </div>
          </div>
        </div>
        <div className="col s12 no-side-padding">
          <div
            className="card cyan lighten-5 hoverable clickable-card"
            onClick={() => browserHistory.push('/classroom/notes')}
          >
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
              <form className="col s12" onSubmit={handleSubmit}>
                <div className="input-field col s12">
                  <input required id="room_id" type="text" />
                  <label htmlFor="room_id">Room Name</label>
                </div>
                <button
                  className="btn waves-effect waves-light col s8 offset-s2 cyan"
                  type="submit"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Classroom;

