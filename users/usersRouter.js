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