import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConditionalDisplay extends Component {
    render(){
        return (<div>
            { this.props.isVisible ? this.props.children : null }
        </div>);
    }
}

ConditionalDisplay.propTypes = {
    isVisible: PropTypes.bool.isRequired
}

export default ConditionalDisplay;