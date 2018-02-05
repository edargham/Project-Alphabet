import React, { Component } from 'react';
import SkillList from './skilllist';
import $ from 'jquery';

class FormInfo extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            
            data:[]
        }
    }

    componentDidMount(){
        //Once the component is fully loaded, we grab the skills
        this.loadSkillsFromServer();
        //... and set an interval to continuously load new data:
        setInterval(this.loadSkillsFromServer, this.props.pollInterval);
    }

    loadSkillsFromServer(){
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
    }

    render(){
        return(<div><SkillList data = {this.state.data} /></div>);
    }

}

export default FormInfo;