const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const { webpack } = require('webpack');
const { config } = require('process');


const app = express()
const configure = require('../webpack.config')
const compiler = webpack(configure)

mongoose.connect('mongodb://localhost/mevn-database')
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err))

// Setting
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Config file as a base
app.use(WebpackDevMiddleware(compiler, {
  publicPath: configure.output.publicPath
}))

// Routes
app.use('/api/tasks', require('./routes/tasks'))

// Static files
app.use(express.static(path.join(__dirname, '../public')))

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})