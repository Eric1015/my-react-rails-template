import React, { Component } from 'react';
import './App.css';
import './default.css';
import { CookiesProvider } from 'react-cookie';
import TokenAuth from './components/default/TokenAuth';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <TokenAuth />
            </CookiesProvider>
        );
    }
}

export default App;
