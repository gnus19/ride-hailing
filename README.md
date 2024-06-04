# Ride hailing

### Dependencies

This project was created with:

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

1. `npm i` to install the dependencies
2. `npm run dev` to run the app locally
3. Navigate to `http://localhost:5173`

#### Server

For the server first you need to install Docker, after that you:

1. `npm i` to install the dependencies
2.  Run `docker-compose up --build` in order to build the server and DB containers
3. To verify the server is running properly, open in VSCode `server/request.http` (you need the Rest Client extension to use the file) and press `Send Request` for the first endpoint you see `GET {{baseUrl}}/auth`, if return 200 OK means that the server is running
