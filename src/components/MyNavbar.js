/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-15T20:14:53+00:00
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

export default class MyNavbar extends Component {
  logout = () => {
    localStorage.removeItem('jwtToken');
    this.props.onLogout();
    window.location = '/';
  }
  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/">Books!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            { loggedIn &&
              <Nav.Link as={Link} to="/books/create">Create</Nav.Link>
            }
            </Nav>
            <Nav>
            {(loggedIn) ? (
              <Nav.Link onClick={this.logout} > Logout</Nav.Link>
            ) : (
              <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
// <Nav.Link as={Link} to="/books/create">Create</Nav.Link>
// </Nav>
// <Nav>
// <Nav.Link as={Link} to="/register">Register</Nav.Link>
// <Nav.Link as={Link} to="/login">Login</Nav.Link>
// </Nav>
