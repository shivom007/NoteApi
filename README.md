# Notes API

The **Notes API** is a RESTful API built with Node.js and MongoDB. It allows users to create, read, update, and delete notes. Users can also share their notes with others and search for notes based on keywords.

## Table of Contents

- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Postman API Endpoints](#postman-api-endpoints)


## Features

- User authentication (signup, login)
- CRUD operations for notes
- Sharing notes with other users
- Searching for notes based on keywords
- Rate limiting and request throttling for handling high traffic

## Technical Requirements

- **Node.js** : Chosen for its powerful features and asynchronous capabilities.
- **Express.js**: Chosen for its simplicity, flexibility, and ease of building RESTful APIs and provides a robust set of features for web and mobile applications.
- **MongoDB** : Chosen for its flexibility with JSON-like documents, scalability, and ease of integration with Node.js. MongoDB is a NoSQL database that is well-suited for applications where data structure is expected to evolve over time.
- **jsonwebtoken**: Used for creating JSON Web Tokens (JWT) for user authentication.
- **bcrypt**: Employed for hashing and salting passwords, enhancing the security of user credentials.
- **Express Rate Limit**: Implemented for rate limiting and request throttling. This helps protect the API from abuse and ensures fair usage.
- Any additional requirements (e.g., npm packages, libraries)

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.

## Getting Started

### Installation

1. Clone the repository: `git clone https://github.com/shivom007/NoteApi.git`
2. Change into the project directory: `cd noteapi`
3. Install dependencies: `yarn`

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
# MongoDB connection URI
MONGODB_URI= Your MongoDB URI

# JWT secret key for authentication
JWT_SECRET=yoursecretkey
```

## Usage

### Start the Server
   - Run the command: `yarn start`
   - Refer to the [API Endpoints](#api-endpoints) section for a list of available endpoints and their descriptions.

### Postman API EndPoints
   - Acces Postman API Endpoints Json file in PostmanApi folder
   - Open Postman and Import NotesApi.json from the PostmanApi directory