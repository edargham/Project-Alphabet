import React, { Component } from 'react';
import $ from 'jquery';

import LoginForm from './components/Form';


class LoginRoute extends Component {

    handleSubmit(event) {
        event.preventDefault();

        if(this.form.validatePassword()!= 'success' && this.form.validateUsername() != 'success') return;
        var returnedUser;
        var authUser = {
            username: this.form.state.username,
            password: this.form.state.password
        };
        $.ajax({
            async: false,
            url: '/api/login',
            type: 'POST',
            data: authUser,
            dataType: 'json',
            success: function(data) {

                returnedUser = data;
                localStorage.setItem("token", returnedUser.token);
                window.location.href = "/";
            },
            error: function(xhr) {
                console.error('Login Failed: Error', xhr.responseJSON.statusCode , xhr.responseJSON.message);
            }
        });
        
    }


    render() {
        return(
            <div className = "login-div">
                <h1 className = "login-title">Project Alphabet</h1>
                <h4 className = "login-statement">Please login to continue</h4>
                <LoginForm ref = {ref => {this.form = ref;}} onSubmit = {this.handleSubmit.bind(this)} />
            </div>
        )
    }
}

export default LoginRoute;