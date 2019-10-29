export default class {
  constructor (db) {
    this.db = db
  }

  add (email, password, pseudo, callback) {
    this.db.run('INSERT INTO users (email, password, pseudo)  Values(?, ?, ?)', [email, password, pseudo], callback)
  }

  addPseudo (pseudo, callback) {
    this.db.run('INSERT INTO users_pseudo (pseudo)  Values(?)', [pseudo], callback)
  }

  login (email, password, callback) {
    this.db.get('SELECT * FROM users WHERE email=? AND password=?', [email, password], callback)
  }

  get (id, callback) {
    this.db.get('SELECT * FROM users WHERE id=?', [id], callback)
  }

  getList (idlist, callback) {
    this.db.all('SELECT * FROM users WHERE id IN ' + idlist, [], callback)
  }

  search (filter, callback) {
    this.db.all('SELECT * FROM users WHERE pseudo IN (SELECT pseudo FROM users_pseudo WHERE pseudo MATCH ?)', [filter + '*'], callback)
  }

  updateGroups (id, groups, callback) {
    this.db.run('UPDATE users SET groups=? WHERE id=?', [groups, id], callback)
  }
}
