// connection to the users.db3
const db = require('../connection');

module.exports = {
    // helper functions
    findAll,
    findById,
    findByUsername,
    add
}

function findAll() {
    return db('users').select('id', 'username')
}

function findById(id) {
    return db('users')
            .where({ id })
            .first()
}

async function add(user) {
    const [id] = await db('users').insert(user, "id");

    return findById(id);
}

function findByUsername(username) {
    return db('users')
            .where({ username })
            .first()
}