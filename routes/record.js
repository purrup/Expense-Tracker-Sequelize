const express = require('express')
const db = require('../models')
const Record = db.Record
const User = db.User
const router = express.Router()
const { authenticated } = require('../config/auth')

// 列出所有開支
router.get('/', authenticated, (req, res) => {
  res.send('列出所有開支')
})

// 前往新增一筆支出的頁面
router.get('/:id', authenticated, (req, res) => {
  res.send('新增一筆支出')
})

// 新增一筆支出
router.post('/:id', authenticated, (req, res) => {
  res.send('新增一筆支出')
})

// 前往修改一筆支出的頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改一筆支出')
})

// 修改一筆支出
router.put('/:id', authenticated, (req, res) => {
  res.send('修改一筆支出')
})

// 刪除一筆支出
router.delete('/:id', authenticated, (req, res) => {
  res.send('刪除一筆支出')
})

module.exports = router
