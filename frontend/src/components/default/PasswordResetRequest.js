import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from 'semantic-ui-react';
import ErrorMessages from './ErrorMessages';
import history from '../../history';

const Api = require('../../lib/Api');

class PasswordResetRequestForm extends Component {
    constructor() {
        super();
        this.state = {error_messages: [], email: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.passwordResetRequest(this.state.email)
        .then((result) => {
            history.push("/thankyou");
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
                <h1>Password Reset Request</h1>
                <ErrorMessages error_messages={this.state.error_messages} />
                <Form.Field>
                    <label>Email</label>
                    <input name="email" type="email" onChange={this.handleChange}></input>
                </Form.Field>
                <Button inverted color="red" type="submit">Send</Button>
                <Link to="/"><Button inverted color="red">Back</Button></Link>
            </Form>
        )
    }
}

class PasswordResetRequest extends Component {
    render() {
        return (
            <div>
                <PasswordResetRequestForm />
            </div>
        )
    }
}

export default PasswordResetRequest;