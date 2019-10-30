export default class {
  constructor (db) {
    this.db = db
  }

  add (name, callback) {
    this.db.run('INSERT INTO `groups` (`name`) VALUES (?)', [name], callback)
  }

  get (groupsid, callback) {
    this.db.get('SELECT * FROM `groups` WHERE `id`=?', [groupsid], callback)
  }

  remove (id, callback) {
    this.db.run('DELETE FROM `groups` WHERE `id`=?', [id], callback)
  }

  updateName (id, name, callback) {
    this.db.run('UPDATE `groups` SET name=? WHERE `id`=?', [name, id], callback)
  }

  getGroups (userid, callback) {
    this.db.all('SELECT * FROM `groups` WHERE `id` IN (SELECT `group` FROM `groups_users` WHERE `user`=?)', [userid], callback)
  }

  inGroup (groupid, userid, callback) {
    this.db.get('SELECT * FROM `groups_users` WHERE `group`=? AND `user`=?', [groupid, userid], callback)
  }

  getUsers (groupid, callback) {
    this.db.all('SELECT * FROM `users` WHERE `id` IN (SELECT `user` FROM `groups_users` WHERE `group`=?)', [groupid], callback)
  }

  addUser (groupid, userid, callback) {
    this.db.run('INSERT INTO `groups_users` (`group`, `user`) VALUES (?, ?)', [groupid, userid], callback)
  }

  removeUser (groupid, userid, callback) {
    this.db.run('DELETE FROM `groups_users` WHERE `group`=? AND `user`=?', [groupid, userid], callback)
  }
}
