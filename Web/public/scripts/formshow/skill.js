import React, {Component} from 'react';

class Skill extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(<div><br />{this.props.Skill_Name}<br /><i>{this.props.children}</i></div>);
    }
}

export default Skill;