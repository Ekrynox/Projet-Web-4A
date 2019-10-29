export default class {
  constructor (db) {
    this.db = db
  }

  add (id, idgroup, data, callback) {
    this.db.run('INSERT INTO messages_users (user, group, data)  Values(?, ?, ?)', [id, idgroup, data], callback)
  }

  get (idgroup, callback) {
    this.db.all('SELECT * FROM messages_users WHERE group=?', [idgroup], callback)
  }
}
