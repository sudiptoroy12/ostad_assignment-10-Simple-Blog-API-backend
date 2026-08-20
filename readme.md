# Simple Blog API

A simple RESTful Blog API built with **Node.js, Express.js, MongoDB, Mongoose, and Groq AI**.

This project provides APIs to create and retrieve blog posts. It also includes an **AI-powered Blog Creation API** that generates a blog description using the Groq API based on the provided blog title.

## Features

* Create a Blog manually
* Generate a Blog description using AI
* Create a Blog with AI-generated description
* Get all Blogs
* Get a single Blog by ID
* MongoDB Atlas integration using Mongoose
* Custom request logging middleware
* JSON API responses
* ES Module (`"type": "module"`)
* Environment variable configuration
* Clean and organized project structure

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Groq API
* dotenv
* Nodemon
* JavaScript ES Modules

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

Install the project dependencies:

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

GROQ_URL=your_groq_api_url

GROQ_API_KEY=your_groq_api_key
```

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/simple_blog_db

GROQ_URL=https://api.groq.com/openai/v1/chat/completions

GROQ_API_KEY=your_groq_api_key
```

> Never commit your `.env` file to GitHub because it contains sensitive database and API credentials.

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

---

# API Endpoints

| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| `POST` | `/api/blogs`     | Create a Blog manually                      |
| `POST` | `/api/blogs/ai`  | Create a Blog with AI-generated description |
| `GET`  | `/api/blogs`     | Get all Blogs                               |
| `GET`  | `/api/blogs/:id` | Get a single Blog                           |

---

# 1. Create Blog Manually

## Endpoint

```text
POST /api/blogs
```

## Request Body

```json
{
  "title": "Learning JavaScript",
  "description": "JavaScript is a programming language used to build interactive web applications.",
  "author": "Sudipto"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "_id": "68a123456789",
    "title": "Learning JavaScript",
    "description": "JavaScript is a programming language used to build interactive web applications.",
    "author": "Sudipto",
    "createdAt": "2026-08-20T10:00:00.000Z",
    "updatedAt": "2026-08-20T10:00:00.000Z"
  }
}
```

## Validation

The API checks that `title`, `description`, and `author` are provided.

If a required field is missing:

```json
{
  "success": false,
  "message": "title, description and author are required"
}
```

---

# 2. Create Blog With AI

This API uses the **Groq API** to automatically generate the blog description.

Instead of manually providing a description, the client only needs to provide:

* `title`
* `author`

The AI generates an informative blog description based on the title.

## Endpoint

```text
POST /api/blogs/ai
```

## Request Body

```json
{
  "title": "Learning React",
  "author": "Sudipto"
}
```

## AI Prompt

The API sends a prompt to the Groq API asking the AI to generate an approximately 100-word blog description.

The generated content is instructed to contain:

* No title
* No headings
* No bullet points
* Only the blog description
* Informative and engaging content

## AI Model

The project uses:

```text
openai/gpt-oss-120b
```

through the Groq API.

## How It Works

```text
Client
   ↓
POST /api/blogs/ai
   ↓
Blog Controller
   ↓
Generate AI Prompt
   ↓
Groq API
   ↓
AI Generated Description
   ↓
Mongoose
   ↓
MongoDB Atlas
   ↓
JSON Response
```

## Example Response

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "_id": "68a123456789",
    "title": "Learning React",
    "description": "React is a popular JavaScript library for building user interfaces...",
    "author": "Sudipto",
    "createdAt": "2026-08-20T10:00:00.000Z",
    "updatedAt": "2026-08-20T10:00:00.000Z"
  }
}
```

The `description` field is generated automatically by the AI and then stored in MongoDB Atlas.

---

# 3. Get All Blogs

## Endpoint

```text
GET /api/blogs
```

## Success Response

```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": [
    {
      "_id": "68a123456789",
      "title": "Learning JavaScript",
      "description": "JavaScript is a programming language.",
      "author": "Sudipto"
    },
    {
      "_id": "68a987654321",
      "title": "Learning React",
      "description": "React is a JavaScript library.",
      "author": "Ashik"
    }
  ]
}
```

---

# 4. Get Single Blog

## Endpoint

```text
GET /api/blogs/:id
```

Example:

```text
GET /api/blogs/68a123456789
```

## Success Response

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

## Blog Not Found

```json
{
  "success": false,
  "message": "Blog not found",
  "data": null
}
```

---

# Middleware

The project includes a custom request logger middleware.

It logs every incoming request in the terminal.

Example:

```text
Request received: POST /api/blogs
Request received: POST /api/blogs/ai
Request received: GET /api/blogs
Request received: GET /api/blogs/68a123456789
```

The middleware uses `next()` to pass the request to the next middleware or route handler.

---

# Database

The application uses **MongoDB Atlas** as the database and **Mongoose** to interact with MongoDB.

The database connection is separated into:

```text
src/db/db.js
```

This keeps database connection logic separate from the main server configuration.

---

# AI Integration

The AI-powered blog creation feature uses the Groq API.

The application sends a request containing:

```javascript
{
  model: "openai/gpt-oss-120b",
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
}
```

The generated response is extracted from:

```javascript
data?.choices?.[0]?.message?.content?.trim()
```

The generated text is then stored as the Blog's `description`:

```javascript
const newBlog = await Blog.create({
  title,
  description: results,
  author,
});
```

---

# Error Handling

The API returns JSON responses when an error occurs.

Example:

```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error message"
}
```

Common HTTP status codes:

| Status Code | Meaning                   |
| ----------- | ------------------------- |
| `200`       | Request successful        |
| `201`       | Blog created successfully |
| `400`       | Invalid request           |
| `404`       | Blog not found            |
| `500`       | Internal server error     |

---

# API Request Flow

### Manual Blog Creation

```text
Client
   ↓
POST /api/blogs
   ↓
Middleware
   ↓
Route
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB Atlas
   ↓
JSON Response
```

### AI Blog Creation

```text
Client
   ↓
POST /api/blogs/ai
   ↓
Middleware
   ↓
Route
   ↓
Controller
   ↓
Groq API
   ↓
Generated Description
   ↓
Mongoose Model
   ↓
MongoDB Atlas
   ↓
JSON Response
```

---

# Security

Sensitive credentials are stored in environment variables:

```env
MONGO_URI=...
GROQ_API_KEY=...
```

The `.env` file should not be uploaded to GitHub.

Add the following to `.gitignore`:

```text
node_modules
.env
```

---

# Author

**Sudipto Roy**

A simple Blog API assignment built with **Express.js, MongoDB, Mongoose, and Groq AI**.
