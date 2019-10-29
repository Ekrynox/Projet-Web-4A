import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  // Get user's Messages to a group (GET)
  router.route(api + 'messagesGroups/:id').get((req, res) => {
    if (req.session.userid) {
      if (req.params.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (!req.session.groups.include(req.params.id)) {
        res.json({ error: 'not_in_group' })
        return
      }

      db.messagesGroups.get(req.params.id, function (err, rows) {
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

  // Send a message to a group (POST)
  router.route(api + 'messagesGroups').post((req, res) => {
    if (req.session.userid) {
      if (req.body === undefined || req.body.id === undefined || req.body.data === undefined) {
        res.json({ error: 'missing_parameters' })
        return
      }

      if (req.body.id <= 0) {
        res.json({ error: 'invalid_id' })
        return
      }

      if (!req.session.groups.include(req.params.id)) {
        res.json({ error: 'not_in_group' })
        return
      }

      let data = req.body.data
      if (data.text !== undefined) {
        data.text = htmlspecialchars(data.text)
      }
      data = JSON.stringify(data)

      db.messagesGroups.add(req.session.userid, req.body.id, data, function (err) {
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
