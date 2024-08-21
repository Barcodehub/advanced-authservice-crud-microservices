const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Proxy middleware
const authServiceProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api/auth'
  }
});

const productServiceProxy = createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/api/products'
  }
});

// Routes
app.use('/api/auth', authServiceProxy);
app.use('/api/products', productServiceProxy);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));