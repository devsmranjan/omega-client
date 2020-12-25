import React, { useState, useEffect } from 'react';
import { Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import RaisedButton from '../RaisedButton';
import SheetsList from './SheetsList';
import {
    addSubscribedSpreadsheet,
    clearSpreadsheetData,
    getSheetsFromAPI,
    getSheetTabsFromAPI,
} from '../../_actions/spreadsheetsActions';
import {
    ADD_SPREADSHEET_FAIL,
    ADD_SPREADSHEET_SUCCESS,
    FETCH_SPREADSHEETS_FROM_API_FAIL,
    FETCH_SPREADSHEETS_FROM_API_SUCCESS,
    FETCH_SPREADSHEET_TABS_SUCCESS,
} from '../../_actions/types';
import { clearErrors } from '../../_actions/errorActions';
import styles from './Subscribed.module.css';
import DeleteButton from '../DeleteButton';
import { removeSubscription } from '../../_actions/subscriptionsAction';

const SubscribedComponent = ({ sub }) => {
    const spreadsheets = useSelector((state) => state.spreadsheets);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [allSheets, setAllSheets] = useState(null);
    const [allTabs, setAllTabs] = useState(null);

    // message
    const [errorMessage, setErrorMessage] = useState('');

    const [sheet, setSheet] = useState('');
    const [sheetTab, setSheetTab] = useState('');

    useEffect(() => {
        if (
            error.id === FETCH_SPREADSHEETS_FROM_API_FAIL ||
            error.id === FETCH_SPREADSHEET_TABS_SUCCESS ||
            error.id === ADD_SPREADSHEET_FAIL
        ) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage('');
        }

        if (spreadsheets.id === FETCH_SPREADSHEETS_FROM_API_SUCCESS) {
            setAllSheets(spreadsheets.allSpreadsheets);
        }

        if (spreadsheets.id === FETCH_SPREADSHEET_TABS_SUCCESS) {
            setAllTabs(spreadsheets.allTabs);
        }

        if (spreadsheets.id === ADD_SPREADSHEET_SUCCESS) {
            handleCloseModal(true);
        }
    }, [error, spreadsheets]);

    const handleCloseModal = () => {
        setShowModal(false);
        setAllSheets(null);
        setAllTabs(null);
        setSheet('');
        setSheetTab('');
        dispatch(clearSpreadsheetData());
        dispatch(clearErrors());
    };

    const handleShowModal = () => {
        setShowModal(true);

        dispatch(getSheetsFromAPI(sub));
    };

    const handleSheet = async (value) => {
        setSheet(value);
        dispatch(getSheetTabsFromAPI(sub, value));
    };

    const handleSheetTab = (value) => {
        setSheetTab(value);
    };

    const handleAddSheet = async (e) => {
        e.preventDefault();

        const sheetFromList = allSheets.find(
            (spreadsheet) => spreadsheet.id === sheet
        );

        const data = {
            uid: sub.uid,
            sheetTitle: sheetFromList.name.trim(),
            sheetId: sheet,
            sheetTab: sheetTab,
        };

        dispatch(addSubscribedSpreadsheet(data));
    };

    const handleRemoveSubscription = async () => {
        dispatch(removeSubscription(sub.uid));
    };

    return (
        <div className="mt-5">
            <div className={styles.container}>
                <Row>
                    <Col>
                        <div
                            style={{
                                marginBottom: '36px',
                                textAlign: 'center',
                            }}
                        >
                            <h5
                                style={{
                                    fontWeight: 600,
                                    fontSize: '1.6rem',
                                }}
                                className="heading"
                            >
                                {sub.email}
                            </h5>
                        </div>
                    </Col>
                </Row>
                <SheetsList uid={sub.uid} />
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '12px',
                        marginTop: '36px',
                    }}
                >
                    <RaisedButton
                        title="Add new sheet"
                        onClick={handleShowModal}
                    />

                    <DeleteButton
                        title="Remove"
                        onClick={handleRemoveSubscription}
                    />
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>
                    <div>
                        <h6 className="heading">
                            Adding a sheet from subscription {sub.email}
                        </h6>
                        {errorMessage ? (
                            <Alert variant="danger">{errorMessage}</Alert>
                        ) : null}
                        <Form onSubmit={(e) => handleAddSheet(e)}>
                            <Form.Group>
                                <div className={styles.selectWrapper}>
                                    <Form.Control
                                        as="select"
                                        disabled={
                                            allSheets === null
                                                ? 'disabled'
                                                : null
                                        }
                                        size="lg"
                                        value={sheet}
                                        onChange={(e) =>
                                            handleSheet(e.target.value)
                                        }
                                        className={styles.select}
                                    >
                                        <option value="">Choose Sheet</option>
                                        {allSheets !== null
                                            ? allSheets.map((sheet, i) => (
                                                  <option
                                                      key={i}
                                                      value={sheet.id}
                                                  >
                                                      {sheet.name}
                                                  </option>
                                              ))
                                            : null}
                                    </Form.Control>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div className={styles.selectWrapper}>
                                    <Form.Control
                                        as="select"
                                        size="lg"
                                        disabled={
                                            allTabs === null ? 'disabled' : null
                                        }
                                        onChange={(e) =>
                                            handleSheetTab(e.target.value)
                                        }
                                        className={styles.select}
                                    >
                                        <option value="">Choose Tab</option>
                                        {allTabs !== null
                                            ? allTabs.map((tab, i) => (
                                                  <option key={i} value={tab}>
                                                      {tab}
                                                  </option>
                                              ))
                                            : null}
                                    </Form.Control>
                                </div>
                            </Form.Group>
                            <div className="mt-4">
                                <RaisedButton title="Add" type="submit" />
                                <span className="ml-2 mt-2">
                                    <RaisedButton
                                        title="Close"
                                        isInverse={true}
                                        onClick={handleCloseModal}
                                    />
                                </span>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SubscribedComponent;
