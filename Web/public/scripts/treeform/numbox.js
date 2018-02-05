import React, {Component} from 'react';

class Numbox extends Component{

    constructor(props){
        super(props);
        this.state = {value: 0};
    }

    changeValue(event){
        
        if(event.target.value < 0){
            return;
        }else{
        this.setState({value: event.target.value});
        this.props.updateNbr(this.refs.numInput.value);
        }
    }

    render(){
        return(
            <div>
            <label>{this.props.children}</label>
            <input type = "number" ref = "numInput" id = "textbox" value = {this.state.value} onChange = {this.changeValue.bind(this)}/>
            </div>
        );
    }


}

export default Numbox;