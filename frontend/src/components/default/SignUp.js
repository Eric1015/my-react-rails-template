import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import ErrorMessages from './ErrorMessages';
import history from '../../history';

const Api = require('../../lib/Api');

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {email: "", password: "", password_confirmation: "", error_messages: [], disabled: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({disabled: true});
        const data = { user: {email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation} };
        Api.createUser(data)
        .then((res) => {
            history.push("/thankyou");
        })
        .catch((err) => {
            let errors = [];
            for (let i in err.response.data) {
                let error = i + " " + err.response.data[i];
                errors.push(error);
            }
            this.setState({error_messages: errors});
            this.setState({disabled: false});
        })
    }

    render() {
        return(
            <div>
                <Form className="user-form" onSubmit={this.handleSubmit}>
                    <h1>User Sign Up</h1>
                    <ErrorMessages error_messages={this.state.error_messages} />
                    <Form.Field>
                        <label>Email</label>
                        <input name="email" type="email" onChange={this.handleChange} disabled={this.state.disabled}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.handleChange} disabled={this.state.disabled}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Password Confirmation</label>
                        <input name="password_confirmation" type="password" onChange={this.handleChange} disabled={this.state.disabled}></input>
                    </Form.Field>
                    <Button inverted color="red" type="submit" disabled={this.state.disabled}>Sign Up</Button>
                    <Link to="/"><Button inverted color="red">Back</Button></Link>
                </Form>
            </div>
        )
    }
}

class SignUp extends Component {
    render() {
        return (
            <div>
                <SignUpForm />
            </div>
        )
    }
}

export default SignUp;