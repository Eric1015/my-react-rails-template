import React from 'react';
import { Redirect } from 'react-router-dom';

export function AuthWrapper(WrappedComponent) {
    return class extends React.Component {
        render() {
            if (this.props.user != null) {
                return <WrappedComponent {...this.props} />
            }
            return <Redirect to="/login"/>
        }
    }
}