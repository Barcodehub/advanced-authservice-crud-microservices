# Microservices-Based JWT Authentication and Product Management API

This project is a microservices-based API built with Node.js, Express, and MongoDB. It provides a comprehensive authentication system with advanced security features including Two-Factor Authentication (2FA), and basic product management functionality. The system consists of three main services: an API Gateway, an Authentication Service, and a Product Service.

## Table of Contents

- [Architecture](#architecture)
- [Services](#services)
- [Environment Variables Setup](#environment-variables-setup)
- [Installation and Running](#installation-and-running)
- [API Testing](#api-testing)


## Architecture

The application follows a microservices architecture:

- **API Gateway**: Routes requests to appropriate services
- **Auth Service**: Handles user authentication and authorization
- **Product Service**: Manages product-related operations

## Services

### API Gateway
- Routes requests to auth and product services
- Handles 404 errors for undefined routes

### Auth Service
- User registration
- User login with JWT token generation
- Role-based access control

### Product Service
- CRUD operations for products
- Role-based access to certain operations


## Environment Variables Setup

Create a `.env` file in the root directory and add the following variables:

product-services
```
MONGO_URI=your-mongodb-uri
JWT_SECRET=your_jwt_secret_here
```

auth-services
```
MONGODB_URI=your-mongodb-uri
SESSION_SECRET=your_session_secret_here
JWT_SECRET=your_jwt_secret_here
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=3600000
BODY_LIMIT=10kb
SESSION_MAX_AGE=604800000
ADMIN_EMAIL=tu_email_admin@example.com
ADMIN_PASSWORD=tu_contraseña_secreta
```
api-gateway
```
AUTH_SERVICE_URL=http://localhost:3000
PRODUCT_SERVICE_URL=http://localhost:3001

```
or your url.

## Installation and Running

To run:
```
npm run start
```

## API Testing

  - GET /api/auth/csrf-token: Retrieve the CSRF token.  
  - POST /api/auth/register: Register a new user.  
    ```
    X-CSRF-Token: token of step 1
    ```
    body:
    ```
    {
    "email": "",
    "password": ""
    }
    ```

  - POST /api/auth/login: Login a user. 
    ```
    X-CSRF-Token: token of step 1
    ```
    body:
    ```
    {
    "email": "",
    "password": ""
    }
    ```

  - POST /api/products: create product
    ```
    X-CSRF-Token: token of step 1
    Authorization: token login admin
    ```
    body:
    ```
        {
    "name": "",
    "description": "",
    "price": ,
    "stock": 
        }
     ```   
  - GET /api/products: get products
  - GET /api/products/id: find product 
  - PUT /api/products/id: editar product
    ```
    X-CSRF-Token: token of step 1
    Authorization: token login admin
    ```
    body:
    ```
        {
    "name": "",
    "description": "",
    "price": ,
    "stock": 
        }
     ```  
  - DELETE /api/products/id: delete product