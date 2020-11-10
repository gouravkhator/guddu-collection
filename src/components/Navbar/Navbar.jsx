import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from '../../Auth';

export default function Navbar({ setError }) {
    //here if the path is home then about and contact will also be rendered 
    //else login or profile according to loggedin or not
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            setError('');
            setLoading(true);
            await logout();
            history.push('/login');
        } catch {
            setError('Failed to log out');
        }

        setLoading(false);
    }

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>

                {history.location.pathname === '/' && (
                    <div>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </div>
                )}

                {!!currentUser ? (
                    <>
                        <div className="profile">
                            Profile
                        </div>

                        <li><button disabled={loading} onClick={handleLogout}>Log Out</button></li>
                    </>
                ) : (
                        <>
                            <li><a href="/signup">Sign Up</a></li>
                            <li><a href="/login">Log In</a></li>
                        </>
                    )}

            </ul>
        </nav >
    );
}