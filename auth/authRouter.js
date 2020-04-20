// build the router that handles requests to /api/register
//      Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.

// and to /api/login
//      Use the credentials sent inside the body to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// data access layer
const Users = require('../users/usersModel');

// register
router.post("/register", (req, res) => {
    let user = req.body;

    // hash the password!
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;
    // add new user
    Users.add(user)
    .then(response => res.status(201).json(response))
    .catch(error => res.status(500).json({ errorMessage: error.message }))
})


// login

module.exports = router;