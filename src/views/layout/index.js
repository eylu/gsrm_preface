import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleCollapse() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" expand="md">
          <div className="container">
            <NavbarBrand href="/">BeachPrice</NavbarBrand>
            <NavbarToggler onClick={() => this.toggleCollapse()} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink to="/" className="nav-link" exact>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
