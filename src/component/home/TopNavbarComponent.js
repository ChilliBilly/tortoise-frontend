import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext'; // Import UserContext
import Logo from "../../resources/images/logo.png"; // Import your logo image
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function TopNavbarComponent() {
    const { userId, token, logout, loading } = useContext(UserContext);
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle logout
    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>; // Optional: show a loading state while loading user data

    return (
        <Navbar bg="light" expand="lg" className="top-navbar fixed-top">
            <Container fluid>
                <Navbar.Brand href="#home" className="brand">
                    <img
                        src={Logo}
                        height="40"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                    <span className="brand-name">Name</span>
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
                                <span className="navbar-text mr-3" style={{ width: '200px' }}>Hello, User</span> {/* Display the user's name or ID */}
                                <Button variant="danger" onClick={handleLogout} className="logout-button">Log Out</Button>
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
