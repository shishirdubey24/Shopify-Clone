# E-Commerce Website

## Overview
This project is an e-commerce website developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to the cart, and make purchases securely. The website includes features such as user authentication using JWT, password hashing using bcrypt, and payment integration using MindTree.

-WebUI looks like
![E-Commerce Website](ecom.png)


-Admin Account
-Email: admin@gmail.com
-Password: admin

- admin can manage crud operation on product,category by this account


## Features
- User authentication with JWT (JSON Web Tokens)
- Secure password hashing with bcrypt
- Browse products, add to cart, and make purchases
- Responsive and user-friendly UI components using Ant Design (antd)
- Integration with MindTree for secure payment processing

## API Routes
   The following API routes are available:

  - GET /api/products: Retrieve all products
  - POST /api/auth/register: Register a new user
  - POST /api/auth/login: Log in a user
  - GET /api/auth/logout: Log out a user
  - GET /api/cart: Retrieve the user's cart
  -POST /api/cart/add: Add a product to the user's cart
  - POST /api/cart/remove: Remove a product from the user's cart
  - POST /api/orders: Place a new order
