import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="layout-top">
          <Link to="/">
            Home
          </Link>
          <Link to="dashboard">
            Dash
          </Link>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

