import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

class NotFound extends Component {
    render() {
        return (
            <div className="main-container">
                <h1>404 Page Not Found</h1>
                <Link to="/"><Button inverted color="red" className="home-button">Back to Home</Button></Link>
            </div>
        )
    }
}

export default NotFound;