// connection to the users.db3
const db = require('../connection');

module.exports = {
    // helper functions
    findAll,
    findById,
    add
}

// BEFORE PULL REQUEST, 
// CHANGE THIS NOT TO RETURN PASSWORDS LOL
function findAll() {
    return db('users')
}

function findById(id) {
    return db('users').where({ id }).first()
}

async function add(user) {
    const [id] = await db('users').insert(user, "id");

    return findById(id);
}