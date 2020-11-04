import { useContext } from "react";
import { useLocation } from "react-router";

import { AuthContext } from '../../Auth';

export default function Navbar() {
    //here if the path is home then about and contact will also be rendered 
    //else login or profile according to loggedin or not
    const location = useLocation();

    const { currentUser } = useContext(AuthContext);
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>

                {location.pathname === '/' ? (
                    <div>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </div>
                ) : (<div></div>
                    )}

                {!!currentUser ? (
                    <div className="profile">
                        Profile
                    </div>
                ) : (
                        <li><a href="/login">Login</a></li>

                    )}

            </ul>
        </nav >
    );
}