const router = require('express').Router()
const { User } = require('../models')

router.get('/', (req, res) => {
  res.render('dashboard')
})

router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    const user = { email: req.user.alias, pub: req.user.pub, epub: req.user.epub }
    return res.render('dashboard', user)
  }
  return res.redirect('/login')
})

router.get('/logout', (req, res) => {
  User.logout()
    .then(() => {
      req.logout()
      req.session.destroy()
      res.redirect('/')
    })
    .catch(err => console.error(err))
})

module.exports = router
