import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  // Get user's Messages to another user (GET)
  router.route(api + 'messages/:id').get((req, res) => {
    if (req.session.userid) {
      if (req.params.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      db.messages.get(req.session.userid, req.params.id, function (err, rows) {
        if (err) {
          res.json({ error: 'cant_get' })
          return console.log(err.message)
        }

        if (rows === undefined) {
          res.json([])
          return
        }

        rows.forEach((message) => { message.data = JSON.parse(message.data) })

        res.json(rows)
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Add a user to the friends list (POST)
  router.route(api + 'messages').post((req, res) => {
    if (req.session.userid) {
      if (req.body === undefined || req.body.id === undefined || req.body.data === undefined) {
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

      let data = req.body.data
      if (data.text !== undefined) {
        data.text = htmlspecialchars(data.text)
      }
      data = JSON.stringify(data)

      db.messages.add(req.session.userid, req.body.id, data, function (err) {
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
}
