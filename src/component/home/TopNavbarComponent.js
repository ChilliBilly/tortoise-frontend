import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import './TopNavbarComponent.css';
import Logo from '../../resources/images/logo.png';

function TopNavbarComponent() {
    return (
        <Navbar bg="light" expand="lg" className="top-navbar fixed-top">
            <Container fluid>
                <Navbar.Brand href="#home" className="brand">
                    <img
                        src={Logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                    Name
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="mx-auto">
                        <Nav.Link href="#services" className="nav-item">Services</Nav.Link>
                        <Nav.Link href="#api" className="nav-item">API</Nav.Link>
                        <Nav.Link href="#pricing" className="nav-item">Pricing</Nav.Link>
                        <Nav.Link href="#about" className="nav-item">About</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto d-flex align-items-center">
                        <Nav.Link href="/login" className="nav-item">Sign in</Nav.Link>
                        <Button variant="primary" href="/signup" className="sign-up-button">Sign up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbarComponent;
