import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import axios from 'axios';

class Activate extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let url = window.location.search.substr(1);
        let params = url.split("&");
        let key_value_pair = params[0].split("=");
        let confirmation_token = null;
        let email = null;
        if (key_value_pair[0] === "email") {
            email = decodeURIComponent(key_value_pair[1]);
        }
        key_value_pair = params[1].split("=");
        if (key_value_pair[0] === "confirmation_token") {
            confirmation_token = decodeURIComponent(key_value_pair[1]);
        }
        axios.get("/api/v1/confirmation?token=" + confirmation_token)
        .then((result) => {
            console.log("Your account has been activated");
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
                <Button inverted color="red" className="home-button">Back</Button>
            </div>
        )
    }
}

export default Activate;