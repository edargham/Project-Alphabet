import React, { Component } from 'react';
import decode from 'jwt-decode';
import SkillForm from '../treeform/form';
import $ from 'jquery';

class FormBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {},
            parent: 0,
        }
    }
    componentDidMount(){
      this.setState({parent: this.props.parent});
    }

    componentDidUpdate(){
      this.form.setState({idParent_Skill: this.state.parent});
    }

    handleSkillSubmit(skill) {

        const token = localStorage.getItem('token');
        const user = decode(token);
        skill.idPerson = user.idPerson;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: skill,
            success: function(data){
                console.log('success!');
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        window.location.reload(true);
    }

    render(){
        return(<div>
          <SkillForm parent = {this.state.parent} handleClose = {this.props.handleClose} onSkillSubmit= {this.handleSkillSubmit.bind(this)} ref = {(ref) => {this.form = ref;}}/>
            </div>
        );
    }

}

export default FormBox;
