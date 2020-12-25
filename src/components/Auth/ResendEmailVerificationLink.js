import React, { useState, useEffect } from 'react';
import { Modal,  Form, Alert, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../_actions/errorActions';
import {
    RESEND_EMAIL_VERIFICATION_LINK_FAIL,
    RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
} from '../../_actions/types';
import { resendEmailVerificationLink } from '../../_actions/authActions';
import styles from '../../pages/login/login.module.css';
import RaisedButton from '../RaisedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ResendEmailVerificationLink = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // modal
    const [show, setShow] = useState(false);

    // data
    const [email, setEmail] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === RESEND_EMAIL_VERIFICATION_LINK_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (show && auth.id === RESEND_EMAIL_VERIFICATION_LINK_SUCCESS) {
            alert(auth.message);
            handleClose();
            window.location.reload();
        }
    }, [error, auth, show]);

    // handlers
    const handleClose = () => {
        setShow(false);
        dispatch(clearErrors());
        setEmail('');
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // user email
        const userEmail = { email };

        dispatch(resendEmailVerificationLink(userEmail));
    };

    return (
        <div>
            <a href="#!" onClick={handleShow} className={styles.link}>
                Resend Email Verification Link
            </a>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <div>
                        <h6 className="heading mb-4 mt-2">
                            Resend email verification link...
                        </h6>
                        {errorMessage ? (
                            <Alert variant="danger">{errorMessage}</Alert>
                        ) : null}
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text
                                            className={styles.textfieldLeading}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        name="email"
                                        size="lg"
                                        className="formControl"
                                        onChange={(e) => handleEmail(e)}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            <RaisedButton
                                title="Resend"
                                type="submit"
                            />
                            <span className="ml-2 mt-2">
                                <RaisedButton
                                    title="Close"
                                    isInverse={true}
                                    onClick={handleClose}
                                />
                            </span>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ResendEmailVerificationLink;
