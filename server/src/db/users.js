export default class {
  constructor (db) {
    this.db = db
  }

  addUser () {
    this.db.run('', [], function (err) {
      if (err) {
        return console.log(err.message)
      }
    })
  }
}
