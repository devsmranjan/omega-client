import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ title, onClick, isBlock, iconButton }) => {
    return (
        <Button
            className={`${
                !iconButton ? styles.deleteButton : styles.iconButton
            }`}
            style={isBlock ? { display: 'block', width: '100%' } : null}
            onClick={onClick}
        >
            {!iconButton ? title : <FontAwesomeIcon icon={faTrash} />}
        </Button>
    );
};

export default DeleteButton;
