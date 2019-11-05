const passport = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../models')

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email', passwordField: 'passphrase' }, (email, passphrase, done) => {
    User.login(email, passphrase)
      .then(result => {
        if (!result.success) return done(null, result)
        else return done(null, result)
      })
      .catch(err => console.error(err))
  })
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  User.getUserByPubKey(user.pub).then(result => {
    done(null, result)
  })
})

module.exports = passport
