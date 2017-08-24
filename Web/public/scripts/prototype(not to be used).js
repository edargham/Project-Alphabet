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
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    //we list skills, then show the form for new skills
    return (
      <div className="skillBox">
        <h1>Skills</h1>
        <SkillList data={this.state.data} />
        <SkillForm onSkillSubmit={this.handleSkillSubmit} />
      </div>
    );
  }
});

var SkillList = React.createClass({
  render: function() {
    var skillNodes = this.props.data.map(function(skill) {
      //map the data to individual skills
      return (
        <Skill
          Skill_Name={skill.Skill_Name}
          key={skill.id}
        >
          {skill.Skill_Description}
        </Skill>
      );
    });
    //print all the nodes in the list
    return (
      <div className="skillList">
        {skillNodes}
      </div>
    );
  }
});

var Skill = React.createClass({
  render: function() {
    //display an individual skill
    return (
      <div className="skill">
        <h2 className="skillContributor">
          {this.props.Skill_Name}
        </h2>
          {this.props.children.toString()}
      </div>
    );
  }
});

var SkillForm = React.createClass({
  getInitialState: function() {
    return {
      Skill_Name: "",
      Skill_Description: "",
      idParent_Skill: "",
      rating: undefined
    };
  },
  handleSubmit: function(e) {
    //we don't want the form to submit, so we prevent the defaul behavior
    e.preventDefault();
    
    //we clean up the data as we save it
    var Skill_Name = this.state.Skill_Name.trim();
    var Skill_Description = this.state.Skill_Description.trim();
    
    //these two items are required
    if (!Skill_Name) {
      return;
    }
    
    //Here we do the final submit to the parent component
    //ME: if there is a problem it may be here
    this.props.onSkillSubmit({Skill_Name: Skill_Name, Skill_Description: Skill_Description, idParent_Skill: idParent_Skill, rating: rating});
    
    //Now that the form is submitted, we empty all the fields
    this.setState({
      Skill_Name: '',
      Skill_Description: '',
      idParent_Skill: '',
      rating: undefined
    });
  },
  validateidParent_Skill: function (value) {
    // regex from http://stackoverflow.com/questions/46155/validate-idParent_Skill-address-in-javascript
    var re = /^[0-9\b]+$/;
    return re.test(value);
  },
  commonValidate: function () {
    //you could do something here that does general validation for any form field
    return true;
  },
  setValue: function (field, event) {
    //If the Skill_Name input field were directly within this
    //this component, we could use this.refs.Skill_Name.value
    //Instead, we want to save the data for when the form is submitted
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  },
  render: function() {
    //Each form field is actually another component.
    //Two of the form fields use the same component, but with different variables
    return (
      <form className="skillForm" onSubmit={this.handleSubmit}>
        <h2>Create Skill:</h2>
      
        <TextInput
          value={this.state.Skill_Name}
          uniqueName="Skill_Name"
          text="Skill Name"
          textArea={false}
          required={true}
          minCharacters={3}
          validate={this.commonValidate}
          onChange= {this.setValue.bind(this, 'Skill_Name')}
          errorMessage="Name is invalid"
          emptyMessage="Name is required" />
        <br /><br />

        <TextInput
          value={this.state.idParent_Skill}
          uniqueName="idParent_Skill"
          text="Parent Skillid"
          textArea={false}
          required={false}
          minCharacters={0}
          validate={this.validateidParent_Skill}
          onChange={this.setValue.bind(this, 'idParent_Skill')} 
          errorMessage="idParent_Skill is invalid"
          emptyMessage="idParent_Skill is required" />
        <br /><br />

        <TextInput
          value={this.state.Skill_Description}
          uniqueName="Skill_Description"
          text="Description"
          textArea={true}
          required={false}
          validate={this.commonValidate}
          onChange={this.setValue.bind(this, 'Skill_Description')} 
          errorMessage=""
          emptyMessage="" />
        <br /><br />

        {/* This Rating component is specialized to include two fields in one */}
        <Rating
          value={this.state.rating} 
          onChange={this.setValue.bind(this, 'rating')} />
        <br /><br />
      
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

/*
  This is a small error component that is displayed inline
  within every form field component
*/
var InputError = React.createClass({
  getInitialState: function() {
    return {
      message: 'Input is invalid'
    };
  },
  render: function(){ 
    var errorClass = classNames(this.props.className, {
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    });

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }

});

var TextInput = React.createClass({
  getInitialState: function(){
    //most of these variables have to do with handling errors
    return {
      isEmpty: true,
      value: null,
      valid: true,
      errorMessage: "Input is invalid",
      errorVisible: false
    };
  },

  handleChange: function(event){
    //validate the field locally
    this.validation(event.target.value);

    //Call onChange method on the parent component for updating it's state
    //If saving this field for final form submission, it gets passed
    // up to the top component for sending to the server
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  },

  validation: function (value, valid) {
    //The valid variable is optional, and true if not passed in:
    if (typeof valid === 'undefined') {
      valid = true;
    }
    
    var message = "";
    var errorVisible = false;
    
    //we know how to validate text fields based on information passed through props
    if (!valid) {
      //This happens when the user leaves the field, but it is not valid
      //(we do final validation in the parent component, then pass the result
      //here for display)
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }
    else if (this.props.required && jQuery.isEmptyObject(value)) {
      //this happens when we have a required field with no text entered
      //in this case, we want the "emptyMessage" error message
      message = this.props.emptyMessage;
      valid = false;
      errorVisible = true;
    }
    else if (value.length < this.props.minCharacters) {
      //This happens when the text entered is not the required length,
      //in which case we show the regular error message
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }
    
    //setting the state will update the display,
    //causing the error message to display if there is one.
    this.setState({
      value: value,
      isEmpty: jQuery.isEmptyObject(value),
      valid: valid,
      errorMessage: message,
      errorVisible: errorVisible
    });

  },

  handleBlur: function (event) {
    //Complete final validation from parent element when complete
    var valid = this.props.validate(event.target.value);
    //pass the result to the local validation element for displaying the error
    this.validation(event.target.value, valid);
  },
  render: function() {
    if (this.props.textArea) {
      return (
        <div className={this.props.uniqueName}>
          <textarea
            placeholder={this.props.text}
            className={'input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value} />
      
          <InputError 
            visible={this.state.errorVisible} 
            errorMessage={this.state.errorMessage} />
        </div>
      );
    } else {
      return (
        <div className={this.props.uniqueName}>
          <input
            placeholder={this.props.text}
            className={'input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value} />
      
          <InputError 
            visible={this.state.errorVisible} 
            errorMessage={this.state.errorMessage} />
        </div>
      );
    }
  }
});

var Rating = React.createClass({
  getInitialState: function() {
    return {
      displayClass: 'invisible'
    };
  },
  handleClick: function(e) {
    //We're doing another one of these "any value" fields, only shown when
    //a specific "other" option is chosen
    this.props.onChange(e);
    var displayClass = 'invisible';
    if (e.target.value == 'other') {
      displayClass = 'visible';
    }
    this.setState({displayClass: displayClass});
  },
  render: function() {
    //This is a select field with options and sub-options, plus an "any value" field
    var value = this.props.value;
    if (this.props.value != undefined && ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'].indexOf(this.props.value) == -1) {
      value = 'other';
    }
    else if (this.props.value == undefined) {
      value = 'none';
    }
    
    return (
      <div className="rating">
        <select value={value} onChange={this.handleClick} multiple={false} ref="rating">
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
        <InputError 
          visible={this.state.errorVisible} 
          errorMessage={this.state.errorMessage} />
      </div>
    );
  }
});

ReactDOM.render(
  <SkillBox url="/api/skills" pollInterval={2000} />,
  document.getElementById('container')
);
