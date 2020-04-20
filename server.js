const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');

const server = express();

server.use(helmet());
server.use(express.json());

// routes
server.use("/api/users", usersRouter );
server.use("/api/", authRouter );

server.get("/", (req, res) => {
    res.json({ message: "API is up"})
});

module.exports = server;