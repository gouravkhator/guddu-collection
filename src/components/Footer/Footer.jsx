import Button from 'react-bootstrap/Button';
import React from 'react';
import './footer.css';

export default function Footer() {
    return (
        <footer>
            <Button style={{ fontSize: '20px' }} variant="primary" className="w-100 p-3 font-weight-bold text-monospace" href="tel:9433075689">
                Call Now!! It's FREE
            </Button>
        </footer>
    );
}