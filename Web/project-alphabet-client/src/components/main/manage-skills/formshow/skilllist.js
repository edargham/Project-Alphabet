import React, { Component } from 'react';
import Skill from './skill';

class SkillList extends Component{

    constructor(props){
        super(props);
    }

    render(){
        
        var skillNodes = this.props.data.map(function(skill){
            return(<Skill Skill_Name = {skill.Skill_Name} key = {skill.idSkill}>{skill.Skill_Description}</Skill>);
        });
        return(<div>{skillNodes}</div>);
    }

}

export default SkillList;