import React, {Component} from 'react';

class RatingDrop extends Component{

    constructor(props){
        super(props);
        this.state = {
            rating: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            value: 0   
        }
    }

    eachOption(item, i){
        return(
            <option value = {i} key = {i}>{i}</option>
        );
    }

    changeValue(event){
        this.setState({value: event.target.value});
        this.props.updateOpt(this.refs.optionbox.value);
    }

    render(){
        return(
            <div>
            <label>{this.props.children}</label>
                <select value={this.state.value} onChange={this.changeValue.bind(this)} ref = "optionbox">
                    {this.state.rating.map(this.eachOption.bind(this))}
                </select> 
            </div>
        )
    }
}

export default RatingDrop;