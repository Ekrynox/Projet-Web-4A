export default class {
  constructor (db) {
    this.db = db
  }

  add (email, password, pseudo, callback) {
    this.db.run('INSERT INTO users (email, password, pseudo)  Values(?, ?, ?)', [email, password, pseudo], callback)
  }
}
