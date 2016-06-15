import React from 'react';

export default class SelectedSetEntry extends React.Component {
  constructor(props) {
    super(props);
    console.log('INSIDE SelectedSetEntry', props);
  }

  render() {
    return (
      <div>
        <ul>
          INSIDE SelectedSetEntry
        </ul>
      </div>
    );
  }
}