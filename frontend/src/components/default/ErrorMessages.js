import React, { Component } from 'react';

class ErrorMessages extends Component {
    render () {
        return (
            <div>
                {this.props.error_messages.map((error_message, i) => 
                    <p className="error" key={i}>{error_message}</p>
                )}
            </div>
        )
    }
}

export default ErrorMessages;