// build the route that handles requests to /api/users

//If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.

const express = require('express');
const router = express.Router();

// data access layer
const Users = require('./usersModel');

router.get("/", (req, res) => {
    Users.findAll()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json({ errorMessage: error.message }))
})

module.exports = router;