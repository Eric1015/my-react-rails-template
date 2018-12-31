import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import ErrorMessages from './ErrorMessages';

const Api = require('../../lib/Api');

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {email: "", password: "", error_messages: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        Api.authenticateUser(this.state.email, this.state.password)
        .then((res) => {
            this.props.login(res.jwt);
            console.log("You are logged in");
        })
        .catch((err) => {
            let errors = [];
            for (let i in err.response.data) {
                let error = i + " " + err.response.data[i];
                errors.push(error);
            }
            this.setState({error_messages: errors});
        })
    }

    render() {
        return (
            <div>
                <Form className="user-form" onSubmit={this.handleSubmit}>
                    <h1>User Login</h1>
                    <ErrorMessages error_messages={this.state.error_messages} />
                    <Form.Field>
                        <label>Email</label>
                        <input name="email" type="email" onChange={this.handleChange}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>Password<Link to="/password-reset-request"> (forgot password)</Link></label>
                        <input name="password" type="password" onChange={this.handleChange}></input>
                    </Form.Field>
                    <Button inverted color="red" type="submit">Login</Button>
                    <Link to="/"><Button inverted color="red">Back</Button></Link>
                </Form>
            </div>
        )
    }
}

class Login extends Component {
    render() {
        return (
            <div>
                <LoginForm login={this.props.login}/>
            </div>
        )
    }
}

export default Login;