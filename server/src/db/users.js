export default class {
  constructor (db) {
    this.db = db
  }

  add (email, password, pseudo, callback) {
    this.db.run('INSERT INTO `users` (`email`, `password`, `pseudo`) VALUES (?, ?, ?)', [email, password, pseudo], callback)
  }

  addPseudo (pseudo, callback) {
    this.db.run('INSERT INTO `users_pseudo` (`pseudo`) VALUES (?)', [pseudo], callback)
  }

  login (email, password, callback) {
    this.db.get('SELECT * FROM `users` WHERE `email`=? AND `password`=?', [email, password], callback)
  }

  get (id, callback) {
    this.db.get('SELECT * FROM `users` WHERE `id`=?', [id], callback)
  }

  search (filter, callback) {
    this.db.all('SELECT * FROM `users` WHERE `pseudo` IN (SELECT `pseudo` FROM `users_pseudo` WHERE `pseudo` MATCH ?)', [filter + '*'], callback)
  }

  updatePseudo (id, pseudo, callback) {
    this.db.run('UPDATE `users` SET `pseudo`=? WHERE `id`=?', [pseudo, id], callback)
  }

  getDiscussions (id, callback) {
    this.db.all('SELECT * FROM `users` WHERE `id` IN (SELECT `user` FROM `messages_users` WHERE `user2`=?) OR `id` IN (SELECT `user2` FROM `messages_users` WHERE `user`=?) OR `id` IN (SELECT `user2` FROM `users_friends` WHERE `user1`=?)', [id, id, id], callback)
  }
}
