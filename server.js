const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter');
const authenticator = require('./auth/authenticator');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session); // remember to pass session, this will allow me to store sessions on db
const dbConnection = require('./connection');

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
    },
    // the store property controls where the session is stored; by default it is in memory and will log everyone out when the server is stopped or restarted. 
    // but using connect-session-knex and the store object we can store it in the database
    store: new KnexSessionStore({  // this store thing is new, added it to store sessions in the db
        knex: dbConnection,
        tablename: 'sessions',
        sidfieldname: 'sid', // primary key
        createtable: true,
        clearInterval: 1000 * 60 * 60 // will remove expired sessions every hour
    }),
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