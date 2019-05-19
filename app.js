const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const handlebars = require('handlebars')
const helpers = require('handlebars-helpers')({
  handlebars: handlebars,
})

app.use(
  session({
    secret: 'purrup',
    resave: 'false',
    saveUninitialized: 'false',
  })
)
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(port, () => {
  db.sequelize.sync({ force: true })
  console.log(`App is running on localhost:${port}`)
})
