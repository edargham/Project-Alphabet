import React, { Component } from 'react';
import MultiToggle from 'react-multi-toggle';

import $ from 'jquery';

import "react-multi-toggle/style.css";

const groupOptions = [
  {
    displayName: 'Warming Up!',
    value: 2,
    isDisabled: true
  },
  {
    displayName: 'Took Course',
    value: 4,
    isDisabled: true
  },
  {
    displayName: 'Start Evaluation',
    value: 8,
    isDisabled: true
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

  componentDidMount() {
    const id = this.props.id;
    $.ajax({
      url: "/students/skill-progress",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      dataType: 'json',
      cache: false,
      success: (data) =>{
        console.log(data);
        switch(data[id].Progress) {
          case 'Warming Up!':
            this.setState({groupSize: 2});
            break;
          case 'Took Course':
            this.setState({groupSize: 4});
            break;
          case 'Start Evaluation':
            this.setState({groupSize: 8});
            break;
          case 'Completed':
            this.setState({groupSize: 16});
            break;
        }
      }
    });
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
