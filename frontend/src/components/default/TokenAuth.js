import React, { Component } from 'react';
import history from '../../history';
import { Router, Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './NotFound';
import WrappedUserHome from './UserHome';
import Activate from './Activate';
import ThankYou from './ThankYou';
import PasswordReset from './PasswordReset';
import PasswordResetRequest from './PasswordResetRequest';

const Api = require('../../lib/Api');

class TokenAuth extends Component {
    constructor() {
        super();
        this.state = { cookieName: "my-react-rails-template", jwt: null, user: null };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.autoLogin = this.autoLogin.bind(this);
    }

    login(jwt) {
        const { cookies } = this.props;
        Api.getCurrentUser(jwt)
        .then((res) => {
            this.setState({ user: res, jwt: jwt }, () => {
                // Cookie will last for 1 day
                cookies.set(this.state.cookieName, jwt, {path: '/', maxAge: 86400});
                history.push("/users/" + this.state.user.id);
            })
        }).catch((err) => {

        });
    }

    logout() {
        const { cookies } = this.props;
        this.setState({ user: null, jwt: null });
        cookies.remove(this.state.cookieName);
    }

    autoLogin() {
        const { cookies } = this.props;
        let jwt = cookies.get(this.state.cookieName);
        if (jwt) {
            this.login(jwt);
            cookies.set(this.state.cookieName, jwt, {path: '/', maxAge: 86400});
        }
    }

    componentDidMount() {
        this.autoLogin();
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' render={() => <Home appState={this.state} logout={this.logout}/>} />
                    <Route path='/login' render={() => <Login login={this.login} />} />
                    <Route path="/signup" render={() => <SignUp />} />
                    <Route path='/activate' render={() => <Activate login={this.login} />} />
                    <Route path='/thankyou' render={() => <ThankYou />} />
                    <Route path='/password-reset-request' render={() => <PasswordResetRequest />} />
                    <Route path='/password-reset' render={() => <PasswordReset />} />
                    <Route path='/users/:id' render={() => <WrappedUserHome appState={this.state} logout={this.logout}/>} />
                    <Route render={() => <NotFound />} />
                </Switch>
            </Router>
        );
    }
}

export default withCookies(TokenAuth);