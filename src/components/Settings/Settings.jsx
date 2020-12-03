import React, { useState } from 'react';
import { useAuth } from '../../Auth';
import { Redirect, useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import './settings.css';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Account
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Are you sure you want to delete this account ? </h3>
                <h5>
                    This cannot be undone..
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.deleteAccount}>Delete</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Settings() {
    const [modalShow, setModalShow] = useState(false);
    const { deleteAccount, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const deleteConfirmed = async () => {
        try {
            setError('');

            setLoading(true);
            await deleteAccount();
            setModalShow(false);
            history.push('/');
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setError("Deletion of this account requires recent signin. Please logout and login again to delete..");
            } else {
                setError('Failed to delete account');
            }
        }

        setLoading(false);
        setModalShow(false);
    }

    return (
        <>
            {!currentUser ? <Redirect to="/" /> : (
                <Container className="settings-page">
                    {error && <Alert variant="danger">{error}</Alert>}

                    <article className="settings-article text-left pl-4 pr-4">
                        <h2 className="settings-title mb-3">Settings</h2>
                        <div className="text-left mt-4 mb-3">
                            {/* display name is null here if signup happens via email*/}
                            <h4><b>Email</b></h4>
                            <h4 className="settings-dynamic-text mb-3">{currentUser.email}</h4>
                            {currentUser.displayName &&
                                <>
                                    <h4><b>Display Name</b></h4>
                                    <h4 className="settings-dynamic-text mb-3">
                                        {currentUser.displayName}
                                    </h4>
                                </>
                            }

                            <Button variant="danger" disabled={loading} onClick={() => setModalShow(true)}>
                                {loading ? <b>Deleting Account</b> : <b>Delete Account</b>}
                            </Button>
                        </div>
                    </article>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        deleteAccount={() => deleteConfirmed()}
                    />
                </Container>
            )}
        </>
    )
}
