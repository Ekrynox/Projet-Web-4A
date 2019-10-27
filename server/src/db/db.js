import sqlite3 from 'sqlite3'

import Users from './users'
import Friends from './friends'
import Messages from './messages'

export default class {
  constructor (db) {
    this.db = new sqlite3.Database(db, (err) => {
      if (err) {
        return console.error(err.message)
      }
    })
    this.users = new Users(this.db)
    this.friends = new Friends(this.db)
    this.messages = new Messages(this.db)
  }
}
