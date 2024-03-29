import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isUserSignedIn: this.isUserLoggedIn()
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    console.log("Token: ", token);
    return !!token != null ? !!token: false;
  }

  render() {
    const isUserSignedIn = this.state.isUserSignedIn
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-1" light style={{ width: "100%" }}>
          <Container fluid>
            <NavbarBrand tag={Link} to="/">Blog Website</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              {isUserSignedIn ? (
                <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/post">Dashboard</NavLink>
                </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/friend">Add Friend</NavLink>
                  </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/newpost">Create New Post</NavLink>
                </NavItem>
                </ul>) : null}
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
