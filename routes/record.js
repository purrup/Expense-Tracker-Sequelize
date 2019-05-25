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
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 新增一筆支出
router.post('/new', authenticated, (req, res) => {
  Record.create({
    ...req.body,
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
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Record.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id,
        },
      }).then(record => {
        return res.render('edit', { record })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
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
        return res.redirect('/')
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
