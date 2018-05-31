import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';
import LoginRoute from './login/Login'
import Home from './main/Home';
import ManageSkills from './main/manage-skills/manage-skills';
import ViewSkills from './main/view-skills';

const checkAuth = () =>{
    const token = localStorage.getItem('token');
    if(!token) return false;

    try {
        const { exp } = decode(token);

        if(exp < new Date().getTime()/1000) {
            return false;
        }

    } catch(err) {
        return false;
    }
    
    return true;
}

const AuthRoute = ({component: Component, ...rest}) =>
(
    <Route {...rest} render = {props => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: '/login'}} />
        )
    )}/> 
)

const Routes = () => (
    <main>
        <Switch>
            <Route exact path = '/login' component = {LoginRoute} />
            <AuthRoute exact path = '/' component = {Home} />
            <AuthRoute exact path = '/manage-skills' component = {ManageSkills} />
            <AuthRoute exact path = '/view-skills' component = {ViewSkills} />
        </Switch>
    </main>
)

export default Routes;