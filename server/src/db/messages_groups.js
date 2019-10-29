export default class {
  constructor (db) {
    this.db = db
  }

  add (id, idgroup, data, callback) {
    this.db.run('INSERT INTO messages_groups (user, `group`, data)  Values(?, ?, ?)', [id, idgroup, data], callback)
  }

  get (idgroup, callback) {
    this.db.all('SELECT * FROM messages_groups WHERE `group`=?', [idgroup], callback)
  }
}
