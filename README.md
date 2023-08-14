# Stream Shop using Express JS and MongoDB

## Overview

Welcome to the Stream Shop project repository, created by Bayu Aditya Triwibowo (GG3FSGP0293), for the Generasi GIGIH 3.0 midterm test. This project houses a RESTful API built using ExpressJS and MongoDB as the database, empowering you with efficient and seamless data management. Within this repository, you'll find comprehensive details on the database structure, API endpoints, and instructions on how to run the API on your local machine. Feel free to explore the rich functionalities and unleash the power of this project to elevate your development skills and deliver exceptional results.


## Database Structure

The database for this project is MongoDB, a NoSQL database. It consists of three main collections:

1. `videos` collection:
   - `id` (ObjectId): The unique identifier for each video.
   - `name` (string): The name or the title of the video.
   - `imageThumbnail` (string): The image thumbnail URL of the video.
   - `timestamps`

2. `products` collection:
   - `id` (ObjectId): The unique identifier for each product.
   - `link` (string): The link to redirect to the product.
   - `title` (string): The title of the product.
   - `price` (int32): The price of the product.
   - `video` (ObjectId): The reference to the video of the product (linked to the `videos` collection).
   - `timestamps`

3. `comments` collection:
   - `id` (ObjectId): The unique identifier for each comment.
   - `username` (string): Should be the reference to the user.
   - `comment` (string): The content of the comment.
   - `video` (ObjectId): The reference to the video of the comment (linked to the `videos` collection).
   - `timestamps`

## API Structure

The API is built using ExpressJS, a Node.js web application framework. The file structure of the API is as follows:

- `bin/www`: The main entry point of the application, everything is configured, initialized, and combined here.
- `app.js`: The main source where Express is configured and initialized.
- `app/config.js`: The main source to maintain, call, configure, and spread everything inside .env.
- `app/api/v1/*`: This directory contains all the API configured, each directory inside is a reference from the database.
- `app/db`: Contains the database configuration.
- `app/errors`: Contains custom error configuration.
- `app/middleware`: Contains middleware for error, not found, and multer image.
- `app/services/mongoose/*`: Contains the services for database-related operations (e.g., CRUD operations).

## API Requests and Responses

Please refer to the [API Documentation Gist](https://gist.github.com/bayuuat/89f292a80f0a4b149ba7a1248c1f565a) for detailed information on all the available API endpoints, their request formats, and expected responses. The Gist provides clear examples of how to make API requests and what to expect in return.

## How to Run Locally

To run this API on your local machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/bayuuat/streamShop-express.git
cd streamShop-express
```

2. Install dependencies:

```
npm install
```

3. Set up the MongoDB connection:
- Make sure you have MongoDB installed and running on your local machine.
- Copy .env.example to .env
  
  ```
  cp .env.example .env
  ```
- In the `.env` file, update the MongoDB connection string to point to your local MongoDB instance.

4. Start the server:
  
  ```
  npm start
  ```

5. The API should now be running locally at `http://localhost:9000` or the same with the port you set in `.env`
