import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import ErrorMessages from './ErrorMessages';
import history from '../../history';

const Api = require('../../lib/Api');

class PasswordResetForm extends Component {
    constructor() {
        super();
        this.state = {error_messages: [], password: "", password_confirmation: "", disabled: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({disabled: true});
        let url = window.location.search.substr(1);
        let params = url.split("&");
        let reset_token = null;
        let email = null;
        let key_value_pair = params[0].split("=");
        if (key_value_pair[0] === "email") {
            email = decodeURIComponent(key_value_pair[1]);
        }
        key_value_pair = params[1].split("=");
        if (key_value_pair[0] === "reset_token") {
            reset_token = decodeURIComponent(key_value_pair[1]);
        }
        Api.passwordReset(reset_token, email, this.state.password, this.state.password_confirmation)
        .then((res) => {
            console.log("Your password has been reset");
            history.push('/');
        }).catch((err) => {
            let errors = [];
            for (let i in err.response.data) {
                let error = i + " " + err.response.data[i];
                errors.push(error);
            }
            this.setState({error_messages: errors});
            this.setState({disabled: false});
        });
    }

    render() {
        return(
            <Form className="user-form" onSubmit={this.handleSubmit}>
                <h1>Password Reset</h1>
                <ErrorMessages error_messages={this.state.error_messages} />
                <Form.Field>
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.handleChange} disabled={this.state.disabled}></input>
                </Form.Field>
                <Form.Field>
                    <label>Password Confirmation</label>
                    <input name="password_confirmation" type="password" onChange={this.handleChange} disabled={this.state.disabled}></input>
                </Form.Field>
                <Button inverted color="red" type="submit" disabled={this.state.disabled}>Reset</Button>
                <Link to="/"><Button inverted color="red">Back</Button></Link>
            </Form>
        )
    }
}

class PasswordReset extends Component {
    render() {
        return (
            <div>
                <PasswordResetForm />
            </div>
        )
    }
}

export default PasswordReset;