// const open = require('open')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const config = require('./config')
const { passport } = require('./src/utils')

const app = express()
const port = config.app.port

app.set('view engine', 'ejs')

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: config.app.secretKey,
    cookie: {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

require('./src/routes')(app)
app.get('*', (req, res) => {
  res.render('error404')
})

app.listen(port, async () => {
  console.log(`Identity hub on port ${port}`)
  // await open(`http://localhost:${port}`, { wait: true })
})
