import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

class Home extends Component {
    render() {
        return (
            <div className="main-container">
                <h1>Welcome to React Rails Template</h1>
                <Link to="/login"><Button inverted color="red" className="home-button">Login</Button></Link>
                <br></br>
                <br></br>
                <Link to="/signup"><Button inverted color="red" className="home-button">Sign Up</Button></Link>
            </div>
        )
    }
}

export default Home;