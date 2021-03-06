'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('./config')
const Database = require('./db')

// Instantiation
const db = new Database('sqlitedb')
const app = express()
const router = express.Router()
const port = process.env.PORT || config.port

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

// Configuration
app.use(allowCrossDomain)

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// Creating Routes
router.post('/register', (req, res) => {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  err => {
    if(err) return res.status(500).send('There was a problem registering the user')
    db.selectByEmail(req.body.email, (err, user) => {
      if(err) return res.status(500).send('There was a problem getting the user')
        let token = jwt.sign(
          { id: user.id },
          config.secret,
          { expiresIn: 24 * 60 * 60  * 1000 /* 24 Hours */ })

        res.status(200).send({
          auth: true,
          token: token,
          user: user
        })
    })
  })
})

router.post('/register-admin', (req, res) => {
  db.insertAdmin([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8),
    1
  ],
  err => {
    if(err) return res.status(500).send('There was a problem registering the user')
    db.selectByEmail(req.body.email, (err, user) => {
      if(err) return res.status(500).send('There was a problem getting the user')
      let token = jwt.sign(
        { id: user.id },
        config.secret,
        { expiresIn: 24 * 60 * 60  * 1000 /* 24 Hours */ })

      res.status(200).send({
        auth: true,
        token: token,
        user: user
      })
    })
  })
})

router.post('/login', (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if(err) return res.status(500).send('Error on the server.')
    if(!user) return res.status(404).send('No user found.')

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
    if(!passwordIsValid) return res.status(401).send({ auth: false, token: null })

    let token = jwt.sign(
      { id: user.id },
      config.secret,
      { expiresIn: 24 * 60 * 60  * 1000 /* 24 Hours */ })
    
    res.status(200).send({
      auth: true,
      token: token,
      user: user
    })
  })
})


app.use(router)

let server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
