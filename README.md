# Bring A Thing API

This is the repository dedicated to the BringAThing API


# Langages & Dependencies

- Node
    - Version: v8.12.0
    - Website: https://nodejs.org/en/
    - Docs: https://nodejs.org/docs/latest-v8.x/api/

- Express
    - Version: 4.16.4
    - Website: http://expressjs.com/
    - Docs: https://www.npmjs.com/package/express

- Mongoose
    - Version: 5.4.1
    - Website: https://mongoosejs.com/
    - Docs: https://mongoosejs.com/docs/guide.html


# API Endpoints

## Users Entity Endpoints 👤

HTTP Methods | URI | Description
------------ | ------------- | -------------
GET | /users | Retrieve a list of all the registered users
GET | /users/id | Retrieve all the informations about a specific user
GET | /users/me | Retrieve informations about the user that ask them
POST | /users | Register a new user
POST | /users/login | Allow a user to login
DELETE | /users/token | Delete a token from a user

## Trips Entity Endpoints ✈

HTTP Methods | URI | Description
------------ | ------------- | -------------
GET | /trips | Retrieve a list of all the trips
GET | /trips/id | Retrieve all the informations about a specific event
POST | /trips | Register a new event
PATCH | /trips/id | Update informations about a specific event
DELETE | /trips/id | Delete all the information about a specific event
