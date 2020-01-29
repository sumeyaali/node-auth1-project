const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
    return db('users').select('id','username');
  }


  function findBy (filter) {
      return db('users').select('id', 'username', 'password')
      .where(filter)
  }

function findById(id) {
    return db ('users').select('id', 'username', 'password')
    .where({id})
    .first()
}

  function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }