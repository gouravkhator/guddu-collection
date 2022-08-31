import React, { useState } from "react";
import { useAuth } from "../../Auth";
import { Redirect, useHistory } from "react-router-dom";

// react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import "./signin.scss";

export default function Logout() {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogout(e) {
    e.preventDefault();

    try {
      setError("");

      // loading so that user does not click login again, and we show loading screen
      setLoading(true);
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out. Please try again later..");
      setLoading(false);
    }
  }

  return (
    <>
      {!currentUser ? (
        <Redirect to="/" />
      ) : (
        <Container className="signin-card">
          {error && <Alert variant="danger">{error}</Alert>}

          <Card className="container-sm">
            <Card.Body className="text-center">
              <h2 className="mb-4">Log Out</h2>
              <hr />
              <h4 className="mb-4">Are you sure, you want to logout?</h4>

              <div className="logout-btns">
                <div>
                  <Button
                    onClick={handleLogout}
                    variant="primary"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? <b>Logging Out</b> : <b>Log Out</b>}
                  </Button>
                </div>

                <div>
                  <Button variant="secondary" href="/">
                    <b>Cancel</b>
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}
