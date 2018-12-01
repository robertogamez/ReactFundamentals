import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sum extends Component {

    render() {
        return (<h1>
            {this.props.a} + {this.props.b} = {this.props.a + this.props.b}
        </h1>);
    }
}

Sum.propTypes = {
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
}

export default Sum;