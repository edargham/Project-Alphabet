import React, { Component } from 'react';

class Textbox extends Component{

    constructor (props){
        super(props);
        this.state = {
            value: ''
        };
    }

    changeValue(event){
        console.log('Changing');
        this.setState({value: event.target.value});
        console.log(this.state.value);
        this.props.updateText(this.refs.input.value);
        console.log("Done");
    }

    render(){

        return(
            <div>
                <label>{this.props.children}</label>
                <input type = "text" ref = "input" id = "textBox" value = {this.state.value} onChange = {this.changeValue.bind(this)}/>
            </div>
        );
    }
}

export default Textbox;