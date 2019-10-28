export default class {
  constructor (db) {
    this.db = db
  }

  add (name, users, callback) {
    this.db.run('INSERT INTO groups (name, users)  Values(?, ?)', [name, users], callback)
  }

  get (id, callback) {
    this.db.get('SELECT * FROM groups WHERE id=?', [id], callback)
  }

  remove (id, callback) {
    this.db.run('DELETE FROM groups WHERE id=?', [id], callback)
  }

  updateName (id, name, callback) {
    this.db.run('UPDATE groups SET name=? WHERE id=?', [name, id], callback)
  }

  updateUsers (id, users, callback) {
    this.db.run('UPDATE groups SET users=? WHERE id=?', [users, id], callback)
  }
}
