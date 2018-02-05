import React, { Component } from 'react';

class Textarea extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }

    changeValue(event){
        this.setState({value: event.target.value});
        this.props.updateTextarea(this.refs.input.value);
    }

    render(){
        return(
            <div>
                <label>{this.props.children}</label>
                <textarea ref = "input" id = "textarea" value = {this.state.value} onChange = {this.changeValue.bind(this)}/>
                
            </div>
        );
    }
}

export default Textarea;