# Simple Blog API

A simple RESTful Blog API built with **Node.js, Express.js, MongoDB, and Mongoose**. This project follows a clean and organized folder structure using controllers, routes, middleware, models, and a separate database configuration.

## Features

* Create a Blog
* Get all Blogs
* Get a single Blog by ID
* MongoDB Atlas integration using Mongoose
* Custom request logging middleware
* JSON API responses
* ES Module (`"type": "module"`)
* Organized project structure

## Technologies Used

* Node.js
* Express.js
* MongoDB
* MongoDB Atlas
* Mongoose
* dotenv
* Nodemon

## Project Structure

```text
simple-blog-api/
│
├── src/
│   ├── controllers/
│   │   └── blog.controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── logger.middleware.js
│   │
│   ├── models/
│   │   └── blog.model.js
│   │
│   ├── routes/
│   │   └── blog.route.js
│   │
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## Installation

Install all required dependencies:

```bash
npm install
```

If you are setting up the project from scratch:

```bash
npm install express mongoose dotenv
npm install --save-dev nodemon
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/simple_blog_db
```

> Never commit your `.env` file to GitHub because it contains sensitive database credentials.

## Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will run at:

```text
http://localhost:5000
```

## Blog Schema

Each Blog contains the following fields:

| Field         | Type   | Required |
| ------------- | ------ | -------- |
| `title`       | String | Yes      |
| `description` | String | Yes      |
| `author`      | String | Yes      |

The Mongoose schema also uses timestamps, so `createdAt` and `updatedAt` are automatically generated.

## API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| `POST` | `/api/blogs`     | Create a new Blog |
| `GET`  | `/api/blogs`     | Get all Blogs     |
| `GET`  | `/api/blogs/:id` | Get a single Blog |

---

## 1. Create Blog

### Endpoint

```text
POST /api/blogs
```

### Request Body

```json
{
  "title": "Learning JavaScript",
  "description": "JavaScript is a programming language.",
  "author": "Sudipto"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "_id": "68a123456789",
    "title": "Learning JavaScript",
    "description": "JavaScript is a programming language.",
    "author": "Sudipto",
    "createdAt": "2026-08-19T10:00:00.000Z",
    "updatedAt": "2026-08-19T10:00:00.000Z"
  }
}
```

### Validation Error

If `title`, `description`, or `author` is missing:

```json
{
  "success": false,
  "message": "title, description and author are required"
}
```

---

## 2. Get All Blogs

### Endpoint

```text
GET /api/blogs
```

### Success Response

```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": [
    {
      "_id": "68a123456789",
      "title": "Learning Java",
      "description": "Java programming.",
      "author": "Shuvo"
    },
    {
      "_id": "68a987654321",
      "title": "Learning React",
      "description": "React library for building user interfaces.",
      "author": "Ashik"
    }
  ]
}
```

---

## 3. Get Single Blog

### Endpoint

```text
GET /api/blogs/:id
```

Example:

```text
GET /api/blogs/68a123456789
```

### Success Response

```json
{
  "success": true,
  "message": "Blog retrieved successfully",
  "data": {
    "_id": "68a123456789",
    "title": "Learning JavaScript",
    "description": "JavaScript is a programming language.",
    "author": "Sudipto"
  }
}
```

### Blog Not Found

```json
{
  "success": false,
  "message": "Blog not found",
  "data": null
}
```

## Middleware

A custom logger middleware is used to log every incoming request.

Example:

```text
Request received: POST /api/blogs
Request received: GET /api/blogs
Request received: GET /api/blogs/68a123456789
```

The middleware uses `next()` to pass the request to the next middleware or route handler.

## Database

This project uses **MongoDB Atlas** as the database and **Mongoose** to interact with MongoDB.

The database connection is handled separately in:

```text
src/db/db.js
```

This keeps the database connection logic separate from the main server configuration.

## API Request Flow

```text
Client
   ↓
server.js
   ↓
Middleware
   ↓
Routes
   ↓
Controllers
   ↓
Models
   ↓
MongoDB Atlas
```

## Error Handling

The API returns JSON responses for errors.

Example:

```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error message"
}
```

Common status codes used:

| Status Code | Meaning                   |
| ----------- | ------------------------- |
| `200`       | Request successful        |
| `201`       | Blog created successfully |
| `400`       | Invalid request           |
| `404`       | Blog not found            |
| `500`       | Internal server error     |

## Author

**Sudipto Roy**

Simple Blog API assignment built with **Express.js, MongoDB, and Mongoose**.
