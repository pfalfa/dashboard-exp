const router = require('express').Router()

const { User } = require('../models')
const { passport } = require('../utils')

const state = { success: false, message: null }

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/login', (req, res) => {
  res.render('login', state)
})

router.get('/register', (req, res) => {
  res.render('signup', state)
})

router.post(
  '/login',
  (req, res, next) => {
    const { email, passphrase, remember } = req.body
    if (!email) return res.render('login', { success: false, message: 'Email is required!' })
    if (!passphrase) return res.render('login', { success: false, message: 'Passphrase is required!' })
    next()
  },
  passport.authenticate('local', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    if (!req.user.success) return res.render('login', req.user)

    const user = { ...req.user.data }
    req.login(user, err => {
      if (err) return res.render('login', { success: false, message: err })
      return res.redirect('users/dashboard')
    })
  }
)

router.post('/signup', (req, res) => {
  const { email, passphrase } = req.body
  User.create(email, passphrase)
    .then(result => {
      if (!result.success) res.render('signup', result)
      else {
        User.login(email, passphrase)
          .then(result => {
            const user = { ...result.data }
            req.login(user, err => {
              if (err) res.render('signup', { success: false, message: err })
              else res.redirect('users/dashboard')
            })
          })
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.error(err))
})

// /** forgot password */
// router.get('/forgot', (req, res) => {
//   res.render('forgot', state)
// })

// router.post('/forgot', (req, res) => {
//   const { email } = req.body
//   User.resetPass(email)
// })

module.exports = router
