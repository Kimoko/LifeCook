import React, { Component } from 'react';
import { Container, FormControl, Navbar, Nav, Form, Button } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import logo from './5177180.jpg'

export default class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={logo}
              height="30"
              width="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.link href="/">Home</Nav.link>
              <Nav.link href="/about">About us</Nav.link>
              <Nav.link href="/contacts">Contacts</Nav.link>
              <Nav.link href="/blog">Blog</Nav.link>
            </Nav>
            <Form inline>
              <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
