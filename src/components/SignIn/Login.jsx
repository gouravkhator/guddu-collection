import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect, useHistory } from 'react-router-dom';

//react-bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';

import './signin.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { handleGoogleSignIn, login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');

            //loading so that user does not click login again and we show loading screen
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <>
            {!!currentUser ? <Redirect to="/" /> : (
                <Container className="signin-card">
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Card className="container-sm">
                        <Card.Body>
                            <Button variant="info" className="google-signin-btn" onClick={() => handleGoogleSignIn()}>
                                <img width="25px" height="25px"
                                    alt="Google logo" id="google-logo"
                                    style={{
                                        marginRight: '10px', marginBottom: '3px',
                                        background: 'white', padding: '5px'
                                    }}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                <b>Sign In with Google</b>
                            </Button>

                            <h3 className="text-center mt-3 mb-3">Or</h3>
                            <h2 className="text-center mb-4">Log In</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} placeholder="Example@gmail.com" required />
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} placeholder="Enter the password" minLength={6} maxLength={40} required />
                                </Form.Group>

                                <Button variant="primary" disabled={loading} className="w-100" type="submit">
                                    {loading ? <b>Logging In</b> : <b>Log In</b>}
                                </Button>
                            </Form>

                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </Container>
            )}
        </>
    );
}
