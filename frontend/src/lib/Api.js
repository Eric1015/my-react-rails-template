const axios = require('axios');

const version = 'v1';

module.exports = {
    authenticateUser: function(email, password) {
        let data = {auth: {email: email, password: password}};
        return axios.post('/api/' + version + '/user_token', data)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    },

    getCurrentUser: function(jwt) {
        let config = {headers: {Authorization: null}};
        if (jwt) config['headers']['Authorization'] = jwt;
        console.log(config['headers']['Authorization']);
        return axios.get('/api/' + version + '/users/current', config)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    },

    createUser: function(user) {
        let data = user;
        return axios.post('/api/' + version + '/users', data)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    },

    accountActivate: function(activation_token, email) {
        let data = {email: email}
        return axios.get('/api/' + version + '/account_activations/' + activation_token + '/edit', data)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    },

    passwordResetRequest: function(email) {
        let data = {password_reset: {email: email}};
        return axios.post('/api/' + version + '/password_resets', data)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    },

    passwordReset: function(reset_token, email) {
        let data = {email: email};
        return axios.get('/api/' + version + '/password_resets/' + reset_token + '/edit', data)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            throw err;
        });
    }
}