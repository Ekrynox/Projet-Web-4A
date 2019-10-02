export default (api, router, db) => {
  router.route(api + 'users').post((req, res) => {
    res.json({})
  })
}
