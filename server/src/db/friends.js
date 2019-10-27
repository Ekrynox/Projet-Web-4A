export default class {
  constructor (db) {
    this.db = db
  }

  add (id, idfriend, callback) {
    this.db.all('INSERT INTO users_friends (user1, user2)  Values(?, ?, ?)', [id, idfriend], callback)
  }

  get (id, callback) {
    this.db.all('SELECT * FROM users WHERE id IN (SELECT user2 FROM users_friends WHERE user1 = ?)', [id], callback)
  }
}
