import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './footer.css';

export default function Footer() {
    const telephone_no = "9748044991";

    return (
        <footer>
            <Row>
                <Col xs={8}>
                    <Button variant="success" className="call-btn w-100 p-3 font-weight-bold text-monospace" href={"tel:" + telephone_no}>
                        <strong>Call Now!! </strong>
                        {/* <img src="phone.svg" alt="Phone Icon" width="25" height="30" /> */}
                        <svg width="25" height="30" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt"
                            className="ml-2 svg-inline--fa fa-phone-alt fa-w-16"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z">
                            </path>
                        </svg>
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button variant="info" className="address-btn w-100 p-3 font-weight-bold text-monospace" href="/about#address">
                        <strong className="address-display">Address </strong>
                        {/* <img src="map-marker.svg" alt="Map Icon" width="25" height="30" /> */}
                        <svg width="25" height="30" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt"
                            className="svg-inline--fa fa-map-marker-alt fa-w-12"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">
                            </path>
                        </svg>
                    </Button>
                </Col>
            </Row>
        </footer >
    );
}

//font awesome was removed and svg was used inline to improve performance
//<i className=" fa fa-phone" aria-hidden="true"></i>
//<i className="fa fa-lg fa-map-marker" aria-hidden="true"></i>
