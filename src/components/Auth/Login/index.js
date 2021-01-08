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
import { faKey, faAt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../pages/login/login.module.css';
import RaisedButton from '../../RaisedButton';
import { LOGIN_FAIL } from '../../../_actions/types';
import { logIn } from '../../../_actions/authActions';
import Options from './Options';

const LoginComponent = () => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    // data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // message
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (error.id === LOGIN_FAIL) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }
    }, [error]);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // create new user
        const userDetails = { username, password };

        // Attempt to register
        dispatch(logIn(userDetails));
    };

    return (
        <Container>
            <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h1 className="heading-title display-4 mb-4">
                    Welcome Back...
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
                    <Row>
                        <Col>
                            <RaisedButton title="Log In" type="submit" />
                            <span className="ml-2">
                                <RaisedButton
                                    isInverse={true}
                                    title="Create"
                                    href="/signup"
                                />
                            </span>
                        </Col>
                    </Row>
                </div>
            </Form>

            <Options />
        </Container>
    );
};

export default LoginComponent;
