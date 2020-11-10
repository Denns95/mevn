const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const app = express()
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))
    
// Setting
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/tasks', require('./routes/tasks'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})