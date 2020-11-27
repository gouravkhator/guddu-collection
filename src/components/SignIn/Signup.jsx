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

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const { handleGoogleSignIn, signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');

            //loading so that user does not click signup again and we show loading screen
            setLoading(true);
            //the checking of errors is done in signup function and thrown from there
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);

            history.push('/');
        } catch (error) {
            setError(error.message);
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
                            <Button className="google-signin-btn" onClick={() => handleGoogleSignIn()}>
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
                            <h2 className="text-center mb-4">Sign Up</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} placeholder="Example@gmail.com" required />
                                </Form.Group>

                                <Form.Group id="display-name">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" ref={nameRef} placeholder="Your name goes here" minLength={4} maxLength={20} required />
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} placeholder="Enter the password" minLength={6} maxLength={40} required />
                                </Form.Group>

                                <Button variant="primary" disabled={loading} className="w-100" type="submit">
                                    {loading ? <b>Signing Up</b> : <b>Sign Up</b>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Container>
            )}
        </>
    );
}
