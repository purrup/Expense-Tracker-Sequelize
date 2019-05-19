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
router.post('/', authenticated, (req, res) => {
  Record.create({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    UserId: req.user.id,
  })
    .then(record => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

// 前往修改一筆支出的頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改一筆支出')
})

// 修改一筆支出
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    },
  }).then(record => {
    record.name = req.body.name
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    record
      .save()
      .then(record => {
        return res.redirect(`/records/${req.params.id}`)
      })
      .catch(err => {
        return res.status(422).json(err)
      })
  })
})

// 刪除一筆支出
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id,
        },
      }).then(record => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
