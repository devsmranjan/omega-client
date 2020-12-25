import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    RESET_PASSWORD_TOKEN_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from '../../../_actions/types';
import { checkResetPasswordLink } from '../../../_actions/authActions';
import ResetPasswordForm from './ResetPasswordForm';
import Loader from '../../Loader';
import RaisedButton from '../../RaisedButton';
import styles from './ResetPassword.module.css';
import SWWImg from '../../../assets/somthing-went-wrong.svg';
import SuccessImg from '../../../assets/success.svg';

const ResetPassword = (props) => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    const [passwordToken, setPasswordToken] = useState('');

    useEffect(() => {
        const pToken = props.match.params.token;

        setPasswordToken(pToken);
        dispatch(checkResetPasswordLink(pToken));
    }, []);

    const invalidTokenComponent = (
        <div>
            <img
                src={SWWImg}
                alt="Somthing went wrong"
                className={styles.img}
            />
            <h1 className="heading mt-3">{error.message}!!!</h1>
            <div className="mt-4">
                <RaisedButton
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    title="Go To Home"
                />
            </div>
        </div>
    );

    const validTokenComponent = <ResetPasswordForm pToken={passwordToken} />;

    const successComponent = (
        <div>
            <img src={SuccessImg} alt="Success" className={styles.img} />
            <h1 className="heading mt-3">Password Reset Successfully</h1>
            <div className="mt-4">
                <RaisedButton
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    title="Go To Home"
                />
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            {auth.id === RESET_PASSWORD_SUCCESS ? (
                successComponent
            ) : !auth.isLoading ? (
                auth.id === RESET_PASSWORD_TOKEN_SUCCESS ? (
                    validTokenComponent
                ) : auth.id !== null || error.id === RESET_PASSWORD_FAIL ? (
                    invalidTokenComponent
                ) : null
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ResetPassword;
