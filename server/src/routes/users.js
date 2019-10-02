import htmlspecialchars from 'htmlspecialchars'

export default (api, router, db) => {
  router.route(api + 'users').post((req, res) => {
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.pseudo === undefined) {
      res.status(400).json({ error: 'Missing parameters' })
      return
    }

    if (!RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(req.body.email)) {
      res.status(400).json({ error: 'Invalid email' })
      return
    }

    if (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/).test(req.body.password)) {
      res.status(400).json({ error: 'Invalid password' })
      return
    }

    if (req.body.pseudo === '') {
      res.status(400).json({ error: 'Empty pseudo' })
      return
    }

    db.users.add(req.body.email, req.body.password, htmlspecialchars(req.body.pseudo), function (err) {
      if (err) {
        res.status(400).json({ error: 'Couldn\'t add the user, email should be already use' })
        return console.log(err.message)
      }
      res.json({})
    })
  })
}
