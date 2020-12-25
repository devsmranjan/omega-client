import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyEmail } from '../../../_actions/authActions';
import {
    EMAIL_VERIFICATION_SUCCESS,
    EMAIL_VERIFICATION_FAIL,
} from '../../../_actions/types';
import styles from './VerifyEmailLink.module.css';
import Loader from '../../Loader';
import RaisedButton from '../../RaisedButton';
import SWWImg from '../../../assets/somthing-went-wrong.svg';
import SuccessImg from '../../../assets/success.svg';

const VerifyEmailLink = (props) => {
    const auth = useSelector((state) => state.auth);
    const error = useSelector((state) => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        const evToken = props.match.params.token;

        dispatch(verifyEmail(evToken));
    }, []);

    const invalidTokenComponent = (
        <div>
            <img
                src={SWWImg}
                alt="Somthing went wrong"
                className={styles.img}
            />
            <h1 className="heading mt-3">{error.message}!!!</h1>
        </div>
    );

    const validTokenComponent = (
        <div>
            <img
                src={SuccessImg}
                alt="Verified Success"
                className={styles.img}
            />
            <h1 className="heading mt-3">This account has been verified...</h1>
        </div>
    );

    return (
        <div className={styles.container}>
            {!auth.isLoading ? (
                <div>
                    {auth.id === EMAIL_VERIFICATION_SUCCESS
                        ? validTokenComponent
                        : auth.id !== null ||
                          error.id === EMAIL_VERIFICATION_FAIL
                        ? invalidTokenComponent
                        : null}

                    <div className="mt-4">
                        <RaisedButton
                            onClick={() => {
                                window.location.href = '/';
                            }}
                            title="Go To Home"
                        />
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default VerifyEmailLink;
