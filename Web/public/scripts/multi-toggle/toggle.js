import React, { Component } from 'react';
import MultiToggle from 'react-multi-toggle';

import "react-multi-toggle/style.css";

const groupOptions = [
  {
    displayName: 'Warming Up!',
    value: 2
  },
  {
    displayName: 'Took Course',
    value: 4
  },
  {
    displayName: 'Start Evaluation',
    value: 8
  },
  {
    displayName: 'Completed',
    value: 16,
    isDisabled: true
  }
];

class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupSize: 2
    };
  }

  onGroupSizeSelect(value){
    this.setState({ groupSize: value })
  };

  render(){
    const { groupSize } = this.state;

    return (
      <MultiToggle
        options={groupOptions}
        selectedOption={groupSize}
        onSelectOption={this.onGroupSizeSelect.bind(this)}
      />
    );
  }


}

export default Toggle;
