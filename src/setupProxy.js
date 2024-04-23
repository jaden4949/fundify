const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    const target = process.env.NODE_ENV === 'production' ? 'https://peaceful-lowlands-48294-39948cb92041.herokuapp.com' : 'http://localhost:3001';

    app.use(createProxyMiddleware('/api/**', { target: target }));
    app.use(createProxyMiddleware('/otherApi/**', { target: target }));
};
