const express = require('express')
const db = require('../models')
const Record = db.Record
const User = db.User
const router = express.Router()
const { authenticated } = require('../config/auth')
const monthList = require('../data/month.json').results
const categoryList = require('../data/category.json').results
const switchCategoryName = category => {
  switch (category) {
    case 'utensils':
      categoryName = '餐飲食品'
      break
    case 'shuttle-van':
      categoryName = '交通出行'
      break
    case 'grin-beam':
      categoryName = '休閒娛樂'
      break
    case 'home':
      categoryName = '家居物業'
      break
    case 'pen':
      categoryName = '其他'
      break
  }
}

router.get('/', authenticated, (req, res) => {
  const month = req.query.month ? req.query.month : false
  const category = req.query.category
  let categoryName = ''

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
              // 篩選月份
              if (month) {
                let recordMonth = new Date(record.date).getMonth() + 1
                console.log(recordMonth)
                return recordMonth === Number(month)
              }
              return true
            })
            .map(record => {
              totalAmount += parseInt(record.amount, 10)
              return record
            })

          switchCategoryName(category)

          res.render('index', {
            records,
            totalAmount,
            monthList,
            month,
            categoryList,
            category,
            categoryName,
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
              // 篩選月份
              if (month) {
                let recordMonth = new Date(record.date).getMonth() + 1
                console.log(recordMonth)
                return recordMonth === Number(month)
              }
              return true
            })
            .map(record => {
              totalAmount += parseInt(record.amount, 10)
              return record
            })
          switchCategoryName(category)

          res.render('index', {
            records,
            totalAmount,
            monthList,
            month,
            categoryList,
            category,
            categoryName,
          })
        })
      }
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
