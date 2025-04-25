# Passord Manager Application

## Overview

This Password Manager Application is designed to securely store and manage your passwords across various websites. Built with Node.js, Express.js, and Sequelize, the app provides endpoints for storing, retrieving, and deleting passwords. The frontend is crafted for an appealing user experience with intuitive UI elements.

## Link to Demo:
https://hackathon-project-2885.onrender.com/

## Features

- Backend built with Node.js and Express.js.
- Database management using PostgreSQL through Sequelize ORM.
- Single-user application functionality.
- Secure password storage and retrieval with encryption.
- Attractive frontend displaying websites, usernames, and hidden passwords.
- UI formatted for readability with responsive design.
- Integration of frequent commits for progress tracking.
- Deployment capability on Render 
- User authentication logic to ensure safe access.

## Stretch Goals

- Autofill and generate new password options.
- Password strength indication.
- Username generation features.

## Getting Started
Follow these steps to set up and run the Password Manager Application on your local machine.

## Clone the Repository
```bash
git clone https://github.com/briprogramming/Hackathon-Project.git
cd Hackathon-Project

## Install dependencies 
cd Password-Manager-App/backend
npm install
cd ../frontend
npm install

## Run the Application
cd Password-Manager-App/backend
node index.js

## API Endpoints
1. Get All Passwords
URL: /passwords/all
Method: GET
Description: Fetches all stored passwords.
2. Search for a Password by Website
URL: /password/search
Method: GET
Query Parameters:
website (string): The website URL to search for.
Description: Fetches the password entry for a specific website.
3. Add a New Password Entry
URL: /passwords/new
Method: POST
Request Body:
{
  "website": "example.com",
  "username": "user123",
  "password": "securepassword",
  "notes": "Example notes"
}

Description: Adds a new password entry.


## Known Issues
The "Show All" button may not work if the backend API is unreachable.
Passwords are currently stored in plain text (encryption is planned for future updates).
The app does not support multiple users.
Contributing
Contributions are welcome! To contribute:

* Fork the repository.
* Create a new branch for your feature or bug fix:
git checkout -b feature-name
* Commit your changes:
git commit -m "Description of changes"
* Push to your branch:
* Open a pull request.