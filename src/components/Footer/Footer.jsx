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
                    <Button style={{ fontSize: '20px' }} variant="warning" className="w-100 p-3 font-weight-bold text-monospace" href={"tel:" + telephone_no}>
                        Call Now!! <img src="phone.svg" alt="Phone Icon" width="25" height="30" />
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button style={{ fontSize: '20px' }} variant="dark" className="w-100 p-3 font-weight-bold text-monospace" href="/about">
                        <strong className="address-display">Address </strong>
                        <img src="map-marker.svg" alt="Map Icon" width="25" height="30" />
                    </Button>
                </Col>
            </Row>
        </footer >
    );
}

//font awesome was removed and svg was used
//<i className=" fa fa-phone" aria-hidden="true"></i>
//<i className="fa fa-lg fa-map-marker" aria-hidden="true"></i>
