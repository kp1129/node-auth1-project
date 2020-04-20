const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');
const authenticator = require('./auth/authenticator');
const cors = require('cors');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: "coolio",
    secret: process.env.SESSION_SECRET || "secret secrets are so fun",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
        maxAge: 1000 * 60 * 5, // good for 5 mins in ms
        secure: process.env.USE_SECURE_COOKIES || false, // to use over https only set this to true in production
        httpOnly: true, // means that only http can access the cookie, JS on the client cannot
    }
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// routes
server.use("/api/users", authenticator, usersRouter );
server.use("/api/", authRouter );

server.get("/", (req, res) => {
    res.json({ message: "API is up"})
});

module.exports = server;