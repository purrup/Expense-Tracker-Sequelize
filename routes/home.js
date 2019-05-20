const express = require('express')
const db = require('../models')
const Record = db.Record
const User = db.User
const router = express.Router()
const { authenticated } = require('../config/auth')
const monthList = require('../month.json').results

router.get('/', authenticated, (req, res) => {
  const month = req.query.month ? req.query.month : false
  const category = req.query.category

  const user = User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      if (category) {
        //有category，用req.user.id和req.query.category篩選records
        Record.findAll({
          where: {
            UserId: req.user.id,
            category: req.query.category,
          },
        }).then(records => {
          let totalAmount = 0
          records = records
            .filter(record => {
              // 如果有選月份，就將date中的月份slice出來並比對
              if (month) {
                console.log(month)
                return Number(record.date.slice(5, 7)) === Number(month)
              }
              return true
            })
            .map(record => {
              totalAmount += parseInt(record.amount, 10)
              return record
            })

          res.render('index', {
            records,
            totalAmount,
            monthList,
            month,
          })
        })
      } else {
        // 沒有category 列出全部records
        Record.findAll({
          where: {
            UserId: req.user.id,
          },
        }).then(records => {
          let totalAmount = 0
          records = records
            .filter(record => {
              // 如果有選月份，就將date中的月份slice出來並比對
              if (month) {
                console.log(month)
                return Number(record.date.slice(5, 7)) === Number(month)
              }
              return true
            })
            .map(record => {
              totalAmount += parseInt(record.amount, 10)
              return record
            })

          res.render('index', {
            records,
            totalAmount,
            monthList,
            month,
          })
        })
      }
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})
module.exports = router
