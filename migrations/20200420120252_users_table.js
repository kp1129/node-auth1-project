
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    //   primary key
    tbl.increments();
    // username
    tbl.string('username', 128)
    .notNullable()
    .unique();    
    // password
    tbl.string('password')
    .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
