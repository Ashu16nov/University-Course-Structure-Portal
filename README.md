# University Course Structure Management System

## Description

The University Course Structure Management System is a full-stack MERN application that allows students to view academic programs, semesters, and course structures. It includes a complete CRUD-based administration system for managing all academic data dynamically.

## Features

* Program management (CRUD)
* Semester management (CRUD)
* Subject management (CRUD)
* Student course browsing (view programs, semesters, subjects, credits)
* Admin dashboard with statistics
* Authentication for admin portal (JWT)
* Search and filtering for programs
* MongoDB integration with schemas and relationships
* REST API built with Node.js and Express
* Professional, responsive UI built with React and Tailwind CSS

## Technologies

* React
* Node.js
* Express.js
* MongoDB
* Mongoose
* Tailwind CSS
* Axios
* JWT
* Bcryptjs

## Installation

1. Clone the repository or navigate to the project directory.
2. Install backend dependencies:
```bash
cd server
npm install
```
3. Install frontend dependencies:
```bash
cd client
npm install
```

## Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server` directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/university_db
JWT_SECRET=supersecretuniversitykey
```
*(Make sure you have a running MongoDB instance, or replace `MONGO_URI` with your MongoDB Atlas string).*

### Frontend (`client/.env`)
Create a `.env` file in the `client` directory:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Project

### 1. Seed Database
To populate the database with sample data (Default Admin: `admin@university.edu`, Password: `admin123`):
```bash
cd server
node seed/seedData.js
```

### 2. Start Backend
```bash
cd server
node server.js
```
The backend API will run on `http://localhost:5000`.

### 3. Start Frontend
In a new terminal:
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`. Open this URL in your browser.

## Database Relationships
- Semesters are linked to a specific Program.
- Subjects are linked to both a specific Program and a specific Semester.
- Deleting a program will cascade and delete its associated semesters and subjects.
