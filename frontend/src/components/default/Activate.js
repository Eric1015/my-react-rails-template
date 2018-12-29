import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import history from '../../history';

const Api = require('../../lib/Api');

class Activate extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let url = window.location.search.substr(1);
        let params = url.split("&");
        let activation_token = null;
        let email = null;
        let key_value_pair = params[0].split("=");
        if (key_value_pair[0] === "activation_token") {
            activation_token = decodeURIComponent(key_value_pair[1]);
        }
        key_value_pair = params[1].split("=");
        if (key_value_pair[0] === "email") {
            email = decodeURIComponent(key_value_pair[1]);
        }
        Api.accountActivate(activation_token, email)
        .then((result) => {
            console.log("Your account has been activated");
            history.push('/');
        }).catch((err) => {
            
        });
    }

    render() {
        return (
            <div className="main-container">
                <h1>User Activation</h1>
                <Button inverted color="red" className="home-button" onClick={this.handleClick}>Activate</Button>
                <br></br>
                <br></br>
                <Link to="/"><Button inverted color="red" className="home-button">Back</Button></Link>
            </div>
        )
    }
}

export default Activate;