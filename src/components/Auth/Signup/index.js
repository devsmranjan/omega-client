import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Alert,
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faKey,
    faAt,
    faUser,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../pages/signup/signup.module.css';
import RaisedButton from '../../RaisedButton';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
} from '../../../_actions/types';
import {  signUp } from '../../../_actions/authActions';

const SignupComponent = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === REGISTER_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (auth.id === REGISTER_SUCCESS && error.message !== null) {
            alert(auth.message);
            window.location.href = '/login';
        }
    }, [error, auth]);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const newUser = { name, email, username, password };

        // Attempt to register
        dispatch(signUp(newUser));
    };

    return (
        <Container>
            <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h1 className="heading display-4 mb-4">
                    Create a new Account...
                </h1>
                {errorMessage ? (
                    <Alert variant="danger">{errorMessage}</Alert>
                ) : null}

                <Form.Group>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text
                                className={styles.textfieldLeading}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Your Name"
                            size="lg"
                            className="formControl"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => handleName(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text
                                className={styles.textfieldLeading}
                            >
                                <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Email Address"
                            size="lg"
                            className="formControl"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleEmail(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text
                                className={styles.textfieldLeading}
                            >
                                <FontAwesomeIcon icon={faAt} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Username"
                            size="lg"
                            className="formControl"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => handleUsername(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text
                                className={styles.textfieldLeading}
                            >
                                <FontAwesomeIcon icon={faKey} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Password"
                            size="lg"
                            className="formControl"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => handlePassword(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>

                <div className="mt-4">
                    {/* <RaisedButton title="Sign up" type="submit" /> */}
                    <Row>
                        <Col>
                            <RaisedButton title="Sign up" type="submit" />
                            <span className="ml-2">
                                <RaisedButton
                                    isInverse={true}
                                    title="Log in"
                                    href="/login"
                                />
                            </span>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Container>
    );
};

export default SignupComponent;
