import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  router.route(api + 'users').post((req, res) => {
    if (req.session.userid) {
      res.status(400).json({ error: 'already_logged' })
      return
    }

    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.pseudo === undefined) {
      res.status(400).json({ error: 'missing_parameters' })
      return
    }

    if (!RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(req.body.email)) {
      res.status(400).json({ error: 'invalid_email' })
      return
    }

    if (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(req.body.password)) {
      res.status(400).json({ error: 'invalid_password' })
      return
    }

    if (req.body.pseudo === '') {
      res.status(400).json({ error: 'empty_pseudo' })
      return
    }

    db.users.add(req.body.email, req.body.password, htmlspecialchars(req.body.pseudo), function (err) {
      if (err) {
        res.status(400).json({ error: 'cant_create' })
        return console.log(err.message)
      }
      res.json({})
    })
  })

  router.route(api + 'users/login').post((req, res) => {
    if (req.session.userid) {
      res.status(400).json({ error: 'already_logged' })
      return
    }

    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
      res.status(400).json({ error: 'missing_parameters' })
      return
    }

    db.users.login(req.body.email, req.body.password, function (err, row) {
      if (err) {
        res.status(400).json({ error: 'cant_login' })
        return console.log(err.message)
      }

      if (row === undefined) {
        res.status(400).json({ error: 'cant_login' })
        return
      }

      delete row.password
      req.session.userid = row.id
      res.json(row)
    })
  })

  router.route(api + 'users/logout').get((req, res) => {
    if (!req.session.userid) {
      res.status(400).json({ error: 'not_logged' })
      return
    }

    delete req.session.userid
    res.json({})
  })

  router.route(api + 'users/logout').post((req, res) => {
    if (!req.session.userid) {
      res.status(400).json({ error: 'not_logged' })
      return
    }

    delete req.session.userid
    res.json({})
  })
}
