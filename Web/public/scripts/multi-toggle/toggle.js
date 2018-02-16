import React, { Component } from 'react';
import MultiToggle from 'react-multi-toggle';

const groupOptions = [
  {
    displayName: 'In queue',
    value: 2
  },
  {
    displayName: 'In progress',
    value: 4
  },
  {
    displayName: 'Evaluated',
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
      groupSize: 4
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
