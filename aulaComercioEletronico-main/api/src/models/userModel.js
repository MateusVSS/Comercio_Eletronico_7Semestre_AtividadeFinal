// userModel.js
const { connection } = require('../config');
//'id', 'user','senha', 'nome', 'email', 'nasc'
class UserModel {
  static salvarUser(user, senha, nome, email, nasc, callback) {
    const query = 'INSERT INTO users (user, senha, nome, email, nasc) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [user, senha, nome, email, nasc], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarUserPorId(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // User não encontrado
      }
      callback(null, results[0]);
    });
  }


  // Outros métodos, como atualizarUser, excluirUser, listarUsers, etc.


  static atualizarUser(id, user, senha, nome, email, nasc, callback) {
    const query = 'UPDATE users SET user=?, senha=?, nome=?, email=?, nasc=? WHERE id=?';
    connection.query(query, [user, senha, nome, email, nasc, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirUser(id, callback) {
    const query = 'DELETE FROM users WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
  static listarUserId(id, callback) {
    const query = 'SELECT * FROM users WHERE id=?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarUsers(callback) {
    const query = 'SELECT * FROM users ORDER BY id';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  

}

module.exports = UserModel;
