import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

class ThankYou extends Component {
    render() {
        return (
            <div className="main-container">
                <h1>Thank you!</h1>
                <p>Check your email for account activation</p>
                <Link to="/"><Button inverted color="red" className="home-button">Back</Button></Link>
            </div>
        )
    }
}

export default ThankYou;