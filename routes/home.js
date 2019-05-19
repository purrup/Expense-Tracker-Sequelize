const express = require('express')
const db = require('../models')
const Record = db.Record
const User = db.User
const router = express.Router()
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const user = User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Record.findAll({
        where: {
          UserId: req.user.id,
        },
      }).then(records => {
        return res.render('index', { records })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})
module.exports = router
