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
router.post("/login", (req, res) => {
    let user = req.body;
    // search for user by username
    // if found, confirm that passwords match
    Users.findByUsername(user.username)
    .then(response => {
        if(response && bcrypt.compareSync(user.password, response.password)){
            req.session.loggedIn = true;
            res.status(200).json({ message: "Logged in" })
        } else {
            res.status(401).json({ message: "You shall not pass!"})
        }
    })
    .catch(error => res.status(500).json({ errorMessage: error.message }))
})

module.exports = router;