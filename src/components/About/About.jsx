import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./about.scss";

export default function About() {
  const telephone_no = "9748044991";

  return (
    <Container className="about-page">
      <article className="about-article text-left pl-4 pr-4">
        <h2 className="about-titles mb-3">About Us</h2>
        <div className="mt-4 mb-3">
          <h4>
            <strong>Guddu Collection</strong> is a brand for fashion and
            prestige. It evolved in 2017 and has become one of the finest
            fashion one-stop solution.
            <br />
            It builds <b>Customer Loyalty and Satisfaction</b> with{" "}
            <b>High Quality Products</b> at service.
          </h4>
        </div>

        <hr />
        <div>
          <h4>
            Reach out to us at {"\t"}
            <Button variant="info" href={"tel:" + telephone_no}>
              {/* <i className="fa fa-phone" aria-hidden="true"></i> */}
              {/* <img src="phone-white.svg" alt="Phone Icon" width="15" height="20" /> */}
              {/* Using svg inline improves performance */}
              <svg
                width="15"
                height="20"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="phone-alt"
                className="svg-inline--fa fa-phone-alt fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                ></path>
              </svg>
              {"  " + telephone_no}
            </Button>
          </h4>

          <h4 className="text-left">
            <p>
              We currently have <b>2</b> branches.
            </p>
          </h4>

          <div className="text-left">
            <h3 className="about-titles mb-3">
              <b>Address</b>
            </h3>

            <h5 id="address">
              <b>89/173, Bangur Park, Near Mother Dairy</b>
              <br />
              <b>Rishra, Hooghly</b>
            </h5>
            <br />

            <h5>
              <b>Paul Complex, Mio Amore Market</b>
              <br />
              <b>Rishra, Hooghly</b>
            </h5>
          </div>
        </div>
      </article>
    </Container>
  );
}
