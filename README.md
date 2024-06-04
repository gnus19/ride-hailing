# Ride hailing

### Dependencies

This project was created with:

- Node 20.14.0
- Frontend: Vue3, tailwindCSS, Vite
- Lint: Prettier, ESLint
- Backend: Nodejs, Express.js
- DB: MongoDB (mongoose)
- Container: Docker
- Libraries: [jsownwebtoken](https://www.npmjs.com/package/jsonwebtoken), [bcrypt](https://www.npmjs.com/package/bcrypt)

### How to run the app

To run the project you first clone the repo and then run `cd ride-hailing`, 

#### App

For run the app you:

1. `cd app`
2. `npm i` to install the dependencies
3. `npm run dev` to run the app locally
4. Navigate to `http://localhost:5173`

#### Server

For the server first you need to install Docker and Docker Compose, after that you:

1. `cd server`
2. Crear el archivo `.env` para las variables de ambiente que utilizara Docker Compose, el archivo debe contener
    ``
    PORT=4000
    MONGODB_URL=mongodb://mongodb:27017
    MONGODB_USERNAME=root
    MONGODB_PASSWORD=password
    MONGODB_NAME=ridedb
    ``
3. `npm i` to install the dependencies
4.  Run `docker-compose up --build` in order to build the server and DB containers
5. To verify the server is running properly, open in VSCode `server/request.http` (you need the Rest Client extension to use the file) and press `Send Request` for the first endpoint you see `GET {{baseUrl}}/auth`, if return 200 OK means that the server is running
