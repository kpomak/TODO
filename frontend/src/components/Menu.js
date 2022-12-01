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
    this.searchItem = this.props.searchItem
    this.state = {
      "search": ""
    }
  }

  handlePress(target) {
    target.nextElementSibling.value = "";
    this.setState({"search": ""}, () => this.searchItem(""))
  }

  handleChange(target) {
    this.setState({[target.name]: target.value})
  }

  handleSubmit() {
    this.searchItem(this.state.search)
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
              {this.auth() && this.props.user ? <div className='nav-link'>{`Hi, ${this.props.user.firstName}!`}</div> : null }
            </Nav>
            <Form className="d-flex">
              {this.state.search
                ?<Button className="me-2" type="button" variant="outline-success" onClick={({target}) => this.handlePress(target)}>Clear</Button>
                : null}
              <Form.Control
                type="search"
                name="search"
                placeholder="Project search"
                className="me-2"
                aria-label="Search"
                onChange={({target}) => this.handleChange(target)}
              />
              <Link className='btn btn-primary' to='../projects/' 
										onClick={() => this.handleSubmit()}>Search</Link>

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;