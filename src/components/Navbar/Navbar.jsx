import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth';

export default function Navbar({ setError }) {
    //here if the path is home then about and contact will also be rendered 
    //else login or profile according to loggedin or not
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = useAuth();
    const pathname = history.location.pathname;

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
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/feed">Feed</Link>
                </li>

                {(pathname === '/' || pathname === '/feed') && (
                    <div>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </div>
                )}

                {!!currentUser ? (
                    <>
                        {/* All functions like settings or logout etc. comes when we hover on profile arrow */}
                        <li>
                            <div className="profile">
                                Profile
                        </div>

                            <ul>
                                <li>
                                    <Link to="/settings">Settings</Link>
                                </li>

                                <li>
                                    <button disabled={loading} onClick={handleLogout}>Log Out</button>
                                </li>
                            </ul>
                        </li>
                    </>
                ) : (
                        <>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login">Log In</Link>
                            </li>
                        </>
                    )}

            </ul>
        </nav >
    );
}