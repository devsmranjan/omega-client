import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import Spreadsheet from '../Spreadsheet';
import { SPREADSHEETS_ENDPOINT } from '../../../utils/apiEndpoints';
import styles from './AllSpreadsheets.module.css';
import Loader from '../../Loader';
import colors from '../../../utils/colors';
import NoSubscriptionImg from '../../../assets/no-subscription.svg';

const AllSpreadsheets = () => {
    const [subscribedSheetsList, setSubscribedSheetsList] = useState(null);

    const getAllSubscribedSpreadsheets = async () => {
        try {
            const response = await axios.get(
                `${SPREADSHEETS_ENDPOINT}`,
                tokenConfig()
            );

            setSubscribedSheetsList(response.data.data.spreadsheets);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const tokenConfig = () => {
        // Get token from local storage
        const token = localStorage.getItem('token');

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // if token then add to header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    };

    useEffect(() => {
        getAllSubscribedSpreadsheets();
    }, []);

    const [tabKey, setTabKey] = useState(0);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="">
            {subscribedSheetsList !== null ? (
                subscribedSheetsList.length > 0 ? (
                    <Tab.Container
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                    >
                        <Row>
                            <Col
                                sm={3}
                                className={styles.col}
                                style={{
                                    border: '1px solid #eee',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Nav variant="pills" className="flex-column">
                                    {subscribedSheetsList.map((subSheet, i) => (
                                        <Nav.Item
                                            key={i}
                                            className={styles.navItem}
                                        >
                                            <Nav.Link
                                                eventKey={i}
                                                className={styles.navLink}
                                                style={{
                                                    backgroundColor:
                                                        tabKey == i
                                                            ? randomColor
                                                            : null,
                                                }}
                                            >
                                                {subSheet.sheetTitle},{' '}
                                                {subSheet.sheetTab}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                            <Col
                                sm={9}
                                className={styles.col}
                                style={{
                                    paddingLeft: '0px',
                                    paddingRight: '0px',
                                }}
                            >
                                <Tab.Content>
                                    {subscribedSheetsList.map((subSheet, i) => (
                                        <Tab.Pane key={i} eventKey={i}>
                                            <Spreadsheet
                                                sheet={subSheet}
                                                color={randomColor}
                                            />
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                ) : (
                    <div
                        style={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src={NoSubscriptionImg}
                                className={styles.noSubImg}
                                alt="No subscription"
                            />
                            <h5 className="heading-title mt-5">
                                No spreadsheet subscribed yet...
                            </h5>
                        </div>
                    </div>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AllSpreadsheets;
