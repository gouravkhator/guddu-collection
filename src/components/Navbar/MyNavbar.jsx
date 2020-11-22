import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from '../../Auth';

//react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./navbar.css";

export default function MyNavbar({ setError }) {
    //here if the path is home then about and contact will also be rendered 
    //else login or profile according to loggedin or not
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = useAuth();
    const pathname = history.location.pathname;

    const handleSearch = (e) => {
        e.preventDefault();

        const searchedParam = e.target.searchedParam.value;
        if (searchedParam) {
            history.push('/search/' + searchedParam);
        }
    }

    const handleLogout = async () => {
        try {
            setError('');
            setLoading(true);
            await logout();
            history.push('login');
        } catch {
            setError('Failed to log out');
        }

        setLoading(false);
    }

    return (
        <Navbar id="navbar" bg="dark" variant="dark" expand="md" sticky="top">
            <Navbar.Brand href="/">
                Guddu Collection
                {/* aspect ratio is 1.27 for logo so maintain that */}
                <img src="gc-logo.png" width="40" height="31.5" alt="Guddu Collection Logo"
                    id="navbar-logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/" active={pathname === "/"}>Home</Nav.Link>
                    {!!currentUser ? (
                        <>
                            <Nav.Link href="/feed" active={pathname === "/feed"}>Feed</Nav.Link>

                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/settings" active={pathname === "/settings"}>
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Divider />

                                <NavDropdown.Item href="/">
                                    <Button disabled={loading} onClick={handleLogout}>Log Out</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                            <NavDropdown title="Sign In" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/signup" active={pathname === "/signup"}>
                                    Sign Up
                                </NavDropdown.Item>

                                <NavDropdown.Item href="/login" active={pathname === "/login"}>
                                    Log In
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}

                    <Nav.Link href="/about" active={pathname === "/about"}>About</Nav.Link>
                </Nav>

                <Form onSubmit={handleSearch}>
                    <Row>
                        <Col>
                            <FormControl type="text" name="searchedParam" placeholder="Search" className="mr-md-4" required />
                        </Col>
                        {/* <Col>
                            <Button type="submit" variant="outline-light">Search</Button>
                        </Col> */}
                    </Row>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}