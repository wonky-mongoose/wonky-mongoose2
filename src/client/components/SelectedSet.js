import React from 'react';
import SelectedSetEntry from './selectedSetEntry';

export default class SelectedSet extends React.Component {
  constructor(props) {
    super(props);
    console.log('inside selectedSet', props)
    this.state = {
      selectedCards: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('inside selectedCards componentWillReceiveProps', nextProps);
    this.setState ({
      selectedCards: nextProps.selectedCards
    });
  }

  render() {
    return (
      <div>
        <ul>
          INSIDE SelectedSet
          {this.state.selectedCards.map((card, index) =>
            <SelectedSetEntry key={index} card={card} />
          )}
        </ul>
      </div>
    );
  }
}
