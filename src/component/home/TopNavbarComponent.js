import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import Logo from "../../resources/images/logo.png";
import { useNavigate } from 'react-router-dom';

function TopNavbarComponent() {
    const { token, username, logout, loading } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Navbar bg="light" expand="lg" className="top-navbar fixed-top" style={{ userSelect: 'none' }}>
            <Container fluid style={{ userSelect: 'none' }}>
                <Navbar.Brand href="/" className="brand" style={{ userSelect: 'none' }}>
                    <img
                        src={Logo}
                        height="40"
                        className="d-inline-block align-top"
                        alt="Logo"
                        style={{ userSelect: 'none' }}
                    />
                    <span className="brand-name" style={{ fontSize: '25px', userSelect: 'none' }}> ChilliBilly</span>
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
                        {token ? (
                            <>
                                <span className="navbar-text mr-3" style={{ width: '200px', userSelect: 'none', textAlign: 'right', marginRight: '20px' }}>
                                    Hello, {username || 'User'} {/* Display the username */}
                                </span>
                                <Button variant="danger" onClick={handleLogout} className="logout-button" style={{ width: '100px' }}>Log Out</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login" className="nav-item">Sign in</Nav.Link>
                                <Button variant="primary" href="/signup" className="sign-up-button">Sign up</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavbarComponent;
