'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('./config')
const database = require('./db')

// Instantiation
const db = new database('sqlitedb')
const app = express()
const router = express.Router()

