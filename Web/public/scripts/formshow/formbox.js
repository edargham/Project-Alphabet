import React, { Component } from 'react';
import SkillForm from '../treeform/form';
import $ from 'jquery';

class FormBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount(){}

    handleSkillSubmit(skill){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: skill,
            success: function(data){
                console.log('success!');
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render(){
        return(<div>
            <SkillForm onSkillSubmit= {this.handleSkillSubmit.bind(this)} />
            </div>
        );
    }

} 

export default FormBox;