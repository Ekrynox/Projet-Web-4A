export default class {
  constructor (db) {
    this.db = db
  }

  add (id1, id2, data, callback) {
    this.db.run('INSERT INTO `messages_users` (`user`, `user2`, `data`) VALUES (?, ?, ?)', [id1, id2, data], callback)
  }

  get (id1, id2, callback) {
    this.db.all('SELECT * FROM `messages_users` WHERE (`user`=? AND `user2`=?) OR (`user`=? AND `user2`=?)', [id1, id2, id2, id1], callback)
  }
}
