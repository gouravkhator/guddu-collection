import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
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
                <>
                    <article>
                        <h2>Log In</h2>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required />

                            <label>Password</label>
                            <input type="password" minLength={6} maxLength={20} ref={passwordRef} required />

                            <button disabled={loading} type="submit">
                                Login
                    </button>
                        </form>

                        <div>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </article>

                    <div>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </>
            )}
        </>
    );
}