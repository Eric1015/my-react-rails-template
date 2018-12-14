import React, { Component } from 'react';
import './App.css';
import './default.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import axios from 'axios';
import Home from './components/default/Home';
import Login from './components/default/Login';
import SignUp from './components/default/SignUp';
import NotFound from './components/default/NotFound';
import WrappedUserHome from './components/default/UserHome';
import Activate from './components/default/Activate';

class App extends Component {
  constructor() {
    super();
    this.state = { user: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(userID) {
    axios.get('/api/v1/users/' + userID)
      .then((res) => {
        const user = res.data;
        this.setState({user: user}, () => {
          history.push("/users/" + this.state.user.id);
       })
        sessionStorage.setItem("userID", userID);
      }).catch((err) => {

      });
  }

  logout() {
    this.setState({ user: null });
    sessionStorage.setItem("userID", null);
  }

  componentDidMount() {
    if (sessionStorage.getItem("userID") != null) {
      this.login(sessionStorage.getItem("userID"))
    }
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} login={this.login}/>
              <Route path="/signup" component={SignUp} />
              <Route path="/activate" component={Activate} />
              <Route path="/users/:id" component={WrappedUserHome} user={this.state.user} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
