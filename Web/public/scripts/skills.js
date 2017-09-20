//import React, { Component } from 'react';
//import SortableTree from 'react-sortable-tree';

var SkillBox = React.createClass({

    getInitialState: function() {
        //this will hold all the data being read and posted to the file
        return {data: []};
    },
    loadSkillsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                //set the state with the newly loaded data so the display will update
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        //Once the component is fully loaded, we grab the skills
        this.loadSkillsFromServer();
        //... and set an interval to continuously load new data:
        setInterval(this.loadSkillsFromServer, this.props.pollInterval);
    },

    render: function(){
        return(
            <div><SkillList data = {this.state.data} /></div>
        );
    }
});

var SkillList = React.createClass({
    render: function(){
        var skillNodes = this.props.data.map(function(skill){
            return(<Skill Skill_Name = {skill.Skill_Name} key = {skill.idSkill}>{skill.Skill_Description}</Skill>);
        });
        return(<div>{skillNodes}</div>);
    } 
});

var Skill = React.createClass({
    render: function(){
        return(<div><br />{this.props.Skill_Name}<br /><i>{this.props.children}</i></div>);
    }
});

ReactDOM.render(<SkillBox url = "/api/skills" pollInterval = {2000}/>, document.getElementById('skill_list'));