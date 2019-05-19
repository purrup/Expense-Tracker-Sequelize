const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// routes
// 列出所有開支
app.get('/', (req, res) => {
  res.send('列出所有開支')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})
// 登入檢查
app.post('/users/login', (req, res) => {
  res.send('login')
})
// 註冊頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
app.post('/users/register', (req, res) => {
  res.send('register')
})
// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
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

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})
