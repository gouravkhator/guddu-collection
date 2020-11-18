import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../firebase_api';
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');

            //loading so that user does not click signup again and we show loading screen
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            await auth.currentUser.updateProfile({
                displayName: nameRef.current.value
            });

            history.push('/');
        } catch {
            if (!currentUser)
                setError('Failed to create an account');
            else {
                //error saving data in database
                setError('Failed to save your name. Try updating afterwards..');
                history.push('/');
            }
        }

        setLoading(false);
    }

    return (
        <>
            {!!currentUser ? <Redirect to="/" /> : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className="container-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>

                                <Form.Group id="display-name">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" ref={nameRef} minLength={4} maxLength={35} required />
                                </Form.Group>

                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} minLength={6} maxLength={20} required />
                                </Form.Group>

                                <Button variant="primary" disabled={loading} className="w-100" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </>
            )}
        </>
    );
}
