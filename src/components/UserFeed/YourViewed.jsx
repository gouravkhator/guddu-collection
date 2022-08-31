import React from "react";

import { Redirect } from "react-router";
import { useAuth } from "../../Auth";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "./feed.scss";

export default function YourViewed() {
  const { currentUser } = useAuth();

  return (
    <>
      {!currentUser ? (
        <Redirect to="/" />
      ) : (
        <Container className="feed-page text-center">
          <article className="feed-article">
            <h2>Feed for You</h2>

            <h4>Oops! Your Feed is empty..</h4>
            <hr />
            <h5>
              The Feed Section is under development.
              <br />
              <br />
              <Button variant="primary" href="/">
                Go Back Home
              </Button>
            </h5>
          </article>
        </Container>
      )}
    </>
  );
}
