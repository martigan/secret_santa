import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Header = ({ isAuthenticated, user, onSignIn, onSignOut, onSignUp }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Secret Santa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated && <Nav.Link href="/results">Results</Nav.Link>}
        </Nav>
        <Nav className="ms-auto">
          {" "}
          {isAuthenticated ? (
            <>
              <Navbar.Text className="mr-2">
                Signed in as: {user.username}
              </Navbar.Text>
              <Button variant="outline-danger" onClick={onSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-success"
                className="mr-2"
                onClick={onSignIn}
              >
                Sign In
              </Button>
              <Button variant="outline-primary" onClick={onSignUp}>
                {" "}
                Sign Up
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
