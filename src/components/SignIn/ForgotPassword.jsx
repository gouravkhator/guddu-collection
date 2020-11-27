import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect } from 'react-router-dom';

//react-bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Container from 'react-bootstrap/Container';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); //for success message like check your mail for resetting password
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            //resetting all displays and states
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);

            setMessage('Check your mail for resetting password');
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <>
            {!!currentUser ? <Redirect to="/" /> : (
                <Container className="signin-card">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Card className="container-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Reset your Password</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} placeholder="Example@gmail.com" required />
                                </Form.Group>

                                <Button disabled={loading} className="w-100" type="submit">
                                    {loading ? <b>Resetting Password</b> : <b>Reset Password</b>}
                                </Button>
                            </Form>

                            <div className="w-100 text-center mt-3 df">
                                <Link to="/login" className="mr-2">Login</Link>
                                <Link to="/">Cancel</Link>
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