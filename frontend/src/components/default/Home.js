import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

class Home extends Component {
    render() {
        let logout_button = null;
        if (this.props.appState.user != null) {
            logout_button = <Button inverted color="red" className="right-corner" onClick={this.props.logout}>Logout</Button>;
        }
        return (
            <div>
                {logout_button}
                <div className="main-container">
                    <h1>Welcome to React Rails Template</h1>
                    <Link to="/login"><Button inverted color="red" className="home-button">Login</Button></Link>
                    <br></br>
                    <br></br>
                    <Link to="/signup"><Button inverted color="red" className="home-button">Sign Up</Button></Link>
                </div>
            </div>
        )
    }
}

export default Home;