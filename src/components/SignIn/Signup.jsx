import React, { useRef, useState } from 'react';
import { useAuth } from '../../Auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../../firebase_api';

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
                    <article>
                        <h2>Sign Up</h2>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required />

                            <label>Display Name</label>
                            <input type="text" ref={nameRef} minLength={4} maxLength={35} required />

                            <label>Password</label>
                            <input type="password" minLength={6} maxLength={20} ref={passwordRef} required />

                            <button disabled={loading} type="submit">
                                Sign Up
                    </button>
                        </form>
                    </article>

                    <div>
                        Already have an account?  <Link to="/login">Log In</Link>
                    </div>
                </>
            )}

        </>
    );
}