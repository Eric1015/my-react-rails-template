import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {AuthWrapper} from '../../utils/auth_helpers';

class UserHome extends Component {
    render() {
        return (
            <div className="main-container">
                <h1>Congratulations!</h1>
                <p>You're logged in</p>
                <Link to="/"><Button inverted color="red" className="home-button">Back to Home</Button></Link>
            </div>
        )
    }
}

const WrappedUserHome = AuthWrapper(UserHome);

export default WrappedUserHome;