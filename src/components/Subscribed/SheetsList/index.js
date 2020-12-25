import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { SPREADSHEETS_ENDPOINT } from '../../../utils/apiEndpoints';
import { Container, Table } from 'react-bootstrap';
import styles from './SheetsList.module.css';
import NoSheets from '../../../assets/no-sheets.svg';
import DeleteButton from '../../DeleteButton';
import { removeSubscribedSpreadsheet } from '../../../_actions/spreadsheetsActions';

const SheetsList = ({ uid }) => {
    const spreadsheets = useSelector((state) => state.spreadsheets);
    const [subscribedSheetsList, setSubscribedSheetsList] = useState(null);
    const dispatch = useDispatch();

    const getSubscribedSpreadsheetByUID = async () => {
        try {
            const response = await axios.get(
                `${SPREADSHEETS_ENDPOINT}?uid=${uid}`,
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
        getSubscribedSpreadsheetByUID();
    }, [spreadsheets]);

    const handleRemoveSpreadsheet = async (sheetId) => {
        dispatch(removeSubscribedSpreadsheet(sheetId));
    };

    return (
        <Container className="mt-4 p-0">
            {subscribedSheetsList !== null ? (
                subscribedSheetsList.length > 0 ? (
                    <Table responsive className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>#</th>
                                <th className={styles.th}>Sheet Title</th>
                                <th className={styles.th}>Sheet Tab</th>
                                <th className={styles.th}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribedSheetsList.map((sheet, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{sheet.sheetTitle}</td>
                                    <td>{sheet.sheetTab}</td>
                                    <td>
                                        <DeleteButton
                                            iconButton
                                            onClick={() =>
                                                handleRemoveSpreadsheet(
                                                    sheet.sheetId
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="text-center">
                        <img
                            src={NoSheets}
                            className={styles.noDataImg}
                            alt="No spreadsheets"
                        />
                    </div>
                )
            ) : null}
        </Container>
    );
};

export default SheetsList;
