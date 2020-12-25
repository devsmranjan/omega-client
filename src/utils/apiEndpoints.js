module.exports = {
    AUTH_SIGNUP: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/signup`,
    AUTH_LOGIN: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/login`,
    AUTH_RECOVER: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/recover`,
    AUTH_RESET_PASSWORD_CHECK: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/reset`,
    AUTH_VERIFY_EMAIL_RESEND: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/resend`,
    AUTH_VERIFY_EMAIL: `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/verify`,

    // user
    USER_ENDPOINT: `${process.env.REACT_APP_SERVER_ENDPOINT}/user`,
    USER_UPDATE: `${process.env.REACT_APP_SERVER_ENDPOINT}/user/update`,
    USER_UPDATE_PASSWORD: `${process.env.REACT_APP_SERVER_ENDPOINT}/user/updatePassword`,
    USER_DELETE: `${process.env.REACT_APP_SERVER_ENDPOINT}/user/deleteAccount`,

    // subscriptions
    SUBSCRIPTIONS_ENDPOINT: `${process.env.REACT_APP_SERVER_ENDPOINT}/subscriptions`,
    ADD_SUBSCRIPTION: `${process.env.REACT_APP_SERVER_ENDPOINT}/subscriptions/add/google`,

    // spreadsheets
    SPREADSHEETS_ENDPOINT: `${process.env.REACT_APP_SERVER_ENDPOINT}/spreadsheets`,
    SPREADSHEETS_FROM_API: `${process.env.REACT_APP_SERVER_ENDPOINT}/spreadsheets/sheetsFromAPI`,
    SPREADSHEET_TABS_FROM_API: `${process.env.REACT_APP_SERVER_ENDPOINT}/spreadsheets/sheetTabsFromAPI`,

    //
};
