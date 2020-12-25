import React from 'react';
import styles from './Loader.module.css';

const TextLoader = () => {
    return (
        <div className={styles.textLoaderContainer}>
            <h6>Loading spreadsheet...</h6>
        </div>
    );
};

export default TextLoader;
