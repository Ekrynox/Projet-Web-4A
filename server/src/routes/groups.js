import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  // Get group's info (GET)
  router.route(api + 'groups/:id').get((req, res) => {
    if (req.session.userid) {
      if (req.params.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (!req.session.groups.includes(parseInt(req.params.id))) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.get(req.params.id, function (err, row) {
        if (err) {
          res.json({ error: 'cant_get' })
          return console.log(err.message)
        }

        if (row === undefined) {
          res.json({ error: 'group_not_found' })
          return
        }

        let userslist = '(0'
        row.users = JSON.parse(row.users)
        row.users.forEach(id => {
          userslist += ', ' + id
        })
        userslist += ')'

        db.users.getList(userslist, function (err, users) {
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

          const usersList = []
          row.users.forEach(id => {
            const user = users.find(user => user.id === id)
            if (user !== undefined) {
              delete user.email
              delete user.password
              delete user.groups
              usersList.push(user)
            }
          })
          row.users = usersList

          res.json(row)
        })
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Get user's groups' info (GET)
  router.route(api + 'groups').get((req, res) => {
    if (req.session.userid) {
      if (req.session.groups.length <= 0) {
        res.json([])
        return
      }

      let groupslist = '(0'
      req.session.groups.forEach(id => {
        groupslist += ', ' + id
      })
      groupslist += ')'

      db.groups.getGroups(groupslist, function (err, rows) {
        if (err) {
          res.json({ error: 'cant_get' })
          return console.log(err.message)
        }

        if (rows === undefined) {
          res.json([])
          return
        }

        let userslist = '(0'
        rows.forEach(row => {
          row.users = JSON.parse(row.users)
          row.users.forEach(id => {
            userslist += ', ' + id
          })
        })
        userslist += ')'

        db.users.getList(userslist, function (err, users) {
          if (err) {
            rows.forEach(row => {
              row.users = []
            })
            res.json(rows)
            return console.log(err.message)
          }

          if (users === undefined) {
            rows.forEach(row => {
              row.users = []
            })
            res.json(rows)
            return
          }

          rows.forEach(row => {
            const usersList = []
            row.users.forEach(id => {
              const user = users.find(user => user.id === id)
              if (user !== undefined) {
                delete user.email
                delete user.password
                delete user.groups
                usersList.push(user)
              }
            })
            row.users = usersList
          })

          res.json(rows)
        })
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Add a group (POST)
  router.route(api + 'groups').post((req, res) => {
    if (req.session.userid) {
      db.groups.add(req.session.pseudo, JSON.stringify([req.session.userid]), function (err) {
        if (err) {
          res.json({ error: 'cant_add' })
          return console.log(err.message)
        }

        req.session.groups.push(this.lastID)
        db.users.updateGroups(req.session.userid, JSON.stringify(req.session.groups), function (err) {
          if (err) {
            console.log(err.message)
          }
        })

        res.json({})
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Delete a group (GET)
  router.route(api + 'groups/:id').delete((req, res) => {
    if (req.session.userid) {
      if (req.params.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (!req.session.groups.includes(parseInt(req.params.id))) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.remove(req.params.id, function (err) {
        if (err) {
          res.json({ error: 'cant_remove' })
          return console.log(err.message)
        }

        const index = req.session.groups.indexOf(parseInt(req.params.id))
        if (index > -1) {
          req.session.groups.splice(index, 1)
        }
        db.users.updateGroups(req.session.userid, JSON.stringify(req.session.groups), function (err) {
          if (err) {
            console.log(err.message)
          }
        })

        res.json({})
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Update group's name (PUT)
  router.route(api + 'groups/:id').put((req, res) => {
    if (req.session.userid) {
      if (req.params.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (req.body === undefined || req.body.name) {
        req.json({ error: 'missing_parameters' })
      }

      if (!req.session.groups.includes(parseInt(req.params.id))) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.groups.updateName(req.params.id, htmlspecialchars(req.body.name), function (err) {
        if (err) {
          res.json({ error: 'cant_update' })
          return console.log(err.message)
        }

        res.json({})
      })
      return
    }
    res.json({ error: 'not_logged' })
  })
}
