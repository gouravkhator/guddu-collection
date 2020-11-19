import React from 'react';

import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useAuth } from '../../Auth';

export default function YourViewed() {
    const telephone_no = "9748044991";
    const { currentUser } = useAuth();

    return (
        <>
            {!currentUser ? <Redirect to="/" /> :
                <Container className="text-center">
                    <article>
                        <h2>Items Viewed By You</h2>

                        <h4>Oops! Your Feed is empty..</h4>
                        <hr />
                        <h5>
                            The Feed Section is under development.
                            <br /><br />
                            Please <b>call</b> at <Button variant="success" href={"tel:" + telephone_no}>{telephone_no}</Button> <br /><br />
                            <Button variant="primary" href="/">Go Back Home</Button>
                        </h5>

                    </article>
                </Container>
            }
        </>
    );
}