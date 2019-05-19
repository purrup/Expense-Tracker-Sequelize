const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const db = require('./models')
const Record = db.Record
const User = db.User

app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 列出所有開支
app.get('/', (req, res) => {
  res.send('列出所有開支')
})

// 前往新增一筆支出的頁面
app.get('/:id', (req, res) => {
  res.send('新增一筆支出')
})

// 新增一筆支出
app.post('/:id', (req, res) => {
  res.send('新增一筆支出')
})

// 前往修改一筆支出的頁面
app.get('/:id/edit', (req, res) => {
  res.send('修改一筆支出')
})

// 修改一筆支出
app.put('/:id', (req, res) => {
  res.send('修改一筆支出')
})

// 刪除一筆支出
app.delete('/:id', (req, res) => {
  res.send('刪除一筆支出')
})

app.use('/users', require('./routes/user'))

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`App is running on localhost:${port}`)
})
