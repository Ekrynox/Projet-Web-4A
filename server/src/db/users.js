export default class {
  constructor (db) {
    this.db = db
  }

  add (email, password, pseudo, callback) {
    this.db.run('INSERT INTO users (email, password, pseudo)  Values(?, ?, ?)', [email, password, pseudo], callback)
  }

  login (email, password, callback) {
    this.db.get('SELECT * FROM users where email=? AND password=?', [email, password], callback)
  }
}
