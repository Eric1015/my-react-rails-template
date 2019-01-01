import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

class HeaderButtons extends Component {
    render() {
        return (
            <div className="right-corner">
                <Link to={"/users/" + this.props.appState.user.id}><Button inverted color="red">My Page</Button></Link>
                <Button inverted color="red" onClick={this.props.logout}>Logout</Button>
            </div>
        )
    }
}

class Home extends Component {
    render() {
        let buttons = null;
        if (this.props.appState.user != null) {
            buttons = <HeaderButtons appState={this.props.appState} logout={this.props.logout}/>;
        }
        return (
            <div>
                {buttons}
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