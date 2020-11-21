import React from 'react';
import Button from 'react-bootstrap/Button';

export default function About() {
    const telephone_no = "9748044991";

    return (
        <article className="text-center pl-4 pr-4">
            <h2 className="mb-3">About Us</h2>
            <p className="h5">
                <strong>Guddu Collection</strong> is a brand for fashion and prestige. It evolved in 2017 and has become one of the finest fashion one-stop solution.<br />
                    It builds <b>Customer Loyalty and Satisfaction</b> with <b>High Quality Products</b> at service.
                </p>

            <hr />
            <h5>
                <p>Reach out to us at {"\t"}
                    <Button variant="info" href={"tel:" + telephone_no}>
                        {/* <i className="fa fa-phone" aria-hidden="true"></i> */}
                        <img src="phone-white.svg" alt="Phone Icon" width="15" height="20" />
                        {"  " + telephone_no}
                    </Button>
                </p>

                <p>We currently have <b>2</b> branches.</p>
                <div>
                    <h3>Address</h3>
                    <p>
                        <b>89/173, Bangur Park, Near Mother Dairy</b><br />
                        <b>Rishra, Hooghly</b>
                    </p>
                    <br />
                    <p>
                        <b>Paul Complex, Mio Amore Market</b><br />
                        <b>Rishra, Hooghly</b>
                    </p>
                </div>
            </h5>
        </article>
    );
}