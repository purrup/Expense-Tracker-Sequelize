const express = require('express')
const db = require('../models')
const Record = db.Record
const User = db.User
const router = express.Router()
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  res.send('列出全部 Todo')
})

module.exports = router
