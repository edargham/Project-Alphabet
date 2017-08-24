var FormBox = React.createClass({
    getInitialState: function() {
    //this will hold all the data being read and posted to the file
        return {data: {}};
    },
    componentDidMount: function(){},
    handleSkillSubmit: function(skill) {
    //this is just an example of how you would submit a form
    //you would have to implement something separately on the server
        $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: skill,
        success: function(data) {
        //We set the state again after submission, to update with the submitted data
            this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
            console.log('Error Here!');
            console.error(this.props.url, status, err.toString());
        }.bind(this)
        });
    },
    render: function(){
        return(<div>
        <SkillForm onSkillSubmit= {this.handleSkillSubmit} /></div>);
        
    }
});


var Textbox = React.createClass({

    getInitialState: function(){
        return {value:null};
    },

    changeValue: function(event){
        this.setState({value: event.target.value});
        this.props.updateText(this.refs.input.value);
    },

    render: function(){
        return(
            <div>
                <label>{this.props.children}</label>
                <input type = "text" ref = "input" id = "textBox" value = {this.state.value} onChange = {this.changeValue}/>
            </div>
        );

    }
});

var TextArea = React.createClass({
    getInitialState: function(){
        return {value:null};
    },

    changeValue: function(event){
        this.setState({value: event.target.value});
        this.props.updateTextArea(this.refs.input.value);
    },

    render: function(){
        return(
            <div>
                <label>{this.props.children}</label>
                <textarea ref = "input" id = "textAre" value = {this.state.value} onChange = {this.changeValue}/>
                
            </div>
        );
    }
});

var Numbox = React.createClass({

    getInitialState: function(){
        return {value: 0};
    },

    changeValue: function(event){
        this.setState({value: event.target.value});
        this.props.updateNbr(this.refs.numInput.value);
    },

    render: function(){
        return(
            <div>
            <label>{this.props.children}</label>
            <input type = "number" ref = "numInput" id = "textbox" value = {this.state.value} onChange = {this.changeValue}/>
            </div>
        );

    }
});

var RatingDropdown = React.createClass({
    getInitialState: function(){
        return({value: 0});
    },

    changeValue: function(event){
        this.setState({value: event.target.value});
        console.log(this.state.value);    
        this.props.updateRate(this.refs.optionbox.value);   
      
    },

    render: function(){
        return(
            <div>
                <label>Rating: </label>
                <select value={this.state.value} onChange={this.changeValue} ref = "optionbox">
                    <option value="1">Rating 1</option>
                    <option value="2">Rating 2</option>
                    <option value="3">Rating 3</option>
                    <option value="4">Rating 4</option>
                    <option value="5">Rating 5</option>
                    <option value="6">Rating 6</option>
                    <option value="7">Rating 7</option>
                    <option value="8">Rating 8</option>
                    <option value="9">Rating 9</option>
                    <option value="10">Rating 10</option>
                    <option value="11">Rating 11</option>
                    <option value="12">Rating 12</option>
                </select>    
            </div>
        )
    }
});

var Prereq = React.createClass({
    getInitialState: function(){
        return {editing: false};
    },

     edit: function(event){
        event.preventDefault();
        this.setState({editing: true});
    },

    save: function(event){
        event.preventDefault();
        var val = this.refs.input.value;
        this.props.updatePrereqText(this.refs.input.value, this.props.index)
        console.log(val);
        this.setState({editing: false});
    },

    remove: function(){
        event.preventDefault();
        this.props.removePrereqText(this.props.index);
    },

    renderNormal: function(){
        return(
            <div>
                <label>idPrerequisite_Skill: </label>
                <div>{this.props.children}</div>
                <button onClick = {this.edit}>Edit</button>
                <button onClick = {this.remove}>Delete</button>
            </div>
        );
    },

    renderForm: function(){
        return(
            <div>
                <label>idPrerequisite_Skill:</label>
                <input type = "number" ref = "input" defaultValue= {this.props.children} />
                <button onClick = {this.save}>save</button>
            </div>
        );
    },

    render: function(){
        if(this.state.editing){
            return this.renderForm();
        }
        else{
            return this.renderNormal();
        }
    }
});

var PrereqCollection = React.createClass({

    getInitialState: function(){
        return{
            prerequisites: [
            ]
        }
    },

    addPrereq: function(text, evt){
        evt.preventDefault();
        var temp = this.state.prerequisites;
        temp.push(text);
        this.setState({prerequisites: temp});
            
    },

    removePrereq: function(i){
        console.log('Removing Prereq: '+i);
        var temp = this.state.prerequisites;
        temp.splice(i,1);
        this.setState({prerequisites: temp});
    },

    updatePrereq: function(newText, i){
        console.log('Updating Prereq: '+i);
        var temp = this.state.prerequisites;
        temp[i] = newText;
        this.setState({prerequisites: temp});
    },

    eachPrereq: function(text, i){
        return(
            <Prereq key = {i} index = {i} updatePrereqText = {this.updatePrereq} removePrereqText = {this.removePrereq}>
            {text}</Prereq>);
    },

    render: function(){
        return(
            <div>
                <label>Prerequisites: </label> 
                <button onClick = {this.addPrereq.bind(null, '1')}>Add</button>
                {this.state.prerequisites.map(this.eachPrereq)}
            </div>
            );
    }

});

var SkillForm = React.createClass({

    getInitialState: function(){
        return{
            Skill_Name: "",
            Skill_Description: null,
            idParent_Skill: null,
            rating: 1
        }
    },
    
    updateTxt: function(newText){
        var Temp = newText;
        this.setState({Skill_Name: Temp});
        console.log("Form State Name Change: " + this.state.Skill_Name);
    },

    updateDesc: function(newText){
        var Temp = newText;
        this.setState({Skill_Description: Temp});
        console.log("Form State Name Change: " + this.state.Skill_Description);
    },

    updateRating: function(newRate){
        var temp = newRate;
        this.setState({rating: temp});
        console.log("Form State Rate Change: "+ temp);
    },

    updateNumber: function(newNum){
        var temp = newNum;
        this.setState({idParent_Skill: temp});
        console.log("Form State Parent ID Change: "+ temp);
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var Skill_Name = this.state.Skill_Name.trim();
        var Skill_Description =  this.state.Skill_Description/*.trim()*/;
        var idParent_Skill = this.state.idParent_Skill.trim();
        var rating = this.state.rating.trim();
        if(!Skill_Name){
            alert('Empty');
            return;
        }
        var sub = {Skill_Name: Skill_Name, Skill_Description: Skill_Description, idParent_Skill: idParent_Skill, rating: rating};
        this.props.onSkillSubmit(sub)
        
    alert('An essay was submitted: ');

    },

    render: function() {
        //To be added later: <PrereqCollection value = {this.props.parent} ref = "precol"/>
        return (
            <form id = "Postform" name = "Postform" method = "post" onSubmit = {this.handleSubmit} ref = "subForm" >
                <Textbox value = {this.state.Skill_Name} ref = "name" updateText = {this.updateTxt}>Skill Name: </Textbox>
                <br />
                <TextArea value = {this.state.Skill_Description} ref = "description" updateTextArea = {this.updateDesc}>Skill Description: </TextArea>
                <RatingDropdown value = {this.state.rating} ref = "rate" updateRate = {this.updateRating}>Rating: </RatingDropdown>
                <Numbox value = {this.props.idParent_Skill} ref = "nbrbox" updateNbr = {this.updateNumber}>idParent_Skill: </Numbox>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
});
ReactDOM.render(<div><FormBox url = "/api/skills"/></div>, document.getElementById('container'));
