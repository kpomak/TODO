import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class Header extends Component{
  constructor(props) {
    super(props)
    this.auth = this.props.isAuthentificated
    this.logOut = this.props.saveToken
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Link className='navbar-brand' to='todo'>ToDo</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='nav-link' to='projects'>Projects</Link>
              <Link className='nav-link' to='users'>Users</Link>
              <Link className='nav-link' to='/'>Home</Link>
              {this.auth()
                ? <Link className='nav-link' to="/" onClick={() => this.logOut()}>Logout</Link>
                : <Link className='nav-link' to="login">Sign in</Link>}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;