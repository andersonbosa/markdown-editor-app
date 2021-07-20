'use strict'

const express = require('express')
const path = require('path')

const PUBLIC_PATH = path.resolve(__dirname, '/public')
const VIEWS_PATH = path.join(__dirname, 'views')

const ServerApp = express()

/** @First setup static folder} **/
ServerApp.use(express.static(PUBLIC_PATH))

/** @Second setup view dir & engine {@link https://expressjs.com/en/guide/routing.html} **/
ServerApp.set('views', VIEWS_PATH)
ServerApp.set('view engine', 'ejs')

/** @Third setup main app route {@link https://expressjs.com/en/guide/routing.html} **/
ServerApp.get('/', (_request, _response) => {
  _response.render('block')
})

/** @Fourth run server {@link https://expressjs.com/en/4x/api.html#app.listen} **/
const SERVER_PORT = process.env.PORT /* to heroku */ || 8000
ServerApp.listen(SERVER_PORT, _error => {
  if (_error) {
    console.error(_error)
  } else {
    console.log('***** 🚀 Server running on port: %s', SERVER_PORT)
  }
})
