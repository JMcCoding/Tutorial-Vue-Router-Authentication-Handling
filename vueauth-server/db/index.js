'use strict'

const sqlite3 = require('sqlite3').verbose()

class Database {
  db; // SQLite3 database property

  constructor(file){
    this.db = new sqlite3.Database(file)
    this.createTable()
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        user_pass text,
        is_admin integer
      )`

    return this.db.run(sql)
  }

  selectAll(callback) {
    const sql = `SELECT * FROM user`

    return this.db.all(sql, (err, row) => callback(err, row))
  }

  selectByEmail(email, callback) {
    const sql = `SELECT * FROM user WHERE email = ?`

    return this.db.get(sql, [email], (err, row) => callback(err, row))
  }

  insert(user, callback) {
    const sql = `
      INSERT INTO user
        (name, email, user_pass)
      VALUES
        (?, ?, ?) `
    
    return this.db.run(sql, user, (err, row) => callback(err, row))
  }

  insertAdmin(user, callback) {
    const sql = `
      INSERT INTO user
        (name, email, user_pass, is_admin)
      VALUES
        (?, ?, ?, ?) `
    
    return this.db.run(sql, user, (err, row) => callback(err, row))
  }
}

module.exports = Database