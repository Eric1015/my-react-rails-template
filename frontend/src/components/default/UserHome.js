import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import history from '../../history';
import {AuthWrapper} from '../../utils/auth_helpers';
import ErrorMessages from '../default/ErrorMessages';

const Api = require("../../lib/Api");

class UserHome extends Component {
    constructor() {
        super();
        this.state = {error_messages: []};
        this.handleDestroy = this.handleDestroy.bind(this);
    }

    handleDestroy(event) {
        event.preventDefault();
        Api.destroyUser(this.props.appState.jwt, this.props.appState.user.id)
        .then((res) => {
            history.push("/");
            this.props.logout();
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
            <div className="main-container">
                <ErrorMessages error_messages={this.state.error_messages} />
                <h1>Congratulations!</h1>
                <p>You're logged in</p>
                <Link to="/"><Button inverted color="red" className="home-button">Back to Home</Button></Link>
                <br></br>
                <br></br>
                <Button inverted color="red" className="home-button" onClick={this.handleDestroy}>Delete Account</Button>
            </div>
        )
    }
}

const WrappedUserHome = AuthWrapper(UserHome);

export default WrappedUserHome;