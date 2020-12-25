import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import {
    SPREADSHEETS_ENDPOINT,
    SUBSCRIPTIONS_ENDPOINT,
} from '../../../utils/apiEndpoints';
import styles from './Spreadsheet.module.css';
import TextLoader from '../../Loader/TextLoader';

const Spreadsheet = ({ sheet, color }) => {
    const [subscribedSheetData, setSubscribedSheetData] = useState(null);

    const getSpreadsheet = async () => {
        try {
            const subResponse = await axios.get(
                `${SUBSCRIPTIONS_ENDPOINT}?uid=${sheet.uid}`,
                tokenConfig()
            );

            const auth = {
                access_token:
                    subResponse.data.data.subscriptions[0].accessToken,
                refresh_token:
                    subResponse.data.data.subscriptions[0].refreshToken,
                scope: subResponse.data.data.subscriptions[0].scope,
                id_token: subResponse.data.data.subscriptions[0].idToken,
                token_type: subResponse.data.data.subscriptions[0].tokenType,
                expiry_date: subResponse.data.data.subscriptions[0].expiryDate,
            };

            const sheetResponse = await axios.post(
                `${SPREADSHEETS_ENDPOINT}/spreadsheetFromAPI`,
                {
                    ...auth,
                    spreadsheetId: sheet.sheetId,
                    tab: sheet.sheetTab,
                    spreadsheetTitle: sheet.sheetTitle,
                },
                tokenConfig()
            );
            setSubscribedSheetData(sheetResponse.data.data);

            // console.log('SubscribedSheetData', sheetResponse.data.data);
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
        getSpreadsheet();
    }, []);

    return (
        <Container className={styles.container}>
            {subscribedSheetData !== null ? (
                subscribedSheetData.sheetRows.length <= 0 ? (
                    'No spreadsheet'
                ) : (
                    <div style={{ marginRight: '20px' }}>
                        {subscribedSheetData.sheetRows !== null ? (
                            subscribedSheetData.sheetRows.length <= 0 ? (
                                <h6>No rows available</h6>
                            ) : (
                                <Table
                                    responsive
                                    // bordered
                                    striped
                                    className={styles.table}
                                >
                                    {/* <tbody> */}
                                    {subscribedSheetData.sheetRows.map(
                                        (row, i) =>
                                            i === 0 ? (
                                                <tr key={i}>
                                                    {row.map((data, j) => (
                                                        <th
                                                            style={{
                                                                color: color,
                                                                // color:
                                                                //     '#ffffff',
                                                                textTransform:
                                                                    'uppercase',
                                                                letterSpacing:
                                                                    '0.1rem',
                                                            }}
                                                            key={j}
                                                        >
                                                            {data}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ) : (
                                                <tr key={i}>
                                                    {row.map((data, j) => (
                                                        <td key={j}>{data}</td>
                                                    ))}
                                                </tr>
                                            )
                                    )}
                                    {/* </tbody> */}
                                </Table>
                            )
                        ) : null}
                    </div>
                )
            ) : (
                <TextLoader />
            )}
        </Container>
    );
};

export default Spreadsheet;
