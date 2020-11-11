import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect } from 'react-router-dom';

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
            setMessage('Check your mail for resetting password')
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <>
            {!!currentUser ? <Redirect to="/" /> : (
                <>
                    <article>
                        <h2>Reset your Password</h2>
                        {!!error && <p>{error}</p>}
                        {!!message && <p>{message}</p>}

                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required />

                            <button disabled={loading} type="submit">
                                Reset Password
                            </button>
                        </form>

                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                        <div>
                            <Link to="/">Cancel</Link>
                        </div>
                    </article>
                </>
            )}
        </>
    );
}