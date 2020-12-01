import React from "react";
import { useHistory } from "react-router";
import { useAuth } from '../../Auth';

//react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import searchIcon from "../../static_resources/search-icon.svg";
// import backArrow from "../../static_resources/back-arrow.svg";

import "./navbar.css";
import { Button } from "react-bootstrap";

export default function MyNavbar() {
    //here if the path is home then about and contact will also be rendered 
    //else login or profile according to loggedin or not
    const history = useHistory();
    const { currentUser, googleSignIn } = useAuth();
    const pathname = history.location.pathname;

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();

        } catch (error) {
            console.log(error);
            // let email = error.email;

            // if (error.code === 'auth/account-exists-with-different-credential') {
            // auth.fetchSignInMethodsForEmail(email).then(function(providers) {

            // }
            // }
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const searchedParam = e.target.searchedParam.value;
        if (searchedParam) {
            history.push('/search/' + searchedParam);
        }
    }

    return (
        <Navbar id="navbar" variant="light" expand="md" sticky="top">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Brand id="navbar-brand" href="/">
                Guddu Collection
                <div id="navbar-logo">
                </div>
                {/* aspect ratio is 1.27 for logo so maintain that */}
                {/* <img src="/gc-logo.png" width="40" height="31.5" alt="Guddu Collection Logo"
                    id="navbar-logo" /> */}
            </Navbar.Brand>

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

                                <NavDropdown.Item href="/logout" active={pathname === "/logout"}>
                                    <Button>Log Out</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                            <>
                                <NavDropdown title="Sign In" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleGoogleSignIn()}>
                                        <img width="17px" height="17px"
                                            alt="Google logo" id="google-logo"
                                            style={{ marginRight: '10px', marginBottom: '3px' }}
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                        Sign In
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item href="/signup" active={pathname === "/signup"}>
                                        Sign Up
                                    </NavDropdown.Item>

                                    <NavDropdown.Item href="/login" active={pathname === "/login"}>
                                        Log In
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}

                    <Nav.Link href="/about" active={pathname === "/about"}>About</Nav.Link>
                </Nav>
                <Form onSubmit={handleSearch}>
                    <Row>
                        <Col>
                            <FormControl type="text" name="searchedParam" placeholder="Search" className="mr-md-4" required />
                        </Col>
                    </Row>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}