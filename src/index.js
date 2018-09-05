import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/index.css';


class Greeter extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="hello">
            Hello, {this.props.title}
            </div>
        );
    }
}

ReactDOM.render(
    <Greeter title="ReactJS" />,
    document.getElementById('root')
);
