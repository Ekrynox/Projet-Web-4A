export default (api, router, db) => {
  // Get user's friends list (GET)
  router.route(api + 'friends').get((req, res) => {
    if (req.session.userid) {
      db.friends.get(req.session.userid, function (err, rows) {
        if (err) {
          res.json({ error: 'db_error' })
          return console.log(err.message)
        }

        if (rows === undefined) {
          res.json([])
          return
        }

        for (const i in rows) {
          delete rows[i].groups
          delete rows[i].email
          delete rows[i].password
        }
        res.json(rows)
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Add a user to the friends list (POST)
  router.route(api + 'friends').post((req, res) => {
    if (req.session.userid) {
      if (req.body === undefined || req.body.id === undefined) {
        res.json({ error: 'missing_parameters' })
        return
      }

      if (req.body.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (req.session.userid === req.body.id) {
        res.json({ error: 'cant_add' })
        return
      }

      db.friends.add(req.session.userid, req.body.id, function (err) {
        if (err) {
          res.json({ error: 'cant_add' })
          return console.log(err.message)
        }

        res.json({})
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Remove a user from the friends list (POST)
  router.route(api + 'friends').delete((req, res) => {
    if (req.session.userid) {
      if (req.body === undefined || req.body.id === undefined) {
        res.json({ error: 'missing_parameters' })
        return
      }

      if (req.body.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (req.session.userid === req.body.id) {
        res.json({ error: 'cant_remove' })
        return
      }

      db.friends.remove(req.session.userid, req.body.id, function (err) {
        if (err) {
          res.json({ error: 'cant_remove' })
          return console.log(err.message)
        }

        res.json({})
      })
      return
    }
    res.json({ error: 'not_logged' })
  })
}
