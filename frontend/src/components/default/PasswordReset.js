import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import ErrorMessages from './ErrorMessages';
import axios from 'axios';

class PasswordResetForm extends Component {
    constructor() {
        super();
        this.state = {error_messages: [], password: "", password_confirmation: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let url = window.location.search.substr(1);
        let params = url.split("&");
        let reset_token = null;
        let email = null;
        let key_value_pair = params[0].split("=");
        if (key_value_pair[0] === "reset_token") {
            reset_token = decodeURIComponent(key_value_pair[1]);
        }
        key_value_pair = params[1].split("=");
        if (key_value_pair[0] === "email") {
            email = decodeURIComponent(key_value_pair[1]);
        }
        axios.get("/api/v1/password_resets/" + reset_token + "/edit?email=" + email)
        .then((result) => {
            console.log("Your password has been reset");
            this.props.login(result.data.id);
        }).catch((err) => {
            let errors = [];
            for (let i in err.response.data) {
                let error = i + " " + err.response.data[i];
                errors.push(error);
            }
            this.setState({error_messages: errors});
        });
    }

    render() {
        return(
            <Form className="user-form" onSubmit={this.handleSubmit}>
                <h1>Password Reset</h1>
                <ErrorMessages error_messages={this.state.error_messages} />
                <Form.Field>
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.handleChange}></input>
                </Form.Field>
                <Form.Field>
                    <label>Password Confirmation</label>
                    <input name="password_confirmation" type="password" onChange={this.handleChange}></input>
                </Form.Field>
                <Button inverted color="red" type="submit">Reset</Button>
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