const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        process.env.REACT_APP_SERVER_ENDPOINT,
        createProxyMiddleware({
            target: process.env.SERVER_URL,
            changeOrigin: true,
        })
    );
};
