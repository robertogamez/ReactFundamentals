import React, { Component } from 'react';

class Clicker extends Component {
    render(){
        return <div>
            <button onClick={(e) => this.props.handleClick('A')}>A</button>
            <button onClick={(e) => this.props.handleClick('B')}>B</button>
            <button onClick={(e) => this.props.handleClick('C')}>C</button>
        </div>
    }
}

export default Clicker;