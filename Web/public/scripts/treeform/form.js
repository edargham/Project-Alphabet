import React, { Component } from 'react';
import Textbox from './textbox';
import Textarea from './textarea';
import Numbox from './numbox';
import RatingDrop from './ratingdrop';

class SkillForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            Skill_Name: "",
            Skill_Description: null,
            idParent_Skill: null,
            rating: 0
        }
    }

    updateTxt(newText){
        var Temp = newText;
        this.setState({Skill_Name: Temp});
    }

    updateDesc(newText){
        var Temp = newText;
        this.setState({Skill_Description: Temp});
    }

    updateRate(newRate){
        var Temp = newRate;
        this.setState({rating: Temp});
    }

    updateNumber(newNum){
        var Temp = newNum;
        this.setState({idParent_Skill: Temp});
    }

    handleSubmit(event){
        //event.preventDefault();
        var Skill_Name = this.state.Skill_Name.trim();
        var Skill_Description =  this.state.Skill_Description/*.trim()*/;
        var idParent_Skill = this.state.idParent_Skill.trim();
        var rating = this.state.rating.trim();
        if(!Skill_Name){
            alert('Empty');
            return;
        }else{
        var sub = {Skill_Name: Skill_Name, Skill_Description: Skill_Description, idParent_Skill: idParent_Skill, rating: rating};
        this.props.onSkillSubmit(sub);
        }
    }

    render(){
        return(
            <form id = "Postform" name = "Postform" method = "post" onSubmit = {this.handleSubmit.bind(this)} ref = "subForm">
                <Textbox value = {this.state.Skill_Name} ref = "name" updateText = {this.updateTxt.bind(this)}>Skill Name: </Textbox>
                <br />
                <Textarea value = {this.state.Skill_Description} ref = "description" updateTextarea = {this.updateDesc.bind(this)}>Skill Description: </Textarea>
                <RatingDrop value = {this.state.rating} ref = "rate" updateOpt = {this.updateRate.bind(this)}>Rating: </RatingDrop>
                <Numbox value = {this.props.idParent_Skill} ref = "nbrbox" updateNbr = {this.updateNumber.bind(this)}>Parent Skill ID: </Numbox>
                <input type="submit" value="Submit" className="btn btn-success" data-dismiss="modal"/>
            </form>
        );
    }



}

export default SkillForm;