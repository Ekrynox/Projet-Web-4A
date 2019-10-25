import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  // Check if user is logged and return his data (GET)
  router.route(api + 'users').get((req, res) => {
    if (req.session.userid) {
      db.users.get(req.session.userid, function (err, row) {
        if (err) {
          res.json({ error: 'db_error' })
          delete req.session.userid
          return console.log(err.message)
        }

        if (row === undefined) {
          res.json({ error: 'user_not_found' })
          delete req.session.userid
          return
        }

        delete row.password
        res.json(row)
      })
      return
    }
    res.json({ error: 'not_logged' })
  })

  // Add a new user (POST)
  router.route(api + 'users').post((req, res) => {
    if (req.session.userid) {
      res.json({ error: 'already_logged' })
      return
    }

    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.pseudo === undefined) {
      res.json({ error: 'missing_parameters' })
      return
    }

    if (!RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(req.body.email)) {
      res.json({ error: 'invalid_email' })
      return
    }

    if (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(req.body.password)) {
      res.json({ error: 'invalid_password' })
      return
    }

    if (req.body.pseudo === '') {
      res.json({ error: 'empty_pseudo' })
      return
    }

    db.users.add(req.body.email, req.body.password, htmlspecialchars(req.body.pseudo), function (err) {
      if (err) {
        res.json({ error: 'cant_create' })
        return console.log(err.message)
      }

      db.users.addPseudo(htmlspecialchars(req.body.pseudo), function (err) {
        if (err) {
          console.log(err.message)
        }
      })

      res.json({})
    })
  })
}
