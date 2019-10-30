import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  // Get group's info (GET)
  router.route(api + 'groups/:id').get((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    if (parseInt(req.params.id) <= 0) {
      res.json({ error: 'invalid_id' })
      return
    }

    db.groups.inGroup(parseInt(req.params.id), req.session.userid, function (err, row) {
      if (err) {
        res.json({ error: 'cant_get' })
        return console.log(err)
      }

      if (row === undefined) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.get(parseInt(req.params.id), function (err, row) {
        if (err) {
          res.json({ error: 'cant_get' })
          return console.log(err.message)
        }

        if (row === undefined) {
          res.json({ error: 'group_not_found' })
          return
        }

        db.groups.getUsers(parseInt(req.params.id), function (err, users) {
          if (err) {
            row.users = []
            res.json(row)
            return console.log(err.message)
          }

          if (users === undefined) {
            row.users = []
            res.json(row)
            return
          }

          users.forEach(user => {
            delete user.email
            delete user.password
            delete user.groups
          })
          row.users = users

          res.json(row)
        })
      })
    })
  })

  // Get user's groups' info (GET)
  router.route(api + 'groups').get((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    db.groups.getGroups(req.session.userid, function (err, rows) {
      if (err) {
        res.json({ error: 'cant_get' })
        return console.log(err.message)
      }

      if (rows === undefined || rows.length <= 0) {
        res.json([])
        return
      }

      const groupsid = []
      const data = {}
      rows.forEach(row => {
        groupsid.push(row.id)
      })

      const a = function (array, data) {
        if (array.length > 0) {
          db.groups.getUsers(array[0], function (err, users) {
            if (err) {
              res.json({ error: 'cant_get' })
              return
            }

            if (users === undefined) {
              data[array[0]] = []
              delete array.shift()
              a(array, data)
              return
            }

            data[array[0]] = users
            users.forEach(user => {
              delete user.email
              delete user.password
              delete user.groups
            })

            delete array.shift()
            a(array, data)
          })
          return
        }
        rows.forEach(row => {
          row.users = data[row.id]
        })
        res.json(rows)
      }

      a(groupsid, data)
    })
  })

  // Add a group (POST)
  router.route(api + 'groups').post((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    db.groups.add(req.session.pseudo, function (err) {
      if (err) {
        res.json({ error: 'cant_add' })
        return console.log(err.message)
      }

      db.groups.addUser(this.lastID, req.session.userid, function (err) {
        if (err) {
          console.log(err.message)
        }
      })

      res.json({})
    })
  })

  // Delete a group (GET)
  router.route(api + 'groups/:id').delete((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    if (parseInt(req.params.id) <= 0) {
      res.json({ error: 'invalid_id' })
      return
    }

    db.groups.inGroup(parseInt(req.params.id), req.session.userid, function (err, row) {
      if (err) {
        res.json({ error: 'cant_remove' })
        return console.log(err)
      }

      if (row === undefined) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.remove(parseInt(req.params.id), function (err) {
        if (err) {
          res.json({ error: 'cant_remove' })
          return console.log(err.message)
        }

        res.json({})
      })
    })
  })

  // Update group's name (PUT)
  router.route(api + 'groups/:id').put((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    if (parseInt(req.params.id) <= 0) {
      res.json({ error: 'invalid_id' })
      return
    }

    if (req.body === undefined || req.body.name) {
      req.json({ error: 'missing_parameters' })
    }

    db.groups.inGroup(parseInt(req.params.id), req.session.userid, function (err, row) {
      if (err) {
        res.json({ error: 'cant_get' })
        return console.log(err)
      }

      if (row === undefined) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.updateName(parseInt(req.params.id), htmlspecialchars(req.body.name), function (err) {
        if (err) {
          res.json({ error: 'cant_update' })
          return console.log(err.message)
        }

        res.json({})
      })
    })
  })

  // Add user to a group (POST)
  router.route(api + 'groups/:id/users').post((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    if (req.body === undefined || req.body.id === undefined) {
      res.json({ error: 'missing_parameters' })
      return
    }

    if (parseInt(req.params.id) <= 0 || req.body.id <= 0) {
      res.json({ error: 'invalid_id' })
      return
    }

    db.groups.inGroup(parseInt(req.params.id), req.session.userid, function (err, row) {
      if (err) {
        res.json({ error: 'cant_add' })
        return console.log(err)
      }

      if (row === undefined) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.inGroup(parseInt(req.params.id), req.body.id, function (err, row) {
        if (err) {
          res.json({ error: 'cant_add' })
          return console.log(err)
        }

        if (row !== undefined) {
          res.json({})
          return
        }

        db.groups.addUser(parseInt(req.params.id), req.body.id, function (err) {
          if (err) {
            res.json({ error: 'cant_add' })
            return console.log(err)
          }

          res.json({})
        })
      })
    })
  })

  // Remove user from a group (POST)
  router.route(api + 'groups/:id/users/:userid').delete((req, res) => {
    if (req.session.userid === undefined) {
      res.json({ error: 'not_logged' })
      return
    }

    if (parseInt(req.params.id) <= 0 || parseInt(req.params.userid) <= 0) {
      res.json({ error: 'invalid_id' })
      return
    }

    db.groups.inGroup(parseInt(req.params.id), req.session.userid, function (err, row) {
      if (err) {
        res.json({ error: 'cant_remove' })
        return console.log(err)
      }

      if (row === undefined) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.removeUser(parseInt(req.params.id), parseInt(req.params.userid), function (err) {
        if (err) {
          res.json({ error: 'cant_remove' })
          return console.log(err)
        }

        db.groups.getUsers(parseInt(req.params.id), function (err, rows) {
          if (err) {
            return console.log(err)
          }

          if (rows === undefined || rows.length <= 0) {
            db.groups.remove(parseInt(req.params.id), function (err) {
              if (err) {
                return console.log(err)
              }
            })
          }
        })

        res.json({})
      })
    })
  })
}
