import React, { Component } from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Button, HelpBlock } from 'react-bootstrap';


class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    validatePassword = () => {
        const length = this.state.password.length;
        if(length >= 8) return 'success';
        else if(length >= 0) return 'error';
        return null;
    };

    validateUsername = () => {
        const length = this.state.username.length;
        if(length >= 5) return 'success';
        else if(length >= 0) return 'error';
        return null;
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    FieldGroup = ({ id, label, help, ...props }) => {
        if(id == 'username')
            return (
                <FormGroup controlId={id} validationState={this.validateUsername()} >
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl {...props} />
                    {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
        else
            return (
                <FormGroup controlId={id} validationState = {this.validatePassword()}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
            );
    }

    render() {
        return(
            <div className = "login-form">
                <form>
                    <this.FieldGroup id = "username" 
                                    type = "text" 
                                    label = "Username" 
                                    placeholder = "Enter username."
                                    value = {this.state.username}
                                    onChange = {this.handleChangeUsername.bind(this)}
                    />
                    <this.FieldGroup id = "password"
                                    type = "password"
                                    label = "Password"
                                    value = {this.state.password}
                                    onChange = {this.handleChangePassword.bind(this)}
                    />
                    <Button type="submit" onClick = {this.props.onSubmit}>Submit</Button>
                </form>
            </div>
        )
    }

}

export default LoginForm;