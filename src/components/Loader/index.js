import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
};

export default Loader;
