
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 25).notNullable().unique()
      tbl.string('password', 50)
  })
  .createTable('register', tbl => {
      tbl.increments()
      tbl.string('username', 25).notNullable().unique()
      tbl.string('password', 50)

  })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
