import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './RaisedButton.module.css';

const RaisedButton = ({
    isInverse,
    title,
    type,
    onClick,
    href,
    isBlock,
    applyMargin,
}) => {
    return (
        <Button
            type={type}
            className={`${styles.raisedButton} ${
                isInverse ? styles.inverseBtn : ''
            }`}
            onClick={onClick}
            href={href}
            style={isBlock ? { display: 'block', width: '100%' } : null}
        >
            {title}
        </Button>
    );
};

export default RaisedButton;
