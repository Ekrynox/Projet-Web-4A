export default (api, router, db) => {
  // Connect to the server (POST)
  router.route(api + 'auth/login').post((req, res) => {
    if (req.session.userid) {
      res.json({ error: 'already_logged' })
      return
    }

    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
      res.json({ error: 'missing_parameters' })
      return
    }

    db.users.login(req.body.email, req.body.password, function (err, row) {
      if (err || row === undefined) {
        res.json({ error: 'cant_login' })
        return console.log(err.message)
      }

      delete row.password
      req.session.userid = row.id
      req.session.pseudo = row.pseudo
      req.session.groups = JSON.parse(row.groups)
      res.json(row)
    })
  })

  // Log out from the server (GET)
  router.route(api + 'auth/logout').get((req, res) => {
    if (!req.session.userid) {
      res.json({ error: 'not_logged' })
      return
    }

    delete req.session.userid
    delete req.session.pseudo
    delete req.session.groups
    res.json({})
  })
}
